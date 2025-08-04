#!/bin/sh

# Wait until Postgres is ready
echo "Waiting for Postgres..."

until pg_isready -h db -p 5432; do
  sleep 1
done

echo "Postgres is up. Running migrations..."
npx prisma db push

echo "Starting backend..."
exec node app.js
