import React from 'react';
import { ArrowUpRight, Clock, Sparkles, X, Bookmark, BookmarkCheck } from 'lucide-react';
import { useSaved } from '../context/SavedContext';

const NewsCard = ({ article, featured = false, className = '' }) => {
    const [summary, setSummary] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [showSummary, setShowSummary] = React.useState(false);
    const { isArticleSaved, saveArticle, removeArticle, getSavedArticleId } = useSaved();

    if (!article) return null;

    const formattedDate = new Date(article.publishedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
    });

    const isSaved = isArticleSaved(article.url);

    const handleSaveToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isSaved) {
            const id = getSavedArticleId(article.url);
            if (id) await removeArticle(id);
        } else {
            await saveArticle({
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: article.publishedAt,
                sourceName: article.source.name
            });
        }
    };

    const handleSummarize = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (summary) {
            setShowSummary(true);
            return;
        }

        setLoading(true);
        try {
            // Import dynamically to avoid circular dependencies or use the global api
            const { summarizeArticle } = await import('../api');
            const res = await summarizeArticle(article.title + "\n" + (article.description || ""));
            setSummary(res.data.summary);
            setShowSummary(true);
        } catch (error) {
            console.error("Failed to summarize", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`group relative block overflow-hidden rounded-3xl glass-card h-full min-h-[20rem] ${className}`}>
            <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0 block"
            >
                <img
                    src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80'}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity group-hover:opacity-80" />
            </a>

            <div className="relative z-10 flex h-full flex-col justify-end p-6 pointer-events-none">
                <div className="mb-auto flex items-center justify-between pointer-events-auto">
                    <button
                        onClick={handleSummarize}
                        className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-md hover:bg-white/30 transition-colors flex items-center gap-1.5"
                    >
                        {loading ? (
                            <div className="animate-spin h-3 w-3 border-2 border-white/50 border-t-white rounded-full" />
                        ) : (
                            <Sparkles size={12} className="text-yellow-300" />
                        )}
                        {loading ? 'Thinking...' : 'Summarize'}
                    </button>

                    <button
                        onClick={handleSaveToggle}
                        className={`rounded-full p-2 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 ${isSaved ? 'bg-yellow-500 text-black opacity-100' : 'bg-white/10 text-white opacity-0 hover:bg-white/20'}`}
                        title={isSaved ? "Remove from saved" : "Save article"}
                    >
                        {isSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    </button>
                </div>

                <div className="mt-4 space-y-2 pointer-events-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Clock size={12} />
                        <span>{formattedDate}</span>
                    </div>

                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block font-display font-bold leading-tight text-white hover:text-yellow-200 transition-colors ${featured ? 'text-2xl md:text-3xl' : 'text-lg'}`}
                    >
                        {article.title}
                    </a>

                    {featured && (
                        <p className="line-clamp-2 text-sm text-gray-300">
                            {article.description}
                        </p>
                    )}
                </div>
            </div>

            {/* AI Summary Overlay */}
            {showSummary && (
                <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl p-6 flex flex-col animate-fade-in">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-yellow-300">
                            <Sparkles size={18} />
                            <span className="font-bold font-display">AI Summary</span>
                        </div>
                        <button
                            onClick={() => setShowSummary(false)}
                            className="text-white/50 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto scrollbar-hide">
                        <div className="prose prose-invert prose-sm">
                            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                                {summary}
                            </p>
                        </div>
                    </div>

                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-center text-sm font-medium text-white transition-colors border border-white/5"
                    >
                        Read Full Article
                    </a>
                </div>
            )}
        </div>
    );
};

export default NewsCard;
