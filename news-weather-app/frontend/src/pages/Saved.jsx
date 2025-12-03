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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Articles</h1>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : savedArticles.length === 0 ? (
                <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                    <div className="inline-flex p-4 rounded-full bg-gray-50 dark:bg-slate-700/50 mb-4">
                        <Calendar className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No saved articles yet</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Articles you bookmark will appear here</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {savedArticles.map((article) => (
                        <div key={article.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 flex flex-col sm:flex-row gap-6 group">
                            {article.urlToImage && (
                                <div className="shrink-0 overflow-hidden rounded-xl">
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full sm:w-48 h-48 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col flex-grow justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="px-3 py-1 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs font-semibold tracking-wide uppercase">
                                            {article.sourceName}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400 dark:text-gray-500">
                                            <Calendar size={12} />
                                            {new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight transition-colors">
                                        {article.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                                    >
                                        Read Article <ExternalLink size={14} />
                                    </a>

                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-red-500 transition-colors ml-auto sm:ml-0"
                                    >
                                        <Trash2 size={14} />
                                        <span className="hidden sm:inline">Remove</span>
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
