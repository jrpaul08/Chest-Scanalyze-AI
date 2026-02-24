# Chest Scanalyze AI

A web application designed to assist radiologists in diagnosing diseases from chest X-ray images using artificial intelligence.

## Overview

Chest Scanalyze AI empowers medical professionals with AI-powered diagnostic support for chest X-ray analysis. The platform provides:

- **New Scan** — Upload chest X-rays and receive AI-generated diagnostic reports
- **Report Library** — Review previous scans and their analyses
- **Model Insights** — Learn how the AI models are trained, validated, and improved

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jrpaul08/Chest-Scanalyze-AI.git
   cd Chest-Scanalyze-AI
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the backend directory:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Project Structure

```
├── backend/
│   └── src/
│       ├── config/        # Database configuration
│       ├── controllers/   # Route controllers
│       ├── middleware/    # Authentication middleware
│       ├── models/        # MongoDB models
│       ├── routes/        # API routes
│       └── server.js      # Entry point
├── frontend/
│   └── src/
│       ├── pages/         # Page components
│       ├── pageLogic/     # Page-specific logic
│       ├── assets/        # Static assets
│       ├── App.jsx        # Main app component
│       └── main.jsx       # Entry point
└── model/                 # ML model (coming soon)
```

## License

This project is for educational and research purposes.

