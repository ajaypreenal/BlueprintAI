from fastapi import FastAPI
from pydantic import BaseModel
from agent import build_graph,AgentState

app = FastAPI()

class IdeaRequest(BaseModel):
    idea:str
    
    
@app.get("/")
def root():
    return {"message":"Idea Validator Agent is running"}

@app.post("/validate")
def validate_idea(request:IdeaRequest):
    graph = build_graph()
    result=graph.invoke({
        "idea":request.idea,
        "competitors":[],
        "pain_points":[],
        "scorecard":{}
    })
    return {"scorecard":result["scorecard"]}