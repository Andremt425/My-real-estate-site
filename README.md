# Real Estate Listing Site

A full-stack web application for managing real estate listings built with FastAPI and Next.js.

## Prerequisites

- Python 3.8 or higher
- Node.js 18 or higher
- npm or yarn
- Git

## Project Structure

```
My-real-estate-site/
├── backend/
│   ├── models/
│   ├── scripts/
│   ├── main.py
│   └── database.py
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

## Backend Setup

1. Create and activate virtual environment:

   ```bash
   cd backend
   python -m venv .venv
   .\.venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

   Or install individually:

   ```bash
   pip install "fastapi[standard]"
   pip install sqlalchemy
   pip install databases[sqlite]
   pip install aiosqlite
   ```

3. Initialize database:

   ```bash
   cd scripts
   python init_db.py
   python db_migrations.py
   ```

4. Run the backend server:

   ```bash
   cd backend
   uvicorn main:app --reload
   ```

   The API will be available at `http://localhost:8000`

## Frontend Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Create `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## API Endpoints

- `GET /listings` - Get all listings
- `GET /listings/{id}` - Get specific listing
- `POST /listings` - Create new listing
- `PUT /listings/{id}` - Update listing price
- `DELETE /listings/{id}` - Delete listing

## Development

1. Start both servers:

   ```bash
   # Terminal 1 - Backend
   cd backend
   .\.venv\Scripts\activate
   uvicorn main:app --reload

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. Access the applications:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`

## Database Management

To reset the database:

1. Stop the backend server
2. Delete the `real_estate.db` file
3. Run the database initialization scripts again

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT
