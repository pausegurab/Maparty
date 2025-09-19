from pymongo import MongoClient
from app.core.config import Config

class MongoDBClient:
    def __init__(self,host="localhost",port=27017):
        self.host = host
        self.port = port
        self.client = MongoClient(host,port)
        self.database = Config.MONGO_DB
        self.collection = Config.MONGO_COLLECTION

    def close(self):
        self.client.close()

    def ping(self):
        return self.client.db_name.command('ping')

    def getDatabase(self, database):
        self.database = self.client[database]
        return self.database
    
    def getCollection(self, collection):
        self.collection = self.database[collection]
        return self.collection
    
    def clearDb(self,database):
        self.client.drop_database(database)

    def clearCollection(self, collection):
        self.client[collection].drop()

def get_mongodb_client():
    mongodb = MongoDBClient()
    try:
        yield mongodb
    finally:
        mongodb.close()