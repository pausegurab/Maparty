from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List

class SeguidorsSchema(BaseModel):
    id: int
    usuari_id: int
    organitzador_id: int
    Config: ConfigDict = { 'from_attributes' : True }

class SeguidorsCreate(BaseModel):
    usuari_id: int
    organitzador_id: int

class SeguidorsResponse(BaseModel):
    id: int
    usuari_id: int
    organitzador_id: int