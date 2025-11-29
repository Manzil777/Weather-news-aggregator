import React from 'react';

const NewsCard = ({ article, className = '' }) => {
    if (!article) return null;

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

    return (
        <div
            className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`}
            onClick={() => window.open(article.url, '_blank')}
        >
            <img
                src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop'}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                <h3 className="font-semibold text-base leading-tight line-clamp-2 mb-1">{article.title}</h3>
                <p className="text-xs text-gray-300">{timeAgo(article.publishedAt)}</p>
            </div>
        </div>
    );
};

export default NewsCard;
