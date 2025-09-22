from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from models.listing import Listing, Base
from database import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request validation
class ListingCreate(BaseModel):
    title: str
    description: str
    price: float

class ListingResponse(BaseModel):
    id: int
    title: str
    description: str
    price: float

    class Config:
        orm_mode = True

@app.get("/")
def root():
    return {"message": "Welcome to the real estate Backend!"}

@app.get("/listings")
def get_listings(db: Session = Depends(get_db)):
    listings = db.query(Listing).all()
    return listings

@app.post("/listings")
def create_listing(listing: ListingCreate, db: Session = Depends(get_db)):
    db_listing = Listing(
        title=listing.title,
        description=listing.description,
        price=listing.price
    )
    db.add(db_listing)
    db.commit()
    db.refresh(db_listing)
    return {"message": "Listing created successfully", "listing": db_listing}

@app.put("/listings/{listing_id}")
def update_listing(listing_id: int, new_price: float, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    if new_price <= 0:
        raise HTTPException(status_code=400, detail="Invalid price")
    
    listing.price = new_price
    db.commit()
    return {"message": "Price updated successfully", "listing": listing}

@app.delete("/listings/{listing_id}")
def delete_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    db.delete(listing)
    db.commit()
    return {"message": "Listing deleted successfully", "listing": listing}

@app.get("/listings/{listing_id}")
def get_listing(listing_id: int, db: Session = Depends(get_db)):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return {"listing": listing}