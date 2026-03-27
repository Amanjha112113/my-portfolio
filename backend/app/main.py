import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.routers import agent, contact

# Rate limiter setup
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Aman's AI Portfolio API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS (Only allow frontend origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourportfolio.vercel.app", "http://localhost:5173"],
    allow_methods=["POST", "GET"],
)

app.include_router(agent.router)
app.include_router(contact.router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}
