from sqlalchemy import Column, Integer, String, Boolean, LargeBinary
from sqlalchemy.orm import relationship
from ..core.database import Base

class Usuari(Base):
    __tablename__ = "usuaris"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    nom = Column(String(100), nullable=False)
    contrasenya_hash = Column(String(255), nullable=False)
    es_organitzador = Column(Boolean, default=False)
    superusuari = Column(Boolean, default=False)
    adreça = Column(String(255), nullable=False, default="")
    instagram = Column(String(255), nullable=True)
    
    foto1 = Column(LargeBinary, nullable=True)
    foto2 = Column(LargeBinary, nullable=True)
    foto3 = Column(LargeBinary, nullable=True)
    foto4 = Column(LargeBinary, nullable=True)
    foto5 = Column(LargeBinary, nullable=True)

    festes = relationship("Festa", back_populates="organitzador")

    seguint = relationship("Seguidor", foreign_keys="Seguidor.usuari_id", back_populates="usuari")
    seguidors = relationship("Seguidor", foreign_keys="Seguidor.organitzador_id", back_populates="organitzador")
