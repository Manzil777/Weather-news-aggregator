import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [userId, setUserId] = useState(localStorage.getItem('news_app_userid'));
    const [preferences, setPreferences] = useState({ categories: [], sources: [], keywords: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let id = localStorage.getItem('news_app_userid');
        if (!id) {
            id = uuidv4();
            localStorage.setItem('news_app_userid', id);
        }
        setUserId(id);

        // In a real app, we would fetch existing prefs here if we had a way to retrieve them by ID
        // For now, we just initialize.
        setLoading(false);
    }, []);

    const updatePreferences = async (newPrefs) => {
        setPreferences(newPrefs);
        try {
            await axios.post('http://localhost:4000/api/news/user/preferences', {
                userId,
                preferences: newPrefs
            });
        } catch (error) {
            console.error('Error syncing preferences:', error);
        }
    };

    const trackAction = async (action) => {
        try {
            await axios.post('http://localhost:4000/api/news/user/track', {
                userId,
                action
            });
        } catch (error) {
            console.error('Error tracking action:', error);
        }
    };

    return (
        <SettingsContext.Provider value={{ userId, preferences, updatePreferences, trackAction, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};
