import React, { useEffect, useState } from 'react';
import { fetchNews, fetchWeather } from '../api';
import TimeWeatherCard from '../components/TimeWeatherCard';
import NewsCard from '../components/NewsCard';
import TrendingNewsList from '../components/TrendingNewsList';
import { useToast } from '../context/ToastContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
    const [topNews, setTopNews] = useState([]);
    const [weather, setWeather] = useState(null);
    const { addToast } = useToast();
    const scrollRef = React.useRef(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const defaultCity = localStorage.getItem('defaultCity') || 'Bangalore';

                // Fetch weather
                const weatherRes = await fetchWeather(defaultCity);
                setWeather(weatherRes.data);

                // Fetch top news for carousel
                const newsRes = await fetchNews('general');
                setTopNews(newsRes.data.articles.filter(a => a.urlToImage).slice(0, 8));

            } catch (error) {
                console.error(error);
                addToast('Failed to load dashboard data', 'error');
            }
        };

        loadData();
    }, [addToast]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <main className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl shadow-slate-200 dark:shadow-none overflow-hidden min-h-[80vh] flex flex-col transition-colors duration-300">
                <div className="p-6 md:p-8 flex-grow">
                    <div className="flex flex-col lg:flex-row gap-8 h-full">
                        {/* Left Column: Time & Weather */}
                        <div className="lg:w-1/3">
                            <TimeWeatherCard weather={weather} />
                        </div>

                        {/* Right Column: News Carousel */}
                        <div className="lg:w-2/3 relative flex flex-col justify-center group">
                            <div
                                ref={scrollRef}
                                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-4 pb-4 h-80 items-center"
                            >
                                {topNews.map((article, index) => (
                                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 snap-center h-full">
                                        <NewsCard article={article} className="h-full" />
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons (Visual) */}
                            {topNews.length > 0 && (
                                <>
                                    <button
                                        onClick={scrollLeft}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-900 dark:text-white hover:bg-white dark:hover:bg-slate-600 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={scrollRight}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-900 dark:text-white hover:bg-white dark:hover:bg-slate-600 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Trending */}
                <TrendingNewsList />
            </main>
        </div>
    );
};

export default Home;
