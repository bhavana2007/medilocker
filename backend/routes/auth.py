from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User as UserModel, MedicalRecord
import bcrypt
import shutil
import os

router = APIRouter()

# ------------------ MODELS ------------------

class User(BaseModel):
    role: str
    name: str
    email: str
    password: str
    hospital: str = ""

class LoginRequest(BaseModel):
    email: str
    password: str

# ------------------ REGISTER ------------------

@router.post("/register")
def register(user: User):

    db: Session = SessionLocal()

    # ✅ hash password first
    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'),
        bcrypt.gensalt()
    )

    new_user = UserModel(
        role=user.role,
        name=user.name,
        email=user.email,
        password=hashed_password.decode('utf-8'),
        hospital=user.hospital
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()

    return {"message": f"{user.role} registered successfully"}

# ------------------ LOGIN ------------------

@router.post("/login")
def login(user: LoginRequest):

    db: Session = SessionLocal()

    db_user = db.query(UserModel).filter(UserModel.email == user.email).first()

    db.close()

    if not db_user:
        return {"message": "User not found"}

    if not bcrypt.checkpw(
        user.password.encode('utf-8'),
        db_user.password.encode('utf-8')
    ):
        return {"message": "Incorrect password"}

    return {
        "message": "Login successful",
        "user": {
            "name": db_user.name,
            "role": db_user.role,
            "email": db_user.email
        }
    }

# ------------------ UPLOAD ------------------

@router.post("/upload")
def upload_file(file: UploadFile = File(...), email: str = ""):

    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = f"{upload_dir}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db = SessionLocal()

    record = MedicalRecord(
        email=email,
        file_path=file_path
    )

    db.add(record)
    db.commit()
    db.close()

    return {
        "message": "File uploaded and saved in database",
        "file_path": file_path
    }

# ------------------ GET RECORDS ------------------

@router.get("/records")
def get_records():

    db = SessionLocal()

    records = db.query(MedicalRecord).all()

    db.close()

    return [
        {
            "email": r.email,
            "file_path": r.file_path
        }
        for r in records
    ]

# ------------------ TEST ------------------

@router.get("/test")
def test_route():
    return {"message": "Auth route is working"}