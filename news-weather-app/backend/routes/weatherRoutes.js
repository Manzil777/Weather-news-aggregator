const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast, getAirPollution } = require('../controllers/weatherController');

router.get('/current', getCurrentWeather);
router.get('/forecast', getForecast);
router.get('/pollution', getAirPollution);

module.exports = router;
