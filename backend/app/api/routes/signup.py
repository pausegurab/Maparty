from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import timedelta
import random
from typing import Annotated, Any
from app.schemas.usuaris import UserResponse, UserCreate
from app.core.database import get_db
from app.crud import usuari

router = APIRouter()

@router.post("/", response_model=UserResponse)
def create_user(*,db: Session = Depends(get_db), user_in: UserCreate) -> UserResponse:
    user = usuari.get_user_by_email(db=db,email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="Aquest correu ja esta registrat"
        )
    user = usuari.create_user(db=db, user_in=user_in)
    return UserResponse(
        id=user.id,
        nom=user.nom,
        email=user.email,
        es_organitzador=user.es_organitzador
    )

