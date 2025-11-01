#!/bin/sh
set -e

echo "🚀 Starting NestJS Microservices..."

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma Client (in case it's not generated)
echo "Generating Prisma Client..."
npx prisma generate

# Start API Gateway in the background
echo "Starting API Gateway..."
node dist/apps/api-gateway/main.js &
GATEWAY_PID=$!

# Give api gateway a moment to start
sleep 2

# Start User microservice in the foreground
echo "Starting User microservice..."
node dist/apps/user/main.js &
USER_PID=$!

# Wait for both processes
wait $USER_PID $GATEWAY_PID
