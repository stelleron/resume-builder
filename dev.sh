#!/bin/bash
set -e

# Start frontend in background
echo "⚡️ Starting frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!

# Start backend
echo "🖥️ Starting backend..."
cd ../backend
node app.js

# Optional: wait for frontend to exit if backend terminates
wait $FRONTEND_PID $BACKEND_PID
