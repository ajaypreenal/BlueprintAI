

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import build_graph

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaRequest(BaseModel):
    idea: str
    region: str = "global"

@app.get("/")
def root():
    return {"message": "BlueprintAI API is running"}

@app.post("/validate")
def validate_idea(request: IdeaRequest):
    graph = build_graph()
    result = graph.invoke({
        "idea": request.idea,
        "idea_cleaned": {},
        "competitors": [],
        "pain_points": [],
        "scorecard": {},
        "execution_risk": {},
        "pivot_suggestion": {},
        "assumption_checklist": {}
    })
    return {
        "idea": result["idea"],
        "idea_cleaned": result["idea_cleaned"],
        "competitors": result["competitors"],
        "pain_points": result["pain_points"],
        "scorecard": result["scorecard"],
        "execution_risk": result["execution_risk"],
        "pivot_suggestion": result["pivot_suggestion"],
        "assumption_checklist": result["assumption_checklist"]
    }

@app.get("/health")
def health():
    return {"status": "ok"}