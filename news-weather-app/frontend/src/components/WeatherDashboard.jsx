import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Wind, Droplets, Sun, Cloud, Eye, Gauge } from 'lucide-react';
import WeatherChartModal from './WeatherChartModal';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-3 rounded-xl text-sm">
                <p className="font-bold text-white mb-1">{label}</p>
                <p className="text-accent-primary">
                    {payload[0].value}°C
                </p>
                <p className="text-white/60 text-xs capitalize">
                    {payload[0].payload.description}
                </p>
            </div>
        );
    }
    return null;
};

const WeatherDashboard = ({ current, forecast, pollution }) => {
    const [chartOpen, setChartOpen] = useState(false);
    const [chartType, setChartType] = useState('wind');

    if (!current || !forecast) return null;

    // Process forecast data for chart
    const chartData = forecast.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        wind: item.wind.speed,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        clouds: item.clouds.all,
        visibility: parseFloat((item.visibility / 1000).toFixed(1)),
        description: item.weather[0].description
    }));

    const handleStatClick = (type) => {
        if (type === 'uv') return; // UV forecast not available in standard API
        setChartType(type);
        setChartOpen(true);
    };

    const StatCard = ({ icon: Icon, label, value, unit, color = "text-white", type }) => (
        <div
            onClick={() => handleStatClick(type || label.toLowerCase())}
            className={`glass-panel p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/10 transition-all cursor-pointer group hover:scale-[1.02] active:scale-95 ${type === 'uv' ? 'cursor-default hover:scale-100 active:scale-100' : ''}`}
        >
            <div className={`p-3 rounded-full bg-white/5 mb-3 group-hover:scale-110 transition-transform duration-300 ${color}`}>
                <Icon size={24} />
            </div>
            <span className="text-white/60 text-sm font-medium mb-1">{label}</span>
            <span className="text-2xl font-bold text-white">
                {value}<span className="text-sm font-normal text-white/40 ml-1">{unit}</span>
            </span>
        </div>
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Chart Modal */}
            <WeatherChartModal
                isOpen={chartOpen}
                onClose={() => setChartOpen(false)}
                city={current.name}
                type={chartType}
                data={chartData}
            />

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard icon={Wind} label="Wind Speed" value={current.wind.speed} unit="m/s" color="text-blue-400" type="wind" />
                <StatCard icon={Droplets} label="Humidity" value={current.main.humidity} unit="%" color="text-cyan-400" type="humidity" />
                <StatCard icon={Sun} label="UV Index" value={current.uvi || "N/A"} unit="" color="text-yellow-400" type="uv" />
                <StatCard icon={Eye} label="Visibility" value={(current.visibility / 1000).toFixed(1)} unit="km" color="text-purple-400" type="visibility" />
                <StatCard icon={Gauge} label="Pressure" value={current.main.pressure} unit="hPa" color="text-red-400" type="pressure" />
                <StatCard icon={Cloud} label="Cloudiness" value={current.clouds.all} unit="%" color="text-gray-400" type="clouds" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Temperature Chart */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-3xl">
                    <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                        <Sun size={20} className="text-yellow-400" />
                        Temperature Forecast
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    stroke="rgba(255,255,255,0.4)"
                                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.4)"
                                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 }} />
                                <Area
                                    type="monotone"
                                    dataKey="temp"
                                    stroke="#38bdf8"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorTemp)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pollution / Air Quality */}
                <div className="glass-panel p-6 rounded-3xl flex flex-col">
                    <h3 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
                        <Wind size={20} className="text-green-400" />
                        Air Quality
                    </h3>

                    {pollution ? (
                        <div className="flex-grow flex flex-col justify-center items-center relative">
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="12"
                                        fill="none"
                                    />
                                    <circle
                                        cx="96"
                                        cy="96"
                                        r="88"
                                        stroke={
                                            pollution.list[0].main.aqi === 1 ? '#4ade80' :
                                                pollution.list[0].main.aqi === 2 ? '#facc15' :
                                                    pollution.list[0].main.aqi === 3 ? '#fb923c' :
                                                        pollution.list[0].main.aqi === 4 ? '#f87171' : '#ef4444'
                                        }
                                        strokeWidth="12"
                                        strokeDasharray={2 * Math.PI * 88}
                                        strokeDashoffset={2 * Math.PI * 88 * (1 - pollution.list[0].main.aqi / 5)}
                                        strokeLinecap="round"
                                        fill="none"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl font-bold text-white">{pollution.list[0].main.aqi}</span>
                                    <span className="text-sm text-white/60 uppercase tracking-wider mt-1">Index</span>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-4 w-full">
                                <div className="text-center">
                                    <div className="text-xs text-white/40 mb-1">PM2.5</div>
                                    <div className="font-bold text-white">{pollution.list[0].components.pm2_5}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-white/40 mb-1">PM10</div>
                                    <div className="font-bold text-white">{pollution.list[0].components.pm10}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs text-white/40 mb-1">NO2</div>
                                    <div className="font-bold text-white">{pollution.list[0].components.no2}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex items-center justify-center text-white/40">
                            No air quality data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherDashboard;
