from sqlalchemy import Column, String, Integer, Float, ForeignKey, JSON, DateTime, Text
from sqlalchemy.orm import declarative_base, relationship
import datetime

Base = declarative_base()

class IdeaSession(Base):
    __tablename__ = "idea_sessions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    idea = Column(Text, nullable=False)
    user_type = Column(String(50), nullable=False) # founder, student, creator, career_switcher, grad
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    risk_scores = relationship("RiskScore", back_populates="session", uselist=False)
    roadmap = relationship("Roadmap", back_populates="session", uselist=False)
    assumptions = relationship("AssumptionChecklist", back_populates="session")

class RiskScore(Base):
    __tablename__ = "risk_scores"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("idea_sessions.id"), unique=True)
    competition = Column(Integer, nullable=False)
    market = Column(Integer, nullable=False)
    execution = Column(Integer, nullable=False)
    assumption = Column(Integer, nullable=False)
    
    session = relationship("IdeaSession", back_populates="risk_scores")

class Roadmap(Base):
    __tablename__ = "roadmaps"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("idea_sessions.id"), unique=True)
    headline = Column(Text, nullable=False)
    week_1_action = Column(Text, nullable=False)
    milestones_30_day = Column(JSON, nullable=False) # List of strings
    milestones_60_day = Column(JSON, nullable=False) # List of strings
    milestones_90_day = Column(JSON, nullable=False) # List of strings
    
    session = relationship("IdeaSession", back_populates="roadmap")

class AssumptionChecklist(Base):
    __tablename__ = "assumption_checklists"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("idea_sessions.id"))
    claim = Column(Text, nullable=False)
    validation_method = Column(Text, nullable=False)
    time_required = Column(String(50), default="48 hours")
    
    session = relationship("IdeaSession", back_populates="assumptions")
