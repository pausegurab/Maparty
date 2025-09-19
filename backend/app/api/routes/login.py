from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Annotated, Any
from app.core.security import create_access_token
from app.core.database import get_db
from app.crud import usuari

router = APIRouter()

class Token(BaseModel):
    access_token: str
    token_type: str 


@router.post("/",response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = usuari.authenticate(db=db, email=form_data.username, password=form_data.password)
    if user == False:
        raise HTTPException(
            status_code=400,
            detail="Correu o contrasenya incorrectes"
        )
    
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}