"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch("http://localhost:8000/listings");
      const data = await response.json();
      setListings(data);
    };
    fetchListings();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{listing.title}</h2>
            <p className="text-gray-600 mt-2">{listing.description}</p>
            <p className="text-green-600 font-bold mt-2">
              ${listing.price.toLocaleString()}
            </p>
            <Link
              href={`/listings/${listing.id}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
