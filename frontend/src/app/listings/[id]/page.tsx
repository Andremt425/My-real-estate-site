"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function ListingDetail() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/listings/${params.id}`
        );
        const data = await response.json();
        setListing(data.listing);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [params.id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8000/listings/${params.id}`, {
        method: "DELETE",
      });
      router.push("/listings");
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (!listing) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>
      <p className="text-2xl text-green-600 font-bold mb-4">
        ${listing.price.toLocaleString()}
      </p>
      <p className="text-gray-600 mb-8">{listing.description}</p>

      <div className="flex gap-4">
        <button
          onClick={() => router.push(`/listings/${params.id}/edit`)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
          Edit Listing
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
          Delete Listing
        </button>
      </div>
    </div>
  );
}
