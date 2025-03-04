from sqlalchemy import Table
from app.database import metadata

users = Table("users", metadata, autoload_with=metadata.bind)
accounts = Table("accounts", metadata, autoload_with=metadata.bind)