import React, { useEffect, useState } from 'react';
import { fetchNews } from '../api';
import NewsList from '../components/NewsList';
import { useToast } from '../context/ToastContext';
import { Search, Loader } from 'lucide-react';

const categories = ['general', 'business', 'technology', 'entertainment', 'health', 'science', 'sports'];

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('general');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToast } = useToast();

    const loadNews = async () => {
        setLoading(true);
        try {
            const response = await fetchNews(category, searchQuery);
            setArticles(response.data.articles);
        } catch (error) {
            addToast('Failed to fetch news', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNews();
    }, [category]);

    const handleSearch = (e) => {
        e.preventDefault();
        loadNews();
    };

    return (
        <div className="space-y-6 container mx-auto p-4 md:p-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-display font-bold text-white">News Feed</h1>

                <form onSubmit={handleSearch} className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 focus:bg-white/10 shadow-sm transition-all backdrop-blur-md"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </form>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all whitespace-nowrap ${category === cat
                            ? 'bg-white text-black font-bold'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader className="animate-spin text-primary" size={32} />
                </div>
            ) : (
                <NewsList articles={articles} />
            )}
        </div>
    );
};

export default News;
