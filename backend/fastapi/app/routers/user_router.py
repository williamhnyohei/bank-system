from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.database import get_db
from models.user_model import UserBank
from pydantic import BaseModel

router = APIRouter()

#Classe usada para instanciar novos objetos com as post calls
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

#Pegar o JSON completo só digitar 127.0.0.1:8000/users
@router.get("/")
def get_users(db: Session = Depends(get_db)):
    users = db.query(UserBank).all()  # Fetch all users
    return users

#Pegar usuário completo pelo id
@router.get("/{user_id}")
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(UserBank).filter(UserBank.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "password": user.password,}

#Pegar o nome de um usuário pelo id
@router.get("/{user_id}/name")
def get_user_name_by_id(user_id: int, db: Session = Depends(get_db)):
    user_name = db.query(UserBank.name).filter(UserBank.id == user_id).scalar()
    if not user_name:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return {"name": user_name}

#Pegar todos os usuários
@router.get("/names")
def get_all_names(db: Session = Depends(get_db)):
    names = db.query(UserBank.name).all()
    return {"names": [name[0] for name in names]}

#Pegar o email de um usuário pelo id
@router.get("/{user_id}/email")
def get_user_name_by_id(user_id: int, db: Session = Depends(get_db)):
    user_email = db.query(UserBank.email).filter(UserBank.id == user_id).scalar()
    if not user_email:
        raise HTTPException(status_code=404, detail="Email não encontrado")
    return {"email": user_email}    

#Pegar todos os emails
@router.get("/emails")
def get_all_emails(db: Session = Depends(get_db)):
    emails = db.query(UserBank.email).all()
    return {"names": [email[0] for email in emails]}


#Post CALL para criar novo usuário
@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    #Checa se o email ja existe
    existing_user = db.query(UserBank).filter(UserBank.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    #Cria novo usuario
    new_user = UserBank(
        name=user.name,
        email=user.email,
        password=user.password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "password": new_user.password
    }

#DELETE call pra deletar usuario pelo ID
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    #Checa se o user existe
    user = db.query(UserBank).filter(UserBank.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Deleta o usre
    db.delete(user)
    db.commit()
    
    return {"message": f"Usuário {user_id} foi deletado."}