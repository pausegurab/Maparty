import pytest
from app.core.config import Config as config
from app.main import app
from fastapi.testclient import TestClient
from app.models import Usuari
from app.schemas.usuaris import UserCreate


client = TestClient(app)

def test_create_user():
    user_data = {
        "email": "newuser@example.com",
        "contrasenya": "password123",
        "nom": "new"
    }
    response = client.post("/signup/", json=user_data)
    assert response.status_code == 200
    assert response.json()["nom"] == user_data["nom"]

def test_create_user_duplicate():
    user_data = {
        "email": "newuser@example.com",
        "contrasenya": "password123",
        "nom": "new"
    }
    response = client.post("/signup/", json=user_data)
    assert response.status_code == 400
    assert response.json()["detail"] == "Aquest correu ja esta registrat"

def test_create_user_missing_fields():
    user_data = {
        "email": "newuser@example.com",
        "nom": "new"
    }
    response = client.post("/signup/", json=user_data)
    assert response.status_code == 422

def test_create_user_short_password():
    user_data = {
        "email": "newuser2@example.com",
        "nom": "new",
        "contrasenya" : "a"
    }
    response = client.post("/signup/", json=user_data)
    assert response.status_code == 422

def test_create_user_incorrect_email():
    user_data = {
        "email": "newuser2example.com",
        "nom": "new",
        "contrasenya" : "asasasasasa"
    }
    response = client.post("/signup/", json=user_data)
    assert response.status_code == 422

def test_create_user_short_name():
    user_data = {
        "email": "newuser3@example.com",
        "nom": "n",
        "contrasenya" : "asasasasasa"
    }
    response = client.post("/signup/", json=user_data)
    assert response.status_code == 422

def test_create_user_with_organizer_role():
    user_data = {
        "email": "organizer@example.com",
        "nom": "organizer",
        "contrasenya" : "SecurePassword123",
        "es_organitzador": True
    }
    response = client.post("/signup/", json=user_data)
    assert response.status_code == 200
    assert response.json()["es_organitzador"] is True
