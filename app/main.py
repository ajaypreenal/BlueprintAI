from fastapi import FastAPI
from pydantic import BaseModel
from agent import build_graph,AgentState
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
class IdeaRequest(BaseModel):
    idea:str
    
    
@app.get("/")
def root():
    return FileResponse("static/index.html")

@app.post("/validate")
def validate_idea(request: IdeaRequest):
    graph = build_graph()
    result = graph.invoke({
        "idea": request.idea,
        "competitors": [],
        "pain_points": [],
        "scorecard": {}
    })
    return {
        "idea": result["idea"],
        "competitors": result["competitors"],
        "pain_points": result["pain_points"],
        "scorecard": result["scorecard"]
    }