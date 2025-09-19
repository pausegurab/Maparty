from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.core.database import Base

class Seguidor(Base):
    __tablename__ = "seguidors"

    id = Column(Integer, primary_key=True, autoincrement=True)
    usuari_id = Column(Integer, ForeignKey("usuaris.id"), nullable=False)
    organitzador_id = Column(Integer, ForeignKey("usuaris.id"), nullable=False)

    __table_args__ = (UniqueConstraint("usuari_id", "organitzador_id", name="uq_usuari_organitzador"),)

    usuari = relationship("Usuari", foreign_keys=[usuari_id], back_populates="seguint")
    organitzador = relationship("Usuari", foreign_keys=[organitzador_id], back_populates="seguidors")