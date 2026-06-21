from typing import TypedDict, Optional
from langgraph.graph import StateGraph, END
from roadmap_node import roadmap_generator

class AgentState(TypedDict):
    idea: str
    user_type: str  # "founder", "student", "creator", "career_switcher", "grad"
    idea_cleaned: dict
    competitors: list
    pain_points: list
    scorecard: dict
    execution_risk: dict
    pivot_suggestion: dict
    assumption_checklist: dict
    evidence_confidence: dict
    geographic_bias: dict
    score_explainability: dict
    roadmap: dict

# Stub missing nodes
def intent_extractor(state: AgentState) -> dict:
    return {"idea_cleaned": {"clean_idea": state.get("idea", "")}}

def competitor_finder(state: AgentState) -> dict:
    return {"competitors": []}

def pain_point_miner(state: AgentState) -> dict:
    return {"pain_points": []}

def execution_risk_agent(state: AgentState) -> dict:
    return {"execution_risk": {"execution_risk_score": 7}}

def aggregator(state: AgentState) -> dict:
    return {"scorecard": {"competition_score": 8, "market_score": 6, "retention_score": 9}}

def should_pivot(state: AgentState) -> str:
    return "end"

def pivot_suggester(state: AgentState) -> dict:
    return {"pivot_suggestion": {}}

def assumption_checklist(state: AgentState) -> dict:
    return {"assumption_checklist": {}}

def build_graph():
    graph = StateGraph(AgentState)

    # 1. Register existing + new nodes
    graph.add_node("intent_extractor", intent_extractor)
    graph.add_node("competitor_finder", competitor_finder)
    graph.add_node("pain_point_miner", pain_point_miner)
    graph.add_node("execution_risk_agent", execution_risk_agent)
    graph.add_node("aggregator", aggregator)
    graph.add_node("pivot_suggester", pivot_suggester)
    graph.add_node("assumption_checklist", assumption_checklist)
    graph.add_node("roadmap_generator", roadmap_generator) # ← Added

    # 2. Stitch the execution path
    graph.set_entry_point("intent_extractor")
    graph.add_edge("intent_extractor", "competitor_finder")
    graph.add_edge("competitor_finder", "pain_point_miner")
    graph.add_edge("pain_point_miner", "execution_risk_agent")
    graph.add_edge("execution_risk_agent", "aggregator")
    
    # Route via condition logic
    graph.add_conditional_edges(
        "aggregator",
        should_pivot,
        {
            "pivot": "pivot_suggester",
            "end": "roadmap_generator" # ← Pass through to strategic generator if safe
        }
    )
    graph.add_edge("pivot_suggester", "roadmap_generator") # ← Pivots also move onto generation
    graph.add_edge("roadmap_generator", "assumption_checklist")
    graph.add_edge("assumption_checklist", END)

    return graph.compile()
