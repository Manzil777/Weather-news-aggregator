import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
});

export const fetchNews = (category = '', q = '') => api.get('/news', { params: { category, q } });
export const fetchWeather = (city) => api.get('/weather/current', { params: { city } });
export const fetchWeatherByCoords = (lat, lon) => api.get('/weather/current', { params: { lat, lon } });
export const fetchForecast = (city) => api.get('/weather/forecast', { params: { city } });
export const fetchForecastByCoords = (lat, lon) => api.get('/weather/forecast', { params: { lat, lon } });
export const fetchAirPollution = (lat, lon) => api.get('/weather/pollution', { params: { lat, lon } });
export const fetchSavedArticles = () => api.get('/articles');
export const saveArticle = (article) => api.post('/articles', article);
export const deleteArticle = (id) => api.delete(`/articles/${id}`);
export const fetchPins = () => api.get('/pins');
export const addPin = (pin) => api.post('/pins', pin);
export const deletePin = (id) => api.delete(`/pins/${id}`);

export default api;
