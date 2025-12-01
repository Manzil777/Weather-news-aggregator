
import React from 'react';

import { useSettings } from '../context/SettingsContext';
import { useSaved } from '../context/SavedContext';
import { Bookmark } from 'lucide-react';

const NewsCard = ({ article, className = '' }) => {
    const { trackAction } = useSettings();
    if (!article) return null;

    const handleClick = () => {
        trackAction({ type: 'click', source: article.source.name });
        window.open(article.url, '_blank');
    };

    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    };

    const [summary, setSummary] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [showSummary, setShowSummary] = React.useState(false);

    const handleSummarize = async (e) => {
        e.stopPropagation();
        if (summary) {
            setShowSummary(!showSummary);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/ai/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: article.description || article.content || article.title }),
            });
            const data = await response.json();
            setSummary(data.summary);
            setShowSummary(true);
        } catch (error) {
            console.error('Failed to summarize:', error);
        } finally {
            setLoading(false);
        }
    };

    const { isArticleSaved, saveArticle, removeArticle, getSavedArticleId } = useSaved();
    const isSaved = isArticleSaved(article.url);

    const handleBookmark = (e) => {
        e.stopPropagation();
        if (isSaved) {
            const id = getSavedArticleId(article.url);
            if (id) removeArticle(id);
        } else {
            saveArticle(article);
        }
    };

    return (
        <div
            className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`}
            onClick={handleClick}
        >
            <img
                src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Bookmark Button */}
            <button
                onClick={handleBookmark}
                className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full text-white transition-colors z-20"
            >
                <Bookmark size={18} className={isSaved ? "fill-yellow-400 text-yellow-400" : ""} />
            </button>

            {/* Summary Overlay */}
            {showSummary && (
                <div className="absolute inset-0 bg-black/90 p-4 text-white overflow-y-auto z-20" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-sm text-yellow-400">AI Summary</h4>
                        <button onClick={(e) => { e.stopPropagation(); setShowSummary(false); }} className="text-gray-400 hover:text-white">
                            ✕
                        </button>
                    </div>
                    <p className="text-xs leading-relaxed whitespace-pre-line">{summary}</p>
                </div>
            )}

            <div className="absolute bottom-0 left-0 p-4 text-white w-full z-10">
                <h3 className="font-semibold text-base leading-tight line-clamp-2 mb-1">{article.title}</h3>
                <div className="flex justify-between items-end">
                    <p className="text-xs text-gray-300">{timeAgo(article.publishedAt)}</p>
                    <button
                        onClick={handleSummarize}
                        disabled={loading}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                    >
                        {loading ? (
                            <span className="animate-spin">⟳</span>
                        ) : (
                            <span>✨ Summarize</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
