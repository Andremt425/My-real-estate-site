from sqlalchemy import create_engine, inspect
from database import SQLALCHEMY_DATABASE_URL
from models.listing import Base

def init_database():
    # Create engine
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    inspector = inspect(engine)

    # Check if database exists
    if not inspector.has_table("listings"):
        print("Creating database tables...")
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully!")
    else:
        print("Database tables already exist!")

if __name__ == "__main__":
    init_database()