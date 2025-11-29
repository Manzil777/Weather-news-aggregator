import React, { useEffect, useState } from 'react';
import { fetchWeather, fetchForecast, fetchWeatherByCoords, fetchForecastByCoords, fetchPins, addPin, deletePin, fetchAirPollution } from '../api';
import WeatherDashboard from '../components/WeatherDashboard';
import { useToast } from '../context/ToastContext';
import { Search, Loader, MapPin, Navigation, Star, Trash2 } from 'lucide-react';

const Weather = () => {
    const [current, setCurrent] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [pollution, setPollution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState(localStorage.getItem('defaultCity') || 'Bangalore');
    const [searchInput, setSearchInput] = useState('');
    const [pins, setPins] = useState([]);
    const { addToast } = useToast();

    const loadWeather = async (targetCity) => {
        setLoading(true);
        try {
            const [currentRes, forecastRes] = await Promise.all([
                fetchWeather(targetCity),
                fetchForecast(targetCity)
            ]);
            setCurrent(currentRes.data);
            setForecast(forecastRes.data);
            setCity(currentRes.data.name);

            // Fetch pollution using coordinates from weather data
            try {
                const { lat, lon } = currentRes.data.coord;
                const pollutionRes = await fetchAirPollution(lat, lon);
                setPollution(pollutionRes.data);
            } catch (err) {
                console.error('Error fetching pollution data:', err);
                setPollution(null); // Ensure pollution is null if fetch fails
            }

        } catch (error) {
            addToast('City not found', 'error');
        } finally {
            setLoading(false);
        }
    };

    const loadPins = async () => {
        try {
            const res = await fetchPins();
            setPins(res.data);
        } catch (error) {
            console.error('Error loading pins:', error);
        }
    };

    useEffect(() => {
        loadWeather(city);
        loadPins();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setCity(searchInput);
            loadWeather(searchInput);
            setSearchInput('');
        }
    };

    const [isLocating, setIsLocating] = useState(false);
    const [isPinning, setIsPinning] = useState(false);

    const handleLocation = () => {
        if (!navigator.geolocation) {
            addToast('Geolocation is not supported by your browser', 'error');
            return;
        }

        setIsLocating(true);
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const [currentRes, forecastRes, pollutionRes] = await Promise.all([
                        fetchWeatherByCoords(latitude, longitude),
                        fetchForecastByCoords(latitude, longitude),
                        fetchAirPollution(latitude, longitude)
                    ]);
                    setCurrent(currentRes.data);
                    setForecast(forecastRes.data);
                    setPollution(pollutionRes.data);
                    setCity(currentRes.data.name);
                    addToast('Location updated', 'success');
                } catch (error) {
                    addToast('Error fetching weather for your location', 'error');
                } finally {
                    setLoading(false);
                    setIsLocating(false);
                }
            },
            (error) => {
                addToast('Unable to retrieve your location', 'error');
                setLoading(false);
                setIsLocating(false);
            }
        );
    };

    const handlePin = async () => {
        if (!current) return;
        setIsPinning(true);
        try {
            const res = await addPin({
                city: current.name,
                lat: current.coord.lat,
                lon: current.coord.lon
            });
            setPins([res.data, ...pins]);
            addToast('City pinned', 'success');
        } catch (error) {
            addToast(error.response?.data?.message || 'Error pinning city', 'error');
        } finally {
            setTimeout(() => setIsPinning(false), 300);
        }
    };

    const handleDeletePin = async (id, e) => {
        e.stopPropagation();
        try {
            await deletePin(id);
            setPins(pins.filter(pin => pin.id !== id));
            addToast('Pin removed', 'success');
        } catch (error) {
            addToast('Error removing pin', 'error');
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 container p-4 md:p-8">
            <div className="text-center space-y-6">
                <h1 className="text-3xl font-bold text-primary-text">Global Weather</h1>

                <div className="max-w-md mx-auto space-y-4">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search city..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full bg-white border border-soft-gray rounded-full py-3 px-6 pl-12 text-primary-text focus:outline-none focus:border-yellow-accent text-lg shadow-sm"
                        />
                        <MapPin className="absolute left-4 top-3.5 text-secondary-text" size={20} />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bg-yellow-accent p-1.5 rounded-full text-black hover:bg-yellow-400 transition-colors"
                        >
                            <Search size={18} />
                        </button>
                    </form>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleLocation}
                            disabled={isLocating}
                            className={`flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-sm ${isLocating ? 'opacity-80 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                        >
                            <Navigation size={16} className={isLocating ? 'animate-spin' : ''} />
                            {isLocating ? 'Locating...' : 'Use my location'}
                        </button>
                        {current && (
                            <button
                                onClick={handlePin}
                                className={`flex items-center gap-2 px-4 py-2 bg-yellow-accent text-black rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-sm ${isPinning ? 'scale-110' : 'hover:scale-105 active:scale-95'}`}
                            >
                                <Star size={16} className={`transition-transform duration-300 ${isPinning ? 'rotate-180 fill-black' : ''}`} />
                                Pin {current.name}
                            </button>
                        )}
                    </div>
                </div>

                {pins.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {pins.map(pin => (
                            <div
                                key={pin.id}
                                onClick={() => loadWeather(pin.city)}
                                className="flex items-center gap-2 bg-white border border-soft-gray px-3 py-1 rounded-full cursor-pointer hover:border-yellow-accent hover:shadow-md transition-all duration-300 shadow-sm group"
                            >
                                <span className="text-sm font-medium text-primary-text">{pin.city}</span>
                                <button
                                    onClick={(e) => handleDeletePin(pin.id, e)}
                                    className="text-secondary-text hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                                >
                                    <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {
                loading ? (
                    <div className="flex justify-center py-10" >
                        <Loader className="animate-spin text-primary-text" size={48} />
                    </div>
                ) : (
                    <WeatherDashboard current={current} forecast={forecast} pollution={pollution} />
                )}
        </div >
    );
};

export default Weather;
