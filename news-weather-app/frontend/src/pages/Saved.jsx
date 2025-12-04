import React from 'react';
import { useSaved } from '../context/SavedContext';
import { Trash2, ExternalLink, Calendar } from 'lucide-react';

const Saved = () => {
    const { savedArticles, loading, removeArticle } = useSaved();

    const handleDelete = (id) => {
        removeArticle(id);
    };

    return (
        <div className="space-y-8 container mx-auto p-4 md:p-8 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
                <h1 className="text-4xl font-bold text-white font-display">Saved Articles</h1>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : savedArticles.length === 0 ? (
                <div className="text-center py-20">
                    <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bookmark size={32} className="text-white/40" />
                    </div>
                    <p className="text-gray-400 text-lg">No saved articles yet.</p>
                    <p className="text-gray-500 text-sm mt-2">Articles you bookmark will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {savedArticles.map((article) => (
                        <div key={article.id} className="glass-panel p-6 rounded-3xl flex flex-col md:flex-row gap-6 group hover:bg-white/10 transition-all border border-white/10">
                            <div className="w-full md:w-64 h-48 md:h-auto flex-shrink-0 rounded-2xl overflow-hidden relative">
                                <img
                                    src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="flex-grow flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-200 text-xs font-bold rounded-full border border-yellow-500/30 uppercase tracking-wider">
                                        {article.sourceName}
                                    </span>
                                    <span className="text-gray-400 text-sm flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(article.publishedAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-yellow-400 transition-colors font-display">
                                    {article.title}
                                </h2>

                                <div className="flex items-center gap-6 mt-4">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white font-medium hover:text-yellow-400 transition-colors group/link"
                                    >
                                        Read Article
                                        <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </a>

                                    <button
                                        onClick={() => removeArticle(article.id)}
                                        className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm"
                                    >
                                        <Trash2 size={16} />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Saved;
