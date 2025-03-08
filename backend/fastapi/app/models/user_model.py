from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

#Vai ser necessário criar um model pra cada tabela. Os models são uma maneira de acessar a classe sem precisar declarar as variáveis sempre
class UserBank(Base):
    __tablename__ = "user_bank"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)