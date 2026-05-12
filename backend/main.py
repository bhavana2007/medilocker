from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database import engine
from models import Base
from routes import auth

app = FastAPI()

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Upload folder
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ✅ Database
Base.metadata.create_all(bind=engine)

# ✅ Routes
app.include_router(auth.router, prefix="/auth")

@app.get("/")
def home():
    return {"message": "MediLocker Backend Running"}