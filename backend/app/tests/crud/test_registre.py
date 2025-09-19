from fastapi.encoders import jsonable_encoder
from pydantic import ValidationError
import pytest
from app.crud import usuari
from app.models import Usuari
from app.schemas.usuaris import UserCreate, UserSchema, UserUpdate
from app.core.database import get_db

from sqlalchemy.orm import Session

def test_create_user():
    db = next(get_db())
    email = "random@email.com"
    contrasenya = "password123"
    nom = "False"
    user_in = UserCreate(email=email, contrasenya=contrasenya, nom=nom)
    user = usuari.create_user(db=db, user_in=user_in)
    assert user.email == email
    assert hasattr(user, "contrasenya_hash")

def test_create_user_invalid_email():
    with pytest.raises(ValidationError) as exc_info:
        user_in = UserCreate(contrasenya="password123", nom="Test User", email="")

    assert "email" in str(exc_info.value)
    assert "value is not a valid email address" in str(exc_info.value)

def test_create_user_invalid_password():
    with pytest.raises(ValidationError) as exc_info:
        user_in = UserCreate(email="test@user.com", contrasenya="p", nom="Test User")

    assert "contrasenya" in str(exc_info.value)
    assert "should have at least 8 characters" in str(exc_info.value)


def test_get_user_by_id() -> None:
    db = next(get_db())
    email = "random2@email.com"
    contrasenya = "password123"
    nom = "False"
    user_in = UserCreate(email=email, contrasenya=contrasenya, nom=nom)
    user = usuari.create_user(db=db, user_in=user_in)
    user_2 = usuari.get_user_by_id(db=db, user_id=user.id)
    assert user_2
    assert user.email == user_2.email
    assert jsonable_encoder(user) == jsonable_encoder(user_2)

def test_get_user_by_email() -> None:
    db = next(get_db())
    user_2 = usuari.get_user_by_email(db=db, email="random2@email.com")
    assert user_2
    assert "random2@email.com" == user_2.email

def test_get_user_by_email_none() -> None:
    db = next(get_db())
    email = ""
    user = usuari.get_user_by_email(db=db, email=email)
    assert user is None

def test_update_user():
    db = next(get_db())
    email = "update@email.com"
    contrasenya = "password123"
    nom = "False"

    user_in = UserCreate(email=email, contrasenya=contrasenya, nom=nom)
    user = usuari.create_user(db=db, user_in=user_in)

    new_nom = "True"
    user_update = UserUpdate(nom=new_nom)
    updated_user = usuari.update_user(db=db, user_id=user.id, user_in=user_update)

    assert updated_user.nom == new_nom

def test_delete_user():
    db = next(get_db())
    email = "delete@email.com"
    contrasenya = "password123"
    nom = "False"
    user_in = UserCreate(email=email, contrasenya=contrasenya, nom=nom)
    user = usuari.create_user(db=db, user_in=user_in)
    user_id = user.id
    user_deleted = usuari.delete_user(db=db, user_id=user_id)
    deleted_user = usuari.get_user_by_id(db=db,user_id=user_id)
    assert deleted_user is None