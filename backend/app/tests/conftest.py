import os
from collections.abc import Generator
import pytest
from alembic import command
from alembic.config import Config as AlembicConfig
from fastapi.testclient import TestClient
from app.core.database import get_db
from app.main import app
from app.models import Usuari
from app.core.config import Config as config


os.environ["ENVIRONMENT"] = "testing"


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    
    config.create_database_if_not_exists()
    alembic_cfg = AlembicConfig("backend/alembic.ini")
    command.upgrade(alembic_cfg, "head")

    yield
@pytest.fixture(scope="session", autouse=True)
def db_session():
    db = next(get_db())
    try:
        yield db
    finally:
        db.query(Usuari).delete()
        db.commit()
        db.close()

