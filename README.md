# Green Steps - Quick Start Guide

This guide will help you run the application on your local computer.

## Prerequisites

Make sure you have installed:
- Python (3.8 or higher)
- Node.js (14 or higher)
- Git

## Running the Application

### Step 0: Get the Code

1. Open a terminal/command prompt
2. Navigate to where you want to store the project
3. Run this command:
```powershell
git clone https://github.com/chaitanya170904/sustainablity_tracker
cd sustainablity_tracker
```

### Step 1: Start the Backend Server

1. Open a new terminal/command prompt
2. Navigate to the project folder
3. Navigate to the backend folder
4. Run these commands:
```Command Prompt
# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies and start server
cd backend
pip install -r requirements.txt
python manage.py runserver
```

The backend server will start at http://localhost:8000

### Step 2: Start the Frontend Server

1. Open another terminal/command prompt
2. Navigate to the project folder
3. Navigate to the frontend folder
4. Run these commands:
```Command Prompt
cd frontend
npm install
npm start
```

The application will open automatically in your browser at http://localhost:3000

## Using the Application

1. The homepage will show you an overview of sustainable actions
2. Use the "Add Action" button to record new sustainable activities
3. View your total impact points at the top of the sustainable actions table

## Stopping the Application

To stop the application:
1. Press Ctrl+C in both terminal windows
2. Close the browser window

