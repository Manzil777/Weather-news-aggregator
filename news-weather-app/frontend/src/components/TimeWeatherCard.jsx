import React, { useState, useEffect } from 'react';
import { CloudRain, Cloud, Sun, CloudLightning, CloudSnow, Wind } from 'lucide-react';

const TimeWeatherCard = ({ weather }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        const strMinutes = minutes < 10 ? '0' + minutes : minutes;
        return { time: `${hours < 10 ? '0' + hours : hours}:${strMinutes}`, ampm };
    };

    const { time, ampm } = formatTime(currentTime);
    const dateStr = currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });

    const getWeatherIcon = (description) => {
        if (!description) return <Sun size={48} className="text-gray-400 dark:text-gray-500" />;
        const desc = description.toLowerCase();
        if (desc.includes('rain')) return <CloudRain size={48} className="text-gray-400 dark:text-gray-500" />;
        if (desc.includes('cloud')) return <Cloud size={48} className="text-gray-400 dark:text-gray-500" />;
        if (desc.includes('snow')) return <CloudSnow size={48} className="text-gray-400 dark:text-gray-500" />;
        if (desc.includes('storm') || desc.includes('thunder')) return <CloudLightning size={48} className="text-gray-400 dark:text-gray-500" />;
        if (desc.includes('wind')) return <Wind size={48} className="text-gray-400 dark:text-gray-500" />;
        return <Sun size={48} className="text-gray-400 dark:text-gray-500" />;
    };

    return (
        <div className="flex flex-col justify-center space-y-4 text-gray-900 dark:text-white h-full p-4 transition-colors duration-300">
            <p className="text-base text-gray-600 dark:text-gray-400">{dateStr}</p>
            <div className="flex items-end">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none">{time}</h1>
                <span className="text-xl md:text-2xl font-medium ml-2 mb-2">{ampm}</span>
            </div>

            {weather ? (
                <div className="flex items-center space-x-4 mt-4">
                    {getWeatherIcon(weather.weather[0].description)}
                    <div>
                        <p className="text-2xl font-semibold">{Math.round(weather.main.temp)}°</p>
                        <p className="text-gray-600 dark:text-gray-400 capitalize">{weather.weather[0].description}</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-4 mt-4 animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                        <div className="w-8 h-6 bg-gray-200 rounded"></div>
                        <div className="w-16 h-4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimeWeatherCard;
