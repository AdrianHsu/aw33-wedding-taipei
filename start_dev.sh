#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p)
}
trap cleanup EXIT

echo "Starting Wedding Website..."

# Start Backend
echo "Starting Backend on http://localhost:8000..."
cd src
uv run uvicorn index:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

wait $BACKEND_PID $FRONTEND_PID
