@echo off
REM Deploy script for MERN stack project
REM ONLY BUILDS front-end and RUN's back-end server

REM Step 1: Navigate to the frontend folder and build React app
echo Step 1: Building React app
cd front-end
REM npm run build
echo frontend build is complete

REM Step 2: Move build to the backend's public folder
echo Step 2: Moving build to backend's public folder
move build ..\back-end\
echo Moved build to backend

REM Step 3: Navigate to the backend folder
echo Step 3: Deploying backend
cd ..\back-end

REM Step 4: Start the production server
echo Step 4: Starting production server
npm start

echo Deployment complete