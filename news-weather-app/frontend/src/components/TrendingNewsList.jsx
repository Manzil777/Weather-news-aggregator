import React, { useEffect, useState } from 'react';
import { fetchNews } from '../api';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendingNewsList = () => {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const loadTrending = async () => {
            try {
                const res = await fetchNews('technology'); // Using tech news as trending for now
                setTrending(res.data.articles.slice(0, 5));
            } catch (error) {
                console.error('Error loading trending news:', error);
            }
        };
        loadTrending();
    }, []);

    return (
        <div className="glass-panel rounded-3xl p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-accent-secondary/20 rounded-full text-accent-secondary">
                        <TrendingUp size={20} />
                    </div>
                    <h2 className="text-xl font-display font-bold text-white">Trending</h2>
                </div>
                <Link to="/news" className="text-sm text-accent-primary hover:text-white transition-colors">
                    View All
                </Link>
            </div>

            <div className="flex-grow flex flex-col justify-between gap-2">
                {trending.map((article, index) => (
                    <a
                        key={index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                        <span className="flex-shrink-0 w-6 text-center font-display font-bold text-lg text-white/40 group-hover:text-accent-primary transition-colors mt-0.5">
                            {index + 1}
                        </span>
                        <div className="flex-grow min-w-0">
                            <h4 className="text-base font-semibold text-white/90 group-hover:text-white line-clamp-2 leading-snug mb-1">
                                {article.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-white/50">
                                <span>{article.source.name}</span>
                                <span>•</span>
                                <span>{new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 mt-1">
                            <ArrowRight size={16} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TrendingNewsList;
