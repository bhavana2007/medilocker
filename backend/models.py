from sqlalchemy import Column, Integer, String
from database import Base

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    role = Column(String(50))

    name = Column(String(100))

    email = Column(String(100), unique=True)

    password = Column(String(100))

    hospital = Column(String(100))
    