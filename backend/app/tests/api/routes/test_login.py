
import pytest
import time
from datetime import timedelta
from fastapi import HTTPException
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from app.main import app
from app.core.database import get_db
from app.crud import usuari
from app.schemas.usuaris import UserCreate
from app.core.security import create_access_token, verify_token

client = TestClient(app)

@pytest.fixture(scope="session")
def setup_test_user(db: Session = next(get_db())):

    user_data = UserCreate(
        email="test2@example.com",
        nom="Test User",
        contrasenya="password123",
        es_organitzador=False,
        superusuari=False,
    )
    user = usuari.create_user(db=db, user_in=user_data)
    return user
        
def test_login_success(setup_test_user):
    
    response = client.post(
        "/login",
        data={"username": "test2@example.com", "password": "password123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

    payload = verify_token(data["access_token"])
    assert payload["sub"] == "test2@example.com"

def test_login_invalid_password(setup_test_user):
    
    response = client.post(
        "/login",
        data={"username": "test2@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "Correu o contrasenya incorrectes"

def test_login_user_not_found():
    
    response = client.post(
        "/login",
        data={"username": "nonexistent@example.com", "password": "password123"},
    )
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "Correu o contrasenya incorrectes"


