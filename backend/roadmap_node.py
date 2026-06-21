import json
import os
from langchain_groq import ChatGroq

PERSONA_PROMPTS = {
    "founder": "You are a pragmatic venture builder. Frame milestones around building a lean MVP, achieving product-market fit, and mitigating market risks.",
    "student": "You are an academic project advisor. Frame milestones around project delivery, research proof-of-concept, and managing grade/timeline criteria.",
    "creator": "You are a digital media strategist. Frame milestones around building an audience minimum viable community, running content experiments, and engagement analytics.",
    "career_switcher": "You are an executive career coach. Frame milestones around upskilling, portfolio-building, and creating high-leverage professional relationships or side-hustle revenue.",
    "grad": "You are an incubator director. Frame milestones around transitioning ideas from academic concepts to commercial reality, sourcing entry grants, and operationalizing daily execution."
}

def roadmap_generator(state) -> dict:
    """
    Ranks risk scores, establishes sequential risk priorities, and executes 
    contextual LLM planning customized by target user archetype.
    """
    # 1. TASK 1: Risk-Weighted Milestone Logic (Explicit & Deterministic Sorting)
    scorecard = state.get("scorecard", {})
    exec_risk = state.get("execution_risk", {})
    
    # Extract standard metrics mapped against required schema tracking
    scores = {
        "competition": scorecard.get("competition_score", 5),
        "market": scorecard.get("market_score", 5),
        "execution": exec_risk.get("execution_risk_score", 5),
        "assumption": scorecard.get("retention_score", 5) # maps retention risk as the proxy core assumption weakness
    }
    
    # Sort descending to discover the top 2 bottlenecks
    sorted_risks = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    top_risk_dim, top_risk_score = sorted_risks[0]
    sec_risk_dim, sec_risk_score = sorted_risks[1]
    
    # Resolve User Archetype Persona (Task 2)
    user_type = state.get("user_type", "founder").lower()
    persona_context = PERSONA_PROMPTS.get(user_type, PERSONA_PROMPTS["founder"])
    
    # 2. TASK 3: Structured Assumption Validation Framework Generation
    llm = ChatGroq(model="llama-3.1-8b-instant")
    
    prompt = f"""
{persona_context}
You are an adaptive AI planning architect. Build a personalized roadmap for this asset based entirely on its structural weaknesses.

Original Idea: {state['idea']}
User Persona Archetype: {user_type}

DETERMINISTIC RISK PROFILING (Address these first!):
1. Primary Bottleneck: {top_risk_dim.upper()} (Score: {top_risk_score}/10)
2. Secondary Bottleneck: {sec_risk_dim.upper()} (Score: {sec_risk_score}/10)

Your response must strictly prioritize solving {top_risk_dim} during Week 1 and the 30-Day marks, moving into {sec_risk_dim} considerations by day 60.

Return ONLY a valid JSON string matching this exact structure:
{{
  "headline": "Your roadmap is built around your highest risk: {top_risk_dim.capitalize()} ({top_risk_score}/10)",
  "top_risk": {{
    "dimension": "{top_risk_dim}",
    "score": {top_risk_score}
  }},
  "week_1": {{
    "action": "One specific, concrete action to validate or mitigate the {top_risk_dim} risk immediately without writing major code.",
    "rationale": "Why this addresses {top_risk_dim}."
  }},
  "milestones": {{
    "30_day": ["Action item 1 tackling remaining {top_risk_dim} items", "Action item 2 detailing setup step"],
    "60_day": ["Action item 1 shifting focus onto resolving {sec_risk_dim} risks", "Action item 2 tracking progress"],
    "90_day": ["Macro milestone establishing a scale/pivot/stop kill switch criteria based on initial performance."]
  }},
  "assumptions": [
    {{
      "claim": "The core assumption making {top_risk_dim} high risk.",
      "validation_method": "A hyper-specific 48-hour experiment (interview script outline, landing page pitch or survey tracking setup).",
      "time_required": "48 hours"
    }},
    {{
      "claim": "An assumption driving {sec_risk_dim} challenges.",
      "validation_method": "Another rapid non-code asset validation tactic.",
      "time_required": "48 hours"
    }},
    {{
      "claim": "A standard operational usage or engagement hypothesis.",
      "validation_method": "Concrete measurement metrics goal.",
      "time_required": "48 hours"
    }}
  ],
  "disclaimer": "This is a starting framework, not a guarantee. You decide what to build."
}}
Do not write markdown block enclosures. Return raw JSON string only.
"""
    response = llm.invoke(prompt)
    raw = response.content.strip()
    
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    raw = raw.strip()
    
    try:
        roadmap_data = json.loads(raw)
    except json.JSONDecodeError:
        # Fallback if LLM doesn't return pure JSON
        roadmap_data = {
            "headline": f"Your roadmap is built around your highest risk: {top_risk_dim.capitalize()}",
            "top_risk": { "dimension": top_risk_dim, "score": top_risk_score },
            "week_1": { "action": "Validate assumptions", "rationale": "Mitigate risk" },
            "milestones": {
                "30_day": ["Action 1", "Action 2"],
                "60_day": ["Action 1", "Action 2"],
                "90_day": ["Macro milestone"]
            },
            "assumptions": [
                { "claim": "Core assumption", "validation_method": "Experiment", "time_required": "48 hours" }
            ],
            "disclaimer": "Fallback data generated."
        }
    return {"roadmap": roadmap_data}
