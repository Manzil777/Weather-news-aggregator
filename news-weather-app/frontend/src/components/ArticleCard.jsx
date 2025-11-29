import { useState } from 'react';
import { Bookmark, ExternalLink } from 'lucide-react';
import { saveArticle } from '../api';
import { useToast } from '../context/ToastContext';

const ArticleCard = ({ article, onSave }) => {
    const { addToast } = useToast();
    const [isSaved, setIsSaved] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSave = async (e) => {
        e.stopPropagation();
        setIsAnimating(true);
        try {
            await saveArticle(article);
            setIsSaved(true);
            if (onSave) onSave();
            addToast('Article saved successfully!', 'success');
        } catch (error) {
            addToast('Error saving article: ' + (error.response?.data?.message || error.message), 'error');
        } finally {
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    return (
        <div
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col h-full cursor-pointer group"
            onClick={() => window.open(article.url, '_blank')}
        >
            {article.urlToImage && (
                <div className="relative overflow-hidden h-48">
                    <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{article.description}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">{new Date(article.publishedAt).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className={`p-2 rounded-full transition-all duration-300 ${isSaved ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300'
                                } ${isAnimating ? 'scale-125' : 'scale-100'}`}
                            title="Save article"
                        >
                            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
