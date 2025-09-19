from sqlalchemy.orm import Session
from app.models import Usuari
from app.core.database import get_db
from app.core.security import encrypt_string
from app.core.config import Config


def create_superuser():
    db = next(get_db())
    print("Comprovant si el superusuari ja existeix...")
    if not db.query(Usuari).filter(Usuari.email == "superuser@example.com").first():
        hash = encrypt_string(Config.PASSWORD)
        superuser = Usuari(
            email="superuser@example.com",
            contrasenya_hash=hash,
            nom="Super Usuari",
            superusuari=True
        )
        db.add(superuser)
        db.commit()
        print("Superusuari creat amb èxit!")
    else:
        print("Ja existeix un superusuari.")
