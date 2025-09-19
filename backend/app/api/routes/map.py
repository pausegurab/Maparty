from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import timedelta
import random
from typing import Annotated, Any
from app.core.mongodb_client import MongoDBClient, get_mongodb_client


router = APIRouter()

@router.post("/ubicacions")
def random_ubications(mongo_client: MongoDBClient = Depends(get_mongodb_client)) -> Any:
    BARCELONA_BOUNDS = {
        "min_lat": 41.35,
        "max_lat": 41.42,
        "min_lon": 2.10,
        "max_lon": 2.20,
    }

    locations = []
    for i in range(5):
        lat = random.uniform(BARCELONA_BOUNDS["min_lat"], BARCELONA_BOUNDS["max_lat"])
        lon = random.uniform(BARCELONA_BOUNDS["min_lon"], BARCELONA_BOUNDS["max_lon"])
        location = {
            "name": f"Ubicació {i + 1}",
            "location": {
                "type": "Point",
                "coordinates": [lon, lat],
            },
        }
        locations.append(location)

    db = mongo_client.getDatabase(mongo_client.database)
    collection = db[mongo_client.collection]
    result = collection.insert_many(locations)

    return {"message": f"{len(result.inserted_ids)} ubicacions creades correctament."}

@router.get("/ubicacions")
def get_ubications(mongo_client: MongoDBClient = Depends(get_mongodb_client)) -> Any:
    db = mongo_client.getDatabase(mongo_client.database)
    collection = db[mongo_client.collection]

    documents = list(collection.find({}, {"_id": 0}))

    return {"ubicacions": documents}


