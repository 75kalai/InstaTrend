#!/bin/bash

# Deploy script for MERN stack project

# Step 1: Navigate to the frontend folder and build React app
curl -sf https://gobinaries.com/tj/node-prune | sh

echo "Step 1: Building React app"
cd front-end
npm install --production
modclean -r
node-prune
npm run build --prod

# Step 2: Move build to the backend's public folder
echo "Step 2: Moving build to backend's public folder"
mv build ../back-end/

# Step 3: Navigate to the backend folder
echo "Step 3: Deploying backend"
cd ../back-end
npm install --production
modclean -r
node-prune

# Step 4: Start the production server
echo "Step 4: Starting production server"
modclean -r
node-prune
npm start

echo "Deployment complete"
