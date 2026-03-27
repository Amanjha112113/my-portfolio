from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from app.models.chat import ChatRequest
from app.services.gemini_service import stream_response
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/api/agent")
@limiter.limit("10/minute")
async def chat_endpoint(request: Request, body: ChatRequest):
    async def generate():
        async for token in stream_response(body.messages):
            yield f"data: {token}\n\n"
        yield "data: [DONE]\n\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")
