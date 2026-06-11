from typing import TypedDict, List
from dotenv import load_dotenv
from tools import search_web
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END

load_dotenv()


class AgentState(TypedDict):
    idea: str
    competitors: List[str]
    pain_points: List[str]
    scorecard: dict


def competitor_finder(state: AgentState) -> dict:
    idea = state["idea"]
    query = f"existing startups or products that do: {idea}"
    results = search_web(query)
    
    competitors = results.split("\n")
    return {"competitors": competitors}

def pain_point_miner(state: AgentState) -> dict:
    idea = state["idea"]
    query = f"reddit OR forum people complaining about problems with: {idea}"
    results = search_web(query)
    
    pain_points = results.split("\n")
    return {"pain_points": pain_points}

def aggregator(state: AgentState) -> dict:
    idea = state["idea"]
    competitors = "\n".join(state["competitors"])
    pain_points = "\n".join(state["pain_points"])

    llm = ChatGroq(model="llama-3.1-8b-instant")

    prompt = f"""
You are a startup analyst. Analyze this idea and return a scorecard.

Idea: {idea}

Competitors found:
{competitors}

Evidence of pain/demand:
{pain_points}

Return a scorecard with these exact keys as JSON:
- market_score (1-10)
- competition_score (1-10, lower = more competition)
- pain_score (1-10)
- overall_score (average of above)
- verdict (one of: "Strong idea", "Worth testing", "Needs more research", "Avoid")
- one_line_summary (one sentence)

Return only valid JSON, nothing else.
"""

    response = llm.invoke(prompt)
    
    
    import json
    raw = response.content.strip()
    
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()
    scorecard = json.loads(raw)
    return {"scorecard": scorecard}

def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("competitor_finder", competitor_finder)
    graph.add_node("pain_point_miner", pain_point_miner)
    graph.add_node("aggregator", aggregator)

    graph.set_entry_point("competitor_finder")
    graph.add_edge("competitor_finder", "pain_point_miner")
    graph.add_edge("pain_point_miner", "aggregator")
    graph.add_edge("aggregator", END)

    return graph.compile()

if __name__ == "__main__":
    app = build_graph()
    result = app.invoke({
        "idea": "AI tutor for competitive exams",
        "competitors": [],
        "pain_points": [],
        "scorecard": {}
    })
    print("\n--- SCORECARD ---")
    for key, value in result["scorecard"].items():
        print(f"{key}: {value}")