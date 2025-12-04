import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, Wind, Droplets, Sun, Cloud, Eye, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomTooltip = ({ active, payload, label, unit }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-panel p-3 rounded-xl text-sm border border-white/10 bg-black/60 backdrop-blur-md">
                <p className="font-bold text-white mb-1">{label}</p>
                <p className="text-accent-primary font-medium">
                    {payload[0].value} <span className="text-xs text-white/60">{unit}</span>
                </p>
                <p className="text-white/60 text-xs capitalize">
                    {payload[0].payload.description}
                </p>
            </div>
        );
    }
    return null;
};

const WeatherChartModal = ({ isOpen, onClose, city, type, data }) => {
    if (!isOpen) return null;

    // Configuration for different chart types
    const config = {
        wind: {
            label: 'Wind Speed',
            dataKey: 'wind',
            unit: 'm/s',
            icon: Wind,
            color: '#60a5fa', // blue-400
            gradientId: 'colorWind'
        },
        humidity: {
            label: 'Humidity',
            dataKey: 'humidity',
            unit: '%',
            icon: Droplets,
            color: '#22d3ee', // cyan-400
            gradientId: 'colorHumidity'
        },
        uv: {
            label: 'UV Index',
            dataKey: 'uv',
            unit: '',
            icon: Sun,
            color: '#facc15', // yellow-400
            gradientId: 'colorUV'
        },
        visibility: {
            label: 'Visibility',
            dataKey: 'visibility',
            unit: 'km',
            icon: Eye,
            color: '#c084fc', // purple-400
            gradientId: 'colorVisibility'
        },
        pressure: {
            label: 'Pressure',
            dataKey: 'pressure',
            unit: 'hPa',
            icon: Gauge,
            color: '#f87171', // red-400
            gradientId: 'colorPressure'
        },
        clouds: {
            label: 'Cloudiness',
            dataKey: 'clouds',
            unit: '%',
            icon: Cloud,
            color: '#9ca3af', // gray-400
            gradientId: 'colorClouds'
        }
    };

    const currentConfig = config[type] || config.wind;
    const Icon = currentConfig.icon;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full max-w-4xl bg-[#0f172a]/90 glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-6 md:p-8"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/5"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-4 mb-8">
                            <div className={`p-3 rounded-full bg-white/5 ${currentConfig.color.replace('#', 'text-[#')}`} style={{ color: currentConfig.color }}>
                                <Icon size={28} />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-2xl text-white">{currentConfig.label} Forecast</h3>
                                <p className="text-gray-400">{city}</p>
                            </div>
                        </div>

                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id={currentConfig.gradientId} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis
                                        dataKey="time"
                                        stroke="rgba(255,255,255,0.3)"
                                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="rgba(255,255,255,0.3)"
                                        tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }}
                                        tickLine={false}
                                        axisLine={false}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        content={<CustomTooltip unit={currentConfig.unit} />}
                                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey={currentConfig.dataKey}
                                        stroke={currentConfig.color}
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill={`url(#${currentConfig.gradientId})`}
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default WeatherChartModal;
