from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import List
from auth import verify_token

app = FastAPI()

# OAuth2 and Mock Database
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
items = {}

# Models
class Item(BaseModel):
    id: int
    name: str

# CRUD Endpoints
@app.get("/items", response_model=List[Item])
async def get_items(token: str = Depends(oauth2_scheme)):
    verify_token(token)
    return list(items.values())

@app.post("/items", response_model=Item)
async def add_item(item: Item, token: str = Depends(oauth2_scheme)):
    verify_token(token)
    if item.id in items:
        raise HTTPException(status_code=400, detail="Item already exists")
    items[item.id] = item
    return item

@app.delete("/items/{item_id}")
async def delete_item(item_id: int, token: str = Depends(oauth2_scheme)):
    verify_token(token)
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    del items[item_id]
    return {"message": "Item deleted"}
