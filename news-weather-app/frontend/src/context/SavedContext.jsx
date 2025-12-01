import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchSavedArticles, saveArticle as apiSaveArticle, deleteArticle as apiDeleteArticle } from '../api';
import { useToast } from './ToastContext';

const SavedContext = createContext();

export const useSaved = () => useContext(SavedContext);

export const SavedProvider = ({ children }) => {
    const [savedArticles, setSavedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        loadSaved();
    }, []);

    const loadSaved = async () => {
        try {
            const response = await fetchSavedArticles();
            setSavedArticles(response.data);
        } catch (error) {
            console.error('Failed to load saved articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveArticle = async (article) => {
        try {
            const response = await apiSaveArticle(article);
            setSavedArticles((prev) => [response.data, ...prev]);
            addToast('Article saved', 'success');
        } catch (error) {
            console.error('Error saving article:', error);
            addToast('Failed to save article', 'error');
        }
    };

    const removeArticle = async (id) => {
        try {
            await apiDeleteArticle(id);
            setSavedArticles((prev) => prev.filter((a) => a.id !== id));
            addToast('Article removed', 'success');
        } catch (error) {
            console.error('Error removing article:', error);
            addToast('Failed to remove article', 'error');
        }
    };

    const isArticleSaved = (url) => {
        return savedArticles.some((a) => a.url === url);
    };

    const getSavedArticleId = (url) => {
        const article = savedArticles.find((a) => a.url === url);
        return article ? article.id : null;
    };

    return (
        <SavedContext.Provider value={{ savedArticles, loading, saveArticle, removeArticle, isArticleSaved, getSavedArticleId }}>
            {children}
        </SavedContext.Provider>
    );
};
