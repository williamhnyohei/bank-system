from fastapi import APIRouter

router = APIRouter()  # ✅ This should be present

@router.get("/")
async def get_users():
    return {"message": "endpoint de contas funfa!"}