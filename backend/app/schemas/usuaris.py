from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional

class UserSchema(BaseModel):
    id: int
    email: EmailStr
    contrasenya: str
    nom: str = Field(..., min_length=2, max_length=100)
    es_organitzador: bool = False
    superusuari: bool = False
    adreça: str = "No configurada"
    instagram: Optional[str]
    foto1: Optional[bytes]
    foto2: Optional[bytes]
    foto3: Optional[bytes]
    foto4: Optional[bytes]
    foto5: Optional[bytes]



    Config: ConfigDict = { 'from_attributes' : True }
        

class UserCreate(BaseModel):
    email: EmailStr
    nom: str = Field(None,min_length=2,max_length=100)
    contrasenya: str = Field(..., min_length=8)
    es_organitzador: bool = False
    superusuari: bool = False

class UserResponse(BaseModel):
    id: int
    nom: str
    email: EmailStr
    es_organitzador: bool

class UserUpdate(BaseModel):
    nom: Optional[str] = None
    contrasenya: Optional[str] = None
    es_organitzador: Optional[bool] = None
    superusuari: Optional[bool] = None
    adreça: Optional[str] = None
    instagram: Optional[str] = None
    foto1: Optional[bytes] = None
    foto2: Optional[bytes] = None
    foto3: Optional[bytes] = None
    foto4: Optional[bytes] = None
    foto5: Optional[bytes] = None
