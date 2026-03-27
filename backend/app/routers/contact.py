from fastapi import APIRouter, HTTPException, BackgroundTasks, Request
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

def send_email_sync(data: ContactForm):
    sender_email = os.getenv("SMTP_USER")
    sender_password = os.getenv("SMTP_PASS")
    # For a portfolio, usually send the contact form to yourself
    receiver_email = sender_email 

    if not sender_email or not sender_password:
        return # Skip sending if not configured during local dev

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = f"Portfolio Contact from {data.name}"

    body = f"""
    Name: {data.name}
    Email: {data.email}
    
    Message:
    {data.message}
    """
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(os.getenv("SMTP_HOST", "smtp.gmail.com"), int(os.getenv("SMTP_PORT", 587)))
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()
    except Exception as e:
        print(f"SMTP Error: {e}")

@router.post("/api/contact")
@limiter.limit("5/minute")
async def contact_endpoint(request: Request, body: ContactForm, background_tasks: BackgroundTasks):
    try:
        background_tasks.add_task(send_email_sync, body)
        return {"status": "success", "message": "Message sent"}
    except Exception as e:
         raise HTTPException(status_code=500, detail="Failed to send message.")
