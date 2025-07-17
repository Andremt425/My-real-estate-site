from fastapi import FastAPI, HTTPException
from models.listing import Listing

listings = []

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to the real estate Backend!"}

@app.get("/listings")
def get_listings(): 
    return listings

@app.post("/listings")
def create_listing(listing: Listing): 
    if not listing.title or not listing.description or listing.price <= 0:
        raise HTTPException(status_code=400, detail="Invalid listing data")
    listings.append(listing)
    return {"message": "Listing created successfully", "listing": listing}

@app.put("/listings/{listing_id}")
def update_listing(listing_id: int, new_price: float):
    if listing_id < 0 or listing_id >= len(listings):
        raise HTTPException(status_code=404, detail="Listing not found")
    if new_price <= 0:
        raise HTTPException(status_code=400, detail="Invalid price")
    
    listing = listings[listing_id]
    updated_message = listing.update_price(new_price)
    return {"message": updated_message, "listing": listing}

@app.delete("/listings/{listing_id}")
def delete_listing(listing_id: int):    
    if listing_id < 0 or listing_id >= len(listings):
        raise HTTPException(status_code=404, detail="Listing not found")
    
    deleted_listing = listings.pop(listing_id)
    return {"message": "Listing deleted successfully", "listing": deleted_listing}

@app.get("/listings/{listing_id}")
def get_listing(listing_id: int):
    if listing_id < 0 or listing_id >= len(listings):
        raise HTTPException(status_code=404, detail="Listing not found")
    
    listing = listings[listing_id]
    return {"listing": listing}