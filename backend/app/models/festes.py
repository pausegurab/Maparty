from sqlalchemy import Column, Integer, String, Date, Time, Boolean, LargeBinary, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Festa(Base):
    __tablename__ = "festes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nom = Column(String(255), nullable=False)
    dia = Column(Date, nullable=False)
    hora_inici = Column(Time, nullable=False)
    hora_final = Column(Time, nullable=False)
    adreca = Column(String(255), nullable=False)
    ciutat = Column(String(255), nullable=False)
    punt_lila = Column(Boolean, default=False)
    targeta = Column(Boolean, default=False)
    cartell_imatge = Column(LargeBinary)
    organitzador_id = Column(Integer, ForeignKey("usuaris.id"), nullable=False)

    organitzador = relationship("Usuari", back_populates="festes")
