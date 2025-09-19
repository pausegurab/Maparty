import time
import pytest
from datetime import timedelta
from fastapi import HTTPException
from app.crud import usuari
from app.schemas.usuaris import UserCreate
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.core.security import create_access_token, verify_token


def test_get_password(db: Session = next(get_db())):
    user = usuari.create_user(db=db, user_in=UserCreate(email="test@example.com", nom="Test User", contrasenya="password123", es_organitzador=False, superusuari=False))

    password_hash = usuari.get_password(db=db, email="test@example.com")
    assert password_hash == user.contrasenya_hash

def test_verify_correct_password(db: Session = next(get_db())):

    is_valid = usuari.verify_password(db=db, email="test@example.com", password="password123")
    assert is_valid is True

def test_verify_incorrect_password(db: Session = next(get_db())):
    is_invalid = usuari.verify_password(db=db, email="test@example.com", password="wrongpassword")
    assert is_invalid is False

def test_authenticate(db: Session = next(get_db())):

    authenticated_user = usuari.authenticate(db=db, email="test@example.com", password="password123")
    assert authenticated_user == usuari.get_user_by_email(db=db,email="test@example.com")

def test_authenticate_invalid_user(db: Session = next(get_db())):

    invalid_user = usuari.authenticate(db=db, email="test@example.com", password="wrongpassword")
    assert invalid_user is False


def test_authenticate_non_existent_user(db: Session = next(get_db())):
    non_existent_user = usuari.authenticate(db=db, email="nonexistent@example.com", password="password123")
    assert non_existent_user is False

def test_token_expired():

    access_token = create_access_token(
        data={"sub": "test2@example.com"},
        expires_delta=timedelta(seconds=2),
    )

    payload = verify_token(access_token)
    assert payload["sub"] == "test2@example.com"

    time.sleep(3)

    try:
        verify_token(access_token)
        assert False, "El token no hauria de ser vàlid després de la caducitat"
    except HTTPException as e:
        assert e.status_code == 401
        assert e.detail == "Token expirat"

