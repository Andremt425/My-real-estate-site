const API_BASE_URL = "http://localhost:8000";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

export async function apiCall<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body } = options;

  const headers = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
}

// Example usage:
/*
// GET request
const listings = await apiCall('/listings');

// POST request
const newListing = await apiCall('/listings', {
  method: 'POST',
  body: {
    title: 'New Home',
    description: 'Beautiful property',
    price: 299999
  }
});

// PUT request
const updatedListing = await apiCall(`/listings/${id}`, {
  method: 'PUT',
  body: { price: 319999 }
});

// DELETE request
await apiCall(`/listings/${id}`, { method: 'DELETE' });
*/
