import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Wind, Droplets, Eye, Gauge, Sunrise, Sunset, Cloud } from 'lucide-react';

const WeatherDashboard = ({ current, forecast, pollution }) => {
    if (!current || !forecast) return null;

    // Process forecast data for the chart (next 24 hours = 8 items)
    const chartData = forecast.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(item.main.temp),
        desc: item.weather[0].description
    }));

    const metrics = [
        { label: 'Humidity', value: `${current.main.humidity}%`, icon: Droplets },
        { label: 'Wind Speed', value: `${current.wind.speed} m/s`, icon: Wind },
        { label: 'Pressure', value: `${current.main.pressure} hPa`, icon: Gauge },
        { label: 'Visibility', value: `${(current.visibility / 1000).toFixed(1)} km`, icon: Eye },
        { label: 'Sunrise', value: new Date(current.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), icon: Sunrise },
        { label: 'Sunset', value: new Date(current.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), icon: Sunset },
    ];

    return (
        <div className="space-y-8">
            {/* Main Current Weather Card */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{current.name}, {current.sys.country}</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 capitalize font-medium flex items-center justify-center md:justify-start gap-2">
                            <img
                                src={`https://openweathermap.org/img/wn/${current.weather[0].icon}.png`}
                                alt={current.weather[0].description}
                                className="w-8 h-8"
                            />
                            {current.weather[0].description}
                        </p>
                        <div className="mt-6 text-7xl font-bold text-gray-900 dark:text-white tracking-tighter">
                            {Math.round(current.main.temp)}°
                        </div>
                    </div>

                    {/* Detailed Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
                        {metrics.map((metric, idx) => (
                            <div key={idx} className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[100px] hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                                <metric.icon className="text-yellow-accent mb-2" size={24} />
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{metric.label}</span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Temperature Trend Chart */}
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">24-Hour Temperature Trend</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F4C430" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#F4C430" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                unit="°"
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #F2F3F5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#111' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="temp"
                                stroke="#F4C430"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorTemp)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Additional Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Air Quality Card */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm transition-colors duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Air Quality Index (AQI)</h3>
                    {pollution ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                                        {6 - pollution.list[0].main.aqi}
                                        <span className="text-lg text-gray-500 dark:text-gray-400 font-medium ml-2">/ 5</span>
                                    </div>
                                    <p className={`text-lg font-medium ${pollution.list[0].main.aqi === 1 ? 'text-green-500' :
                                        pollution.list[0].main.aqi === 2 ? 'text-green-400' :
                                            pollution.list[0].main.aqi === 3 ? 'text-yellow-500' :
                                                pollution.list[0].main.aqi === 4 ? 'text-orange-500' : 'text-red-500'
                                        }`}>
                                        {pollution.list[0].main.aqi === 1 ? 'Excellent' :
                                            pollution.list[0].main.aqi === 2 ? 'Good' :
                                                pollution.list[0].main.aqi === 3 ? 'Moderate' :
                                                    pollution.list[0].main.aqi === 4 ? 'Poor' : 'Very Poor'}
                                    </p>
                                </div>
                                <div className={`p-4 rounded-full ${pollution.list[0].main.aqi === 1 ? 'bg-green-100 text-green-600' :
                                    pollution.list[0].main.aqi === 2 ? 'bg-green-50 text-green-500' :
                                        pollution.list[0].main.aqi === 3 ? 'bg-yellow-100 text-yellow-600' :
                                            pollution.list[0].main.aqi === 4 ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                    <Cloud size={32} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-slate-700/30 p-3 rounded-xl">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">PM2.5</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{pollution.list[0].components.pm2_5}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-700/30 p-3 rounded-xl">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">PM10</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{pollution.list[0].components.pm10}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-700/30 p-3 rounded-xl">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">NO₂</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{pollution.list[0].components.no2}</p>
                                </div>
                                <div className="bg-gray-50 dark:bg-slate-700/30 p-3 rounded-xl">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">SO₂</p>
                                    <p className="font-semibold text-gray-900 dark:text-white">{pollution.list[0].components.so2}</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    {pollution.list[0].main.aqi <= 2
                                        ? "Air quality is great! Enjoy your outdoor activities."
                                        : pollution.list[0].main.aqi === 3
                                            ? "Air quality is acceptable. Sensitive individuals should monitor their health."
                                            : "Health alert: The risk of health effects is increased for everyone."}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">Loading AQI data...</p>
                        </div>
                    )}
                </div>

                {/* Wind Speed Chart */}
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 shadow-sm transition-colors duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Wind Speed Trend</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={forecast.list.slice(0, 8).map(item => ({
                                time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                speed: item.wind.speed
                            }))}>
                                <defs>
                                    <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E5" />
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    unit="m/s"
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #F2F3F5' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="speed"
                                    stroke="#14B8A6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorWind)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDashboard;
