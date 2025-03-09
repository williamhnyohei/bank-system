from sqlalchemy import MetaData, Table, create_engine
from app.config import settings

engine = create_engine(settings.DATABASE_URL)
metadata = MetaData()
metadata.reflect(bind=engine)

users = Table("users", metadata, autoload_with=engine)