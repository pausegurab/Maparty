from app.models import Usuari
from app.schemas.usuaris import UserCreate, UserResponse, UserSchema, UserUpdate
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.security import encrypt_string, verify_encrypted_string


def get_user_by_email(*, db: Session, email: str) -> Usuari | None:
    return db.query(Usuari).filter(Usuari.email==email).first()


def create_user(*, db: Session, user_in: UserCreate) -> Usuari:
    db_user = Usuari(
        nom=user_in.nom,
        email=user_in.email,
        contrasenya_hash=encrypt_string(user_in.contrasenya),
        es_organitzador=user_in.es_organitzador,
        superusuari=user_in.superusuari,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return Usuari(
        id=db_user.id,
        email=db_user.email,
        nom=db_user.nom,
        contrasenya_hash=db_user.contrasenya_hash,
        es_organitzador=db_user.es_organitzador,
        superusuari=db_user.superusuari,
        adreça=db_user.adreça,
        instagram=db_user.instagram,
        foto1=db_user.foto1,
        foto2=db_user.foto2,
        foto3=db_user.foto3,
        foto4=db_user.foto4,
        foto5=db_user.foto5,
    )

def get_user_by_id(*, db: Session, user_id: int) -> Usuari:
    return db.query(Usuari).filter(Usuari.id==user_id).first()

def update_user(*, db: Session, user_id: int, user_in: UserUpdate) -> Usuari:
    user = get_user_by_id(db=db, user_id=user_id)
    user_data = user_in.model_dump(exclude_unset=True)
    for key, value in user_data.items():
        setattr(user, key, value)
    db.commit()
    db.refresh(user)
    return user

def delete_user(*, db: Session, user_id: int) -> None:
    user = get_user_by_id(db=db, user_id=user_id)
    db.delete(user)
    db.commit()
    return None

def get_password(*, db: Session, email: str):
    user = get_user_by_email(db=db, email=email)
    return user.contrasenya_hash

def authenticate(*, db: Session, email: str, password:str):
    user = get_user_by_email(db=db, email=email)
    if not user:
        return False
    if not verify_password(db=db,email=email,password=password):
        return False
    return user

def verify_password(*, db: Session, email: str, password:str):
    hash_password = get_password(db=db, email=email)
    if verify_encrypted_string(password, hash_password) == False:
        return False
    return True