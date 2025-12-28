from fastapi import FastAPI, Form
from fastapi.responses import StreamingResponse
import qrcode
import io
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost",
    "http://000.0.0.x",
    "http://xxx.xxx.x.x:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate_qrcode/")
async def generate_qrcode(content: str = Form(...)):
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(content)
    qr.make(fit=True)
    img = qr.make_image(fill="black", back_color="white")
    
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    return StreamingResponse(buf, media_type="image/png")


# comando para executar:
# #uvicorn main:app --host 0.0.0.0 --port 8000 --reload