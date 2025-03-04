from fastapi import FastAPI
from app.routers import users, accounts

app = FastAPI(title="Bank FastAPI Microservice")

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(accounts.router, prefix="/accounts", tags=["Accounts"])

@app.get("/")
def home():
    return {"message": "FastAPI Microservice is running!"}