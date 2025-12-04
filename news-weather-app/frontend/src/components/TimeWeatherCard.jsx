import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const TimeWeatherCard = ({ weather }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!weather) return (
        <div className="glass-panel h-full rounded-3xl p-8 flex items-center justify-center animate-pulse">
            <div className="text-white/50">Loading weather data...</div>
        </div>
    );

    return (
        <div className="glass-panel h-full rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/20 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-70"></div>

            <div>
                <h2 className="text-6xl font-display font-bold tracking-tighter text-white mb-2">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </h2>
                <p className="text-lg text-white/60 font-medium">
                    {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-5xl font-bold text-white mb-1">
                            {Math.round(weather.main.temp)}°
                        </div>
                        <div className="text-white/80 text-lg capitalize flex items-center gap-2">
                            {weather.weather[0].description}
                        </div>
                    </div>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                        alt={weather.weather[0].description}
                        className="w-24 h-24 object-contain drop-shadow-lg"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                    <div className="flex flex-col items-center text-center">
                        <Wind size={20} className="text-accent-primary mb-2" />
                        <span className="text-sm text-white/60">Wind</span>
                        <span className="font-semibold text-white">{weather.wind.speed} m/s</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Droplets size={20} className="text-accent-primary mb-2" />
                        <span className="text-sm text-white/60">Humidity</span>
                        <span className="font-semibold text-white">{weather.main.humidity}%</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Thermometer size={20} className="text-accent-primary mb-2" />
                        <span className="text-sm text-white/60">Feels Like</span>
                        <span className="font-semibold text-white">{Math.round(weather.main.feels_like)}°</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeWeatherCard;
