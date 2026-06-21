from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, IdeaSession, RiskScore, Roadmap, AssumptionChecklist
from agent import build_graph

# Database Setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./founderlens.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class IdeaSubmission(BaseModel):
    idea: str
    targetAudience: str
    industry: str
    geography: str
    revenueModel: str
    teamSize: str
    user_type: Optional[str] = "founder"

agent_app = build_graph()

def process_idea_in_background(session_id: int, idea: str, user_type: str):
    db = SessionLocal()
    try:
        result = agent_app.invoke({
            "idea": idea,
            "user_type": user_type,
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
        
        # Risk Score
        scorecard = result.get("scorecard", {})
        exec_risk = result.get("execution_risk", {})
        db_risk = RiskScore(
            session_id=session_id,
            competition=scorecard.get("competition_score", 5),
            market=scorecard.get("market_score", 5),
            execution=exec_risk.get("execution_risk_score", 5),
            assumption=scorecard.get("retention_score", 5)
        )
        db.add(db_risk)
        
        # Roadmap
        rm_data = result.get("roadmap", {})
        milestones = rm_data.get("milestones", {})
        db_roadmap = Roadmap(
            session_id=session_id,
            headline=rm_data.get("headline", "Your personalized roadmap"),
            week_1_action=rm_data.get("week_1", {}).get("action", ""),
            milestones_30_day=milestones.get("30_day", []) if isinstance(milestones, dict) else [],
            milestones_60_day=milestones.get("60_day", []) if isinstance(milestones, dict) else [],
            milestones_90_day=milestones.get("90_day", []) if isinstance(milestones, dict) else []
        )
        db.add(db_roadmap)
        
        # Assumptions
        for asm in rm_data.get("assumptions", []):
            db_assumption = AssumptionChecklist(
                session_id=session_id,
                claim=asm.get("claim", ""),
                validation_method=asm.get("validation_method", ""),
                time_required=asm.get("time_required", "48 hours")
            )
            db.add(db_assumption)
            
        db.commit()
    except Exception as e:
        print(f"Error processing idea: {e}")
    finally:
        db.close()

@app.post("/api/analyze")
async def analyze_idea(submission: IdeaSubmission, background_tasks: BackgroundTasks):
    db = SessionLocal()
    try:
        db_session = IdeaSession(idea=submission.idea, user_type=submission.user_type)
        db.add(db_session)
        db.commit()
        db.refresh(db_session)
        
        background_tasks.add_task(process_idea_in_background, db_session.id, db_session.idea, db_session.user_type)
        
        return {"session_id": db_session.id, "status": "processing"}
    finally:
        db.close()

@app.get("/api/session/{session_id}")
async def get_session(session_id: int):
    db = SessionLocal()
    try:
        session = db.query(IdeaSession).filter(IdeaSession.id == session_id).first()
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
            
        risk_score = db.query(RiskScore).filter(RiskScore.session_id == session_id).first()
        roadmap = db.query(Roadmap).filter(Roadmap.session_id == session_id).first()
        assumptions = db.query(AssumptionChecklist).filter(AssumptionChecklist.session_id == session_id).all()
        
        return {
            "id": session.id,
            "idea": session.idea,
            "user_type": session.user_type,
            "created_at": session.created_at,
            "status": "completed" if risk_score else "processing",
            "risk_score": {
                "competition": risk_score.competition if risk_score else None,
                "market": risk_score.market if risk_score else None,
                "execution": risk_score.execution if risk_score else None,
                "assumption": risk_score.assumption if risk_score else None,
            } if risk_score else None,
            "roadmap": {
                "headline": roadmap.headline,
                "week_1_action": roadmap.week_1_action,
                "milestones_30_day": roadmap.milestones_30_day,
                "milestones_60_day": roadmap.milestones_60_day,
                "milestones_90_day": roadmap.milestones_90_day,
            } if roadmap else None,
            "assumptions": [
                {
                    "claim": a.claim,
                    "validation_method": a.validation_method,
                    "time_required": a.time_required
                } for a in assumptions
            ]
        }
    finally:
        db.close()
