from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine
from models import Base
from routes import auth

# 1. CREATE APP FIRST (MOST IMPORTANT)
app = FastAPI()

# 2. DATABASE SETUP
Base.metadata.create_all(bind=engine)

# 3. CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. ROUTES
app.include_router(auth.router, prefix="/auth")

# 5. STATIC FILES (uploads)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# 6. HOME ROUTE
@app.get("/")
def home():
    return {"message": "MediLocker Backend Running"}