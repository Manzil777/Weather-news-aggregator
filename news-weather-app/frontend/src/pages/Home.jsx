import React, { useEffect, useState } from 'react';
import { fetchNews, fetchWeather } from '../api';
import TimeWeatherCard from '../components/TimeWeatherCard';
import NewsCard from '../components/NewsCard';
import TrendingNewsList from '../components/TrendingNewsList';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

const Home = () => {
    const [topNews, setTopNews] = useState([]);
    const [weather, setWeather] = useState(null);
    const { addToast } = useToast();

    useEffect(() => {
        const loadData = async () => {
            try {
                const defaultCity = localStorage.getItem('defaultCity') || 'Bangalore';

                // Fetch weather
                const weatherRes = await fetchWeather(defaultCity);
                setWeather(weatherRes.data);

                // Fetch top news
                const newsRes = await fetchNews('general');
                setTopNews(newsRes.data.articles.filter(a => a.urlToImage).slice(0, 6));

            } catch (error) {
                console.error(error);
                addToast('Failed to load dashboard data', 'error');
            }
        };

        loadData();
    }, [addToast]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto space-y-8"
        >
            {/* Hero Section: Weather & Featured News */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Weather Card - Spans 4 columns */}
                <motion.div variants={item} className="lg:col-span-4 h-full">
                    <TimeWeatherCard weather={weather} />
                </motion.div>

                {/* Featured News Grid - Spans 8 columns */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {topNews.slice(0, 2).map((article, index) => (
                        <motion.div key={index} className="h-full">
                            <NewsCard article={article} featured={true} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Secondary News Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div variants={item} className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-display font-bold text-white/90 px-2">Latest Updates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {topNews.slice(2, 6).map((article, index) => (
                            <motion.div key={index}>
                                <NewsCard article={article} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={item} className="lg:col-span-1">
                    <TrendingNewsList />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Home;
