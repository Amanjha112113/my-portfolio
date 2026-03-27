from pydantic import BaseModel, Field, field_validator

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]
    
    @field_validator('messages')
    @classmethod
    def limit_messages(cls, v):
        if len(v) > 20: raise ValueError("Too many messages")
        for msg in v:
            if len(msg.content) > 500: raise ValueError("Message too long")
        return v
