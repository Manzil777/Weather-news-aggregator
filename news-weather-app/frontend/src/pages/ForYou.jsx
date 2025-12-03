import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext';
import NewsCard from '../components/NewsCard';
import { Loader, Settings } from 'lucide-react';

const ForYou = () => {
    const { userId, preferences, updatePreferences } = useSettings();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSettings, setShowSettings] = useState(false);

    // Local state for settings form
    const [selectedCategories, setSelectedCategories] = useState(preferences.categories || []);
    const [keywordsInput, setKeywordsInput] = useState((preferences.keywords || []).join(', '));

    const categoriesList = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const getDate = () => {
        return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    const fetchFeed = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('http://localhost:4000/api/news/feed', {
                params: { userId }
            });
            setArticles(res.data.articles);
        } catch (error) {
            console.error('Error fetching feed:', error);
            setError('Failed to load feed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchFeed();
        }
    }, [userId, preferences]); // Refetch when preferences change

    const handleSaveSettings = () => {
        const keywords = keywordsInput.split(',').map(k => k.trim()).filter(k => k);
        updatePreferences({
            ...preferences,
            categories: selectedCategories,
            keywords
        });
        setShowSettings(false);
    };

    const toggleCategory = (cat) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(selectedCategories.filter(c => c !== cat));
        } else {
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 uppercase tracking-wider mb-1">{getDate()}</p>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {getGreeting()}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">Here's what we found for you today</p>
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-700 rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                    <Settings size={18} />
                    Customize
                </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8 border border-gray-100 dark:border-slate-700">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Customize Your Feed</h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favorite Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {categoriesList.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-3 py-1 rounded-full text-sm capitalize transition-colors ${selectedCategories.includes(cat)
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keywords (comma separated)</label>
                        <input
                            type="text"
                            value={keywordsInput}
                            onChange={(e) => setKeywordsInput(e.target.value)}
                            placeholder="e.g. AI, Space, Crypto"
                            className="w-full p-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-yellow-500 outline-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowSettings(false)}
                            className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveSettings}
                            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium"
                        >
                            Save Preferences
                        </button>
                    </div>
                </div>
            )}

            {/* Feed Content */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader className="animate-spin text-yellow-500" size={40} />
                </div>
            ) : articles.length > 0 ? (
                <div className="space-y-8">
                    {/* Featured Article */}
                    {articles[0] && (
                        <div className="relative rounded-2xl overflow-hidden group cursor-pointer h-[400px] md:h-[500px]" onClick={() => window.open(articles[0].url, '_blank')}>
                            <img
                                src={articles[0].urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'}
                                alt={articles[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white max-w-4xl">
                                <span className="inline-block px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full mb-4 uppercase tracking-wide">
                                    Top Story
                                </span>
                                <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight group-hover:text-yellow-400 transition-colors">
                                    {articles[0].title}
                                </h2>
                                <p className="text-gray-300 line-clamp-2 md:line-clamp-3 text-sm md:text-lg mb-4 max-w-2xl">
                                    {articles[0].description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span>{articles[0].source.name}</span>
                                    <span>•</span>
                                    <span>{new Date(articles[0].publishedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Remaining Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.slice(1).map((article, index) => (
                            <NewsCard key={index} article={article} />
                        ))}
                    </div>
                </div>
            ) : error ? (
                <div className="text-center py-20 text-red-500">
                    <p>{error}</p>
                    <button onClick={fetchFeed} className="text-blue-500 hover:underline mt-2">
                        Retry
                    </button>
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    <p>No articles found matching your preferences.</p>
                    <button onClick={() => setShowSettings(true)} className="text-yellow-500 hover:underline mt-2">
                        Adjust settings
                    </button>
                </div>
            )}
        </div>
    );
};

export default ForYou;
