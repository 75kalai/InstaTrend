#!/bin/bash

# Deploy script for MERN stack project

# Step 0: Install pruning packages
go get github.com/tj/node-prune
# curl -sf https://gobinaries.com/tj/node-prune | sh

# Step 1: Navigate to the frontend folder and build React app

echo "Step 1: Building React app"
cd front-end
# npm install --omit=dev
npm ci --only=production
modclean -r
node-prune
npm run build

# Step 2: Move build to the backend's public folder
echo "Step 2: Moving build to backend's public folder"
mv build ../back-end/

# Step 3: Navigate to the backend folder
echo "Step 3: Deploying backend"
cd ../back-end
# npm install --omit=dev
npm ci --only=production
modclean -r
node-prune

# Step 4: Start the production server
echo "Step 4: Starting production server"
modclean -r
node-prune
npm start

echo "Deployment complete"
