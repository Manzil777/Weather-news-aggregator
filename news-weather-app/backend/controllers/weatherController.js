const axios = require('axios');
const WeatherCache = require('../models/WeatherCache');
const { Op } = require('sequelize');

const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

const getCachedData = async (key) => {
    const cacheEntry = await WeatherCache.findOne({
        where: {
            queryKey: key,
            expiresAt: { [Op.gt]: new Date() }
        }
    });
    return cacheEntry ? cacheEntry.data : null;
};

const setCachedData = async (key, data) => {
    const expiresAt = new Date(Date.now() + CACHE_DURATION_MS);
    // Upsert cache
    const existing = await WeatherCache.findOne({ where: { queryKey: key } });
    if (existing) {
        await existing.update({ data, expiresAt });
    } else {
        await WeatherCache.create({ queryKey: key, data, expiresAt });
    }
};

const getCurrentWeather = async (req, res) => {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
        return res.status(400).json({ message: 'City or coordinates (lat, lon) required' });
    }

    const queryKey = city ? `current:${city.toLowerCase()}` : `current:${lat},${lon}`;

    try {
        const cached = await getCachedData(queryKey);
        if (cached) return res.json(cached);

        const params = {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
        };
        if (city) params.q = city;
        else {
            params.lat = lat;
            params.lon = lon;
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params });
        await setCachedData(queryKey, response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.status(500).json({ message: 'Error fetching weather', error: error.message });
    }
};

const getForecast = async (req, res) => {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
        return res.status(400).json({ message: 'City or coordinates (lat, lon) required' });
    }

    const queryKey = city ? `forecast:${city.toLowerCase()}` : `forecast:${lat},${lon}`;

    try {
        const cached = await getCachedData(queryKey);
        if (cached) return res.json(cached);

        const params = {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
        };
        if (city) params.q = city;
        else {
            params.lat = lat;
            params.lon = lon;
        }

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, { params });
        await setCachedData(queryKey, response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Forecast API Error:', error.message);
        res.status(500).json({ message: 'Error fetching forecast', error: error.message });
    }
};

const getAirPollution = async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ message: 'Coordinates (lat, lon) required' });
    }

    const queryKey = `pollution:${lat},${lon}`;

    try {
        const cached = await getCachedData(queryKey);
        if (cached) return res.json(cached);

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution`, {
            params: {
                lat,
                lon,
                appid: process.env.OPENWEATHER_KEY,
            },
        });
        await setCachedData(queryKey, response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Air Pollution API Error:', error.message);
        res.status(500).json({ message: 'Error fetching air pollution data', error: error.message });
    }
};

module.exports = { getCurrentWeather, getForecast, getAirPollution };
