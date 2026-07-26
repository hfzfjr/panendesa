#!/bin/bash

# PanenDesa Deployment Script
# This script deploys the PanenDesa application using Docker Compose
# It is idempotent and safe to run multiple times

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
USE_NO_CACHE=${USE_NO_CACHE:-false}
COMPOSE_PROJECT_NAME="panendesa"

echo -e "${GREEN}=== PanenDesa Deployment Script ===${NC}"
echo ""

# Load environment variables from .env file
if [ -f .env ]; then
    echo -e "${GREEN}Loading environment variables from .env...${NC}"
    set -a
    source .env
    set +a
    echo -e "${GREEN}Environment variables loaded successfully${NC}"
else
    echo -e "${RED}Error: .env file not found in root directory${NC}"
    echo "Please create a .env file based on .env.example"
    exit 1
fi

echo ""

# Pull latest changes from git
echo -e "${GREEN}Pulling latest changes from git...${NC}"
git pull origin main
echo -e "${GREEN}Git pull completed${NC}"
echo ""

# Stop existing containers (safe if they don't exist)
echo -e "${GREEN}Stopping existing containers...${NC}"
docker compose down || echo -e "${YELLOW}No existing containers to stop${NC}"
echo -e "${GREEN}Containers stopped${NC}"
echo ""

# Build Docker images
if [ "$USE_NO_CACHE" = "true" ]; then
    echo -e "${YELLOW}Building Docker images with --no-cache (this may take a while)...${NC}"
    docker compose build --no-cache
else
    echo -e "${GREEN}Building Docker images (using cache for faster builds)...${NC}"
    docker compose build
fi
echo -e "${GREEN}Docker images built successfully${NC}"
echo ""

# Start containers
echo -e "${GREEN}Starting containers...${NC}"
docker compose up -d
echo -e "${GREEN}Containers started${NC}"
echo ""

# Wait for containers to be healthy
echo -e "${GREEN}Waiting for containers to be healthy...${NC}"
sleep 10

# Check container status
echo -e "${GREEN}Checking container status...${NC}"
docker compose ps
echo ""

# Check if containers are running
BACKEND_STATUS=$(docker compose ps -q backend | xargs docker inspect -f '{{.State.Status}}' 2>/dev/null || echo "not found")
FRONTEND_STATUS=$(docker compose ps -q frontend | xargs docker inspect -f '{{.State.Status}}' 2>/dev/null || echo "not found")

if [ "$BACKEND_STATUS" = "running" ] && [ "$FRONTEND_STATUS" = "running" ]; then
    echo -e "${GREEN}=== Deployment Successful ===${NC}"
    echo ""
    echo -e "${GREEN}Frontend URL: http://localhost:${FRONTEND_PORT:-3010}${NC}"
    echo -e "${GREEN}Backend URL: http://localhost:${BACKEND_PORT:-3011}${NC}"
    echo ""
    echo -e "${GREEN}Health Check:${NC}"
    echo -e "  Backend: curl http://localhost:${BACKEND_PORT:-3011}"
    echo -e "  Frontend: curl http://localhost:${FRONTEND_PORT:-3010}"
else
    echo -e "${RED}=== Deployment Failed ===${NC}"
    echo -e "${RED}Backend status: $BACKEND_STATUS${NC}"
    echo -e "${RED}Frontend status: $FRONTEND_STATUS${NC}"
    echo ""
    echo -e "${YELLOW}Check logs with: docker compose logs${NC}"
    exit 1
fi
