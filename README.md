# Task Manager Application

## Overview
This is a simple full-stack Task Manager application that allows users to create, view, update, and delete tasks. The project demonstrates basic frontend-backend integration, REST API design, and database usage.

## Features
- Create new tasks
- View all tasks
- Update task status (Pending / Done)
- Edit task details
- Delete tasks
- Display task creation timestamp
- Loading and empty state handling

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose)

## API Endpoints
- GET /tasks → Fetch all tasks
- POST /tasks → Create a task
- PATCH /tasks/:id → Update a task
- DELETE /tasks/:id → Delete a task

## Deployment
Live Application:
https://task-manager-1-1p71.onrender.com/

## Setup Instructions

1. Clone the repository:
   git clone https://github.com/Ashlesha-17/task-manager.git

2. Navigate to the project:
   cd task-manager/backend

3. Install dependencies:
   npm install

4. Create a .env file and add:
   MONGO_URI=your_mongodb_connection_string

5. Run the server:
   npm start

6. Open in browser:
   http://localhost:5000

## Notes
- The application uses MongoDB for persistent storage.
- The focus is on functionality, clean structure, and API integration rather than advanced UI design.
