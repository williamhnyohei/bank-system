from fastapi import FastAPI
from routers import user_router, account_router
import uvicorn

app = FastAPI()

# Criar os routers. Pra cada router cria um novo
app.include_router(user_router.router, prefix="/users", tags=["Users"])
app.include_router(account_router.router, prefix="/account", tags=["Account"])

@app.get("/")
async def root():
    return {"message": "API funfa!!!"}

