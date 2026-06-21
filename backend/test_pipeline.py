from agent import build_graph
import os

# You may need to set GROQ_API_KEY environment variable before running this
# os.environ["GROQ_API_KEY"] = "your-api-key"

def run_integration_test():
    test_personas = ["founder", "student", "creator", "career_switcher", "grad"]
    app = build_graph()
    
    for persona in test_personas:
        print(f"=== TESTING PERSONA ARCHETYPE: {persona.upper()} ===")
        try:
            result = app.invoke({
                "idea": "A premium newsletter curation engine matching professional journalists with micro-niches",
                "user_type": persona,
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
            
            assert "roadmap" in result, "Verification Error: Roadmap key missing from system output."
            roadmap = result["roadmap"]
            
            print(f"✓ Success Headline -> {roadmap.get('headline')}")
            print(f"✓ Week 1 Mitigation Focus -> {roadmap.get('week_1', {}).get('action')}")
            print(f"✓ Total Core Validation Checkpoints -> {len(roadmap.get('assumptions', []))}\n")
            
        except Exception as e:
            print(f"❌ Structural Failure during persona test [{persona}]: {str(e)}")

if __name__ == "__main__":
    run_integration_test()
