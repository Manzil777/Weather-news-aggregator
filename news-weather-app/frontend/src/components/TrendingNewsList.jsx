import React, { useEffect, useState } from 'react';
import { fetchNews } from '../api';
import NewsCard from './NewsCard';
import { Loader } from 'lucide-react';

const TrendingNewsList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTrending = async () => {
            try {
                // Fetch top headlines for trending section
                // Using 'general' category or just default top headlines
                const response = await fetchNews();
                // We want 8-12 articles. Let's take 8.
                // Filter out articles without images for better UI
                const validArticles = response.data.articles
                    .filter(a => a.urlToImage)
                    .slice(0, 8);
                setArticles(validArticles);
            } catch (err) {
                console.error("Failed to fetch trending news:", err);
                setError("Failed to load trending news.");
            } finally {
                setLoading(false);
            }
        };

        loadTrending();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 py-8">{error}</div>;
    }

    return (
        <div className="bg-black rounded-t-3xl p-6 md:p-8 text-white mt-8 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold"># Trending Now</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {articles.map((article, index) => (
                    <div key={index} className="aspect-square">
                        <NewsCard article={article} className="h-full w-full" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingNewsList;
