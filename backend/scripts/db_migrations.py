from sqlalchemy import create_engine, text
from database import SQLALCHEMY_DATABASE_URL

def run_migrations():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    
    # Add your migration queries here
    migrations = [
        """
        CREATE TABLE IF NOT EXISTS listings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        """
    ]

    with engine.connect() as connection:
        for migration in migrations:
            print(f"Running migration:\n{migration}")
            connection.execute(text(migration))
            connection.commit()

if __name__ == "__main__":
    run_migrations()