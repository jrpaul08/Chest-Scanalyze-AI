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

