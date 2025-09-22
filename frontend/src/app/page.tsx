import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Welcome to Real Estate Finder</h1>

      <section className="mb-8">
        <p className="text-lg text-gray-700 mb-4">
          Find your perfect property with our comprehensive real estate listing
          platform. Browse through available properties, create new listings, or
          manage your existing ones.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">For Buyers</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Browse available properties</li>
            <li>✓ View detailed property information</li>
            <li>✓ Compare prices and features</li>
          </ul>
          <Link
            href="/listings"
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            View Listings
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">For Sellers</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✓ Create new property listings</li>
            <li>✓ Manage your listings</li>
            <li>✓ Update property details</li>
          </ul>
          <Link
            href="/listings/new"
            className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Create Listing
          </Link>
        </div>
      </section>

      <nav className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="flex gap-4">
          <Link href="/listings" className="text-blue-500 hover:underline">
            Browse Listings
          </Link>
          <Link href="/listings/new" className="text-blue-500 hover:underline">
            Add New Property
          </Link>
        </div>
      </nav>
    </main>
  );
}
