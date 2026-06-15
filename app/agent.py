from typing import TypedDict, List
from dotenv import load_dotenv
from tools import search_web
from langchain_groq import ChatGroq
from langgraph.graph import StateGraph, END
import json
