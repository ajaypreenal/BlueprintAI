
import os
from tavily import TavilyClient

def search_web(query: str) -> str:
    client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    results = client.search(query=query, max_results=5)
    
    output = []
    for r in results["results"]:
        output.append(f"- {r['title']}: {r['url']}")
    
    return "\n".join(output)