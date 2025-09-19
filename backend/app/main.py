""" Main application module """
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware
from app.core.create_superuser import create_superuser

from app.api.main import api_router
from app.core.config import Config




@asynccontextmanager
async def lifespan(app: FastAPI):
    create_superuser()
    yield

def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"

app = FastAPI(
    title=Config.PROJECT_NAME,
    openapi_url=f"{Config.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
    lifespan=lifespan
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=Config.API_V1_STR)


