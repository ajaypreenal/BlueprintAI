import os
import uuid
from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from agent import build_graph

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")

# In-memory session store for the async analyze/poll flow used by the
# frontend. Lives only as long as this process — acceptable for a single
# always-on backend instance (Render), but does not survive a restart or
# scale across multiple instances.
SESSIONS: dict[str, dict] = {}

app = FastAPI()

# Wildcard origins are incompatible with allow_credentials=True (cookies
# won't be sent cross-origin), so this must be a specific origin list.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Falls back to a dev-only placeholder so the server can still start without
# SESSION_SECRET_KEY set. Set a real value in .env before deploying.
SESSION_SECRET_KEY = os.getenv("SESSION_SECRET_KEY") or "dev-insecure-session-secret"

# In production, frontend (Vercel) and backend (Render) are on different real
# domains — the session cookie needs SameSite=None; Secure to survive that
# cross-site hop. Locally, "localhost" with different ports is treated as
# same-site by browsers, so Lax (and no Secure, since it's http) works fine.
IS_PRODUCTION = BACKEND_URL.startswith("https://")
app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET_KEY,
    same_site="none" if IS_PRODUCTION else "lax",
    https_only=IS_PRODUCTION,
)

oauth = OAuth()
oauth.register(
    name="google",
    # Static endpoints instead of server_metadata_url — avoids an extra
    # live discovery fetch to accounts.google.com that was intermittently
    # timing out from this environment. These URLs are stable for Google.
    authorize_url="https://accounts.google.com/o/oauth2/v2/auth",
    access_token_url="https://oauth2.googleapis.com/token",
    userinfo_endpoint="https://openidconnect.googleapis.com/v1/userinfo",
    jwks_uri="https://www.googleapis.com/oauth2/v3/certs",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    client_kwargs={"scope": "openid email profile", "timeout": 15.0},
)

class IdeaRequest(BaseModel):
    idea: str
    user_type: str = "founder"  # founder | student | creator | career_switcher | grad
    region: str = "global"

@app.get("/")
def root():
    return {"message": "BlueprintAI API is running"}

@app.get("/auth/login")
async def auth_login(request: Request):
    redirect_uri = f"{BACKEND_URL}/auth/callback"
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get("/auth/callback")
async def auth_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except Exception as e:
        detail = f"{type(e).__name__}: {e}" if str(e) else type(e).__name__
        raise HTTPException(status_code=400, detail=f"OAuth callback failed: {detail}")

    user_info = token.get("userinfo") or {}
    request.session["user"] = {
        "email": user_info.get("email"),
        "name": user_info.get("name"),
        "picture": user_info.get("picture"),
    }
    return RedirectResponse(url=f"{FRONTEND_URL}/dashboard")

@app.get("/auth/me")
def auth_me(request: Request):
    user = request.session.get("user")
    if not user:
        return JSONResponse({"error": "Not authenticated"}, status_code=401)
    return user

@app.get("/auth/logout")
def auth_logout(request: Request):
    request.session.clear()
    return {"message": "Logged out"}

def run_validate_pipeline(idea: str, user_type: str, region: str, user_email: Optional[str]) -> dict:
    graph = build_graph()
    result = graph.invoke({
        "idea": idea,
        "user_type": user_type,
        "region": region,
        "idea_cleaned": {},
        "competitors": [],
        "pain_points": [],
        "scorecard": {},
        "execution_risk": {},
        "pivot_suggestion": {},
        "assumption_checklist": {},
        "evidence_confidence": {},
        "geographic_bias": {},
        "score_explainability": {},
        "roadmap": {}
    })
    return {
        "idea": result["idea"],
        "user_type": result["user_type"],
        "user_email": user_email,
        "idea_cleaned": result["idea_cleaned"],
        "competitors": result["competitors"],
        "pain_points": result["pain_points"],
        "scorecard": result["scorecard"],
        "execution_risk": result["execution_risk"],
        "pivot_suggestion": result["pivot_suggestion"],
        "assumption_checklist": result["assumption_checklist"],
        "evidence_confidence": result["evidence_confidence"],
        "geographic_bias": result["geographic_bias"],
        "score_explainability": result["score_explainability"],
        "roadmap": result["roadmap"]
    }

@app.post("/validate")
def validate_idea(request: Request, body: IdeaRequest):
    user = request.session.get("user")
    user_email = user.get("email") if user else None

    try:
        return run_validate_pipeline(body.idea, body.user_type, body.region, user_email)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline error: {str(e)}")

def _run_session_pipeline(session_id: str, idea: str, user_type: str, region: str, user_email: Optional[str]):
    try:
        data = run_validate_pipeline(idea, user_type, region, user_email)
        SESSIONS[session_id] = {"status": "completed", "data": data}
    except Exception as e:
        SESSIONS[session_id] = {"status": "error", "error": str(e)}

@app.post("/sessions")
def create_session(request: Request, body: IdeaRequest, background_tasks: BackgroundTasks):
    user = request.session.get("user")
    user_email = user.get("email") if user else None

    session_id = str(uuid.uuid4())
    SESSIONS[session_id] = {"status": "processing"}
    background_tasks.add_task(
        _run_session_pipeline, session_id, body.idea, body.user_type, body.region, user_email
    )
    return {"session_id": session_id}

@app.get("/sessions/{session_id}")
def get_session(session_id: str):
    session = SESSIONS.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
