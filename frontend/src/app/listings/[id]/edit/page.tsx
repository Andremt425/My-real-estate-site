"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiCall } from "@/utils/api";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function EditListing() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await apiCall<{ listing: Listing }>(
          `/listings/${params.id}`
        );
        setFormData({
          title: data.listing.title,
          description: data.listing.description,
          price: data.listing.price.toString(),
        });
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiCall(`/listings/${params.id}`, {
        method: "PUT",
        body: {
          price: parseFloat(formData.price),
        },
      });
      router.push(`/listings/${params.id}`);
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            disabled
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows={4}
            disabled
          />
        </div>
        <div>
          <label className="block mb-2">Price ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Update Listing
        </button>
      </form>
    </div>
  );
}
