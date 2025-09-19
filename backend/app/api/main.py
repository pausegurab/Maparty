from fastapi import APIRouter, FastAPI
from app.api.routes import login, signup, map

api_router = APIRouter()

@api_router.get("/", tags=["General"])
async def root():
    return {"message": "Benvingut a la meva API FastAPI!"}

api_router.include_router(signup.router, prefix="/signup", tags=["signup"])
api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(map.router, prefix="/map", tags=["map"])


