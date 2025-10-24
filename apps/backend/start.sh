#!/bin/sh
set -e

echo "🚀 Starting NestJS Microservices..."

# Start User microservice in the background
echo "Starting User microservice..."
node dist/apps/user/main.js &
USER_PID=$!

# Give user service a moment to start
sleep 2

# Start API Gateway in the foreground (keeps container alive)
echo "Starting API Gateway..."
node dist/apps/api-gateway/main.js &
GATEWAY_PID=$!

# Wait for both processes
wait $USER_PID $GATEWAY_PID
