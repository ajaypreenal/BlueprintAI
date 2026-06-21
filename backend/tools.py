import os
from urllib.parse import urlparse
from tavily import TavilyClient

def search_web_structured(query: str, max_results: int = 5) -> list[dict]:
    """Returns Tavily results as structured dicts, preserving domain and content."""
    client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
    response = client.search(query=query, max_results=max_results)
    structured = []
    for r in response.get("results", []):
        url = r.get("url", "")
        domain = urlparse(url).netloc.lower().replace("www.", "")
        structured.append({
            "title": r.get("title", ""),
            "url": url,
            "domain": domain,
            "content": r.get("content", ""),
        })
    return structured

def search_web(query: str) -> str:
    """Backward-compatible string wrapper for any code expecting plain text."""
    structured = search_web_structured(query)
    lines = []
    for r in structured:
        snippet = (r["content"][:160] + "...") if len(r["content"]) > 160 else r["content"]
        lines.append(f"- {r['title']} ({r['domain']}): {snippet}")
    return "\n".join(lines)
