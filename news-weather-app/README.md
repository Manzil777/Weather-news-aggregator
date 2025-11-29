# MERN News & Weather Aggregator (SQLite Edition)

A full-stack web application that aggregates news from NewsAPI and weather data from OpenWeatherMap. Built with React, Node.js, Express, and SQLite.

## Features
- **Dashboard**: View top headlines and current weather for your city.
- **News**: Search and filter news by category.
- **Weather**: Check current weather and 5-day forecast for any city.
- **Saved Articles**: Save interesting articles to your local database.
- **Dark Mode**: Premium dark theme by default.
- **Responsive**: Mobile-first design.

## Project Structure
```
news-weather-app/
├── backend/         # Express server & SQLite database
│   ├── config/      # Database connection
│   ├── controllers/ # Route logic
│   ├── models/      # Sequelize models
│   └── routes/      # API endpoints
└── frontend/        # React + Vite application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Global state (Toast)
    │   └── pages/      # Application views
```

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and add your API keys:
     - `NEWS_API_KEY`: Get from [NewsAPI](https://newsapi.org/)
     - `OPENWEATHER_KEY`: Get from [OpenWeather](https://openweathermap.org/)
4. Start the server:
   ```bash
   npm run dev
   # Server runs on http://localhost:4000
   ```

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # App runs on http://localhost:5173
   ```

## Notes
- **Database**: Uses SQLite (`database.sqlite` will be created in the backend folder). No external DB setup required.
- **Caching**: News API responses are cached in-memory for 10 minutes to avoid hitting rate limits.
- **Rate Limiting**: The API limits requests to 100 per 15 minutes per IP.
