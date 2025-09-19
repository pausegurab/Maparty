from datetime import datetime, timedelta, timezone
from fastapi import HTTPException
import os
import bcrypt
from fastapi import Depends, status
import jwt
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer


load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
def encrypt_string(input_str: str) -> str:
    salt = bcrypt.gensalt()
    
    encrypted_str = bcrypt.hashpw(input_str.encode('utf-8'), salt)
    
    return encrypted_str.decode('utf-8')


def verify_encrypted_string(input_str: str, encrypted_str: str) -> bool:
    return bcrypt.checkpw(input_str.encode('utf-8'), encrypted_str.encode('utf-8'))



def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expirat")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token invàlid")





