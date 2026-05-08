from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import engine
from models import Base
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User as UserModel
app = FastAPI()
Base.metadata.create_all(bind=engine)
# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# User model
class User(BaseModel):
    role: str
    name: str
    email: str
    password: str
    hospital: str = ""

# Home route
@app.get("/")
def home():
    return {"message": "MediLocker Backend Running Successfully"}

# Register route
@app.post("/register")
def register(user: User):

    db: Session = SessionLocal()

    new_user = UserModel(
        role=user.role,
        name=user.name,
        email=user.email,
        password=user.password,
        hospital=user.hospital
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    db.close()

    return {
        "message": f"{user.role} registered successfully"
    }