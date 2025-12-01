import React from 'react';
import { useSaved } from '../context/SavedContext';
import { Trash2, ExternalLink, Calendar } from 'lucide-react';

const Saved = () => {
    const { savedArticles, loading, removeArticle } = useSaved();

    const handleDelete = (id) => {
        removeArticle(id);
    };

    return (
        <div className="space-y-6 container mx-auto p-4 md:p-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-primary-text">Saved Articles</h1>

            {loading ? (
                <div className="text-center py-10 text-secondary-text">Loading...</div>
            ) : savedArticles.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-soft-gray">
                    <p className="text-secondary-text text-lg">You haven't saved any articles yet.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {savedArticles.map((article) => (
                        <div key={article.id} className="bg-white p-4 rounded-xl border border-soft-gray flex gap-4 hover:border-yellow-accent/50 transition-colors shadow-sm">
                            {article.urlToImage && (
                                <img
                                    src={article.urlToImage}
                                    alt={article.title}
                                    className="w-24 h-24 object-cover rounded-lg hidden sm:block"
                                />
                            )}
                            <div className="flex-grow">
                                <h3 className="text-lg font-bold text-primary-text mb-2">{article.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-secondary-text mb-2">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(article.publishedAt).toLocaleDateString()}</span>
                                    <span className="bg-soft-gray px-2 py-0.5 rounded text-xs">{article.sourceName}</span>
                                </div>
                                <div className="flex gap-4 mt-2">
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-text hover:underline flex items-center gap-1 text-sm font-medium"
                                    >
                                        Read Full Article <ExternalLink size={14} />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(article.id)}
                                        className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium"
                                    >
                                        Remove <Trash2 size={14} />
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
