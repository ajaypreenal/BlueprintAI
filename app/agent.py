
from typing import TypedDict, List
from dotenv import load_dotenv
from tools import search_web
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
import json

load_dotenv()


class AgentState(TypedDict):
    idea: str
    idea_cleaned: dict
    competitors: List[str]
    pain_points: List[str]
    scorecard: dict


def intent_extractor(state: AgentState) -> dict:
    llm = ChatGroq(model="llama-3.1-8b-instant")
    prompt = f"""
You are an intent extraction assistant.
The user has entered a startup idea that may contain brand names, buzzwords, or vague language.

Your job:
1. Remove any brand names or made-up product names
2. Remove buzzwords like "AI-Driven", "Revolutionary", "Disrupting"
3. Extract the core concept in plain, searchable language
4. Identify the target user and core problem being solved

Input: {state["idea"]}

Return only a JSON object with these keys:
- cleaned_idea: the simplified searchable concept
- target_user: who this is for
- core_problem: what problem it solves

Return only valid JSON, nothing else.
"""
    response = llm.invoke(prompt)
    raw = response.content.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()
    extracted = json.loads(raw)
    return {"idea_cleaned": extracted}


def competitor_finder(state: AgentState) -> dict:
    idea = state["idea_cleaned"].get("cleaned_idea", state["idea"])
    query = f"existing startups or products that do: {idea}"
    results = search_web(query)
    competitors = results.split("\n")
    return {"competitors": competitors}


def pain_point_miner(state: AgentState) -> dict:
    idea = state["idea_cleaned"].get("cleaned_idea", state["idea"])
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
You are a cynical venture capital analyst who has seen 10,000 startup pitches fail.
You do NOT give compliments. You identify risk.

Analyze this startup idea ruthlessly across 4 dimensions:

Idea: {idea}
Target User: {state["idea_cleaned"].get("target_user", "unknown")}
Core Problem: {state["idea_cleaned"].get("core_problem", "unknown")}

Competitors found:
{competitors}

Evidence of pain/demand:
{pain_points}

Score each dimension 1-10 where 10 = extremely risky/bad:

1. competition_score: How saturated is this market? Are there well-funded incumbents?
2. market_score: Is there real demand evidence or just assumptions?
3. retention_score: Why would users come back tomorrow? Is there a habit loop?
4. legal_score: Are there regulatory, privacy, or compliance risks?
5. willingness_to_pay_score: Will people actually pay for this? Who pays and how much?
6. defensibility_score: Can this be copied by a developer in a weekend?

Then provide:
- overall_score: average of all 6 scores
- verdict: one of "Strong idea", "Worth testing", "Needs more research", "Avoid"
- one_line_summary: one brutally honest sentence
- top_risk: the single biggest reason this could fail

Return only valid JSON with these exact keys:
competition_score, market_score, retention_score, legal_score, 
willingness_to_pay_score, defensibility_score, overall_score, 
verdict, one_line_summary, top_risk

Nothing else. No explanation. Just JSON.
"""    
    response = llm.invoke(prompt)
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

    graph.add_node("intent_extractor", intent_extractor)
    graph.add_node("competitor_finder", competitor_finder)
    graph.add_node("pain_point_miner", pain_point_miner)
    graph.add_node("aggregator", aggregator)

    graph.set_entry_point("intent_extractor")
    graph.add_edge("intent_extractor", "competitor_finder")
    graph.add_edge("competitor_finder", "pain_point_miner")
    graph.add_edge("pain_point_miner", "aggregator")
    graph.add_edge("aggregator", END)

    return graph.compile()


if __name__ == "__main__":
    app = build_graph()
    result = app.invoke({
        "idea": "AI tutor for competitive exams",
        "idea_cleaned": {},
        "competitors": [],
        "pain_points": [],
        "scorecard": {}
    })
    print("\n--- SCORECARD ---")
    for key, value in result["scorecard"].items():
        print(f"{key}: {value}")