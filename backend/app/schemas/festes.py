from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import date, time
from typing import Optional, List

class ProducteSchema(BaseModel):
    nom: str
    preu: float

class FestaSchema(BaseModel):
    id: int
    nom: str
    dia: date
    hora_inici: time
    hora_final: time
    adreca: str
    ciutat: str
    punt_lila: bool = False
    targeta: bool = False
    organitzador_id: int
    cartell_imatge: bytes
    latitud: float
    longitud: float
    productes: List[ProducteSchema] = []
    artistes: List[str] = []
    estils_musicals: List[str] = []

    Config: ConfigDict = { 'from_attributes' : True }

    
class FestaCreate(BaseModel):
    dia: date
    hora_inici: time
    hora_final: time
    adreca: str
    ciutat: str
    punt_lila: bool = False
    targeta: bool = False
    organitzador_id: int
    cartell_imatge: bytes
    latitud: float
    longitud: float
    productes: List[ProducteSchema] = []
    artistes: List[str] = []
    estils_musicals: List[str] = []


class FestaResponse(BaseModel):
    id: int
    nom: str
    dia: date
    hora_inici: time
    hora_final: time
    adreca: str
    ciutat: str
    punt_lila: bool = False
    targeta: bool = False
    organitzador_id: int
    cartell_imatge: bytes
    latitud: float
    longitud: float
    productes: List[ProducteSchema] = []
    artistes: List[str] = []
    estils_musicals: List[str] = []

