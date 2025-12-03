import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { Save } from 'lucide-react';

const Settings = () => {
    const [city, setCity] = useState('');
    const { addToast } = useToast();


    useEffect(() => {
        const savedCity = localStorage.getItem('defaultCity') || 'Bangalore';
        setCity(savedCity);
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        if (city.trim()) {
            localStorage.setItem('defaultCity', city);
            addToast('Settings saved successfully', 'success');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>


            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Preferences</h2>

                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2">Default City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-white/10 rounded-lg py-2 px-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="e.g. London"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">This city will be used for the dashboard weather widget.</p>
                    </div>

                    <button
                        type="submit"
                        className="bg-yellow-accent hover:bg-yellow-500 text-black px-6 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium"
                    >
                        <Save size={18} /> Save Changes
                    </button>
                </form>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    News & Weather Aggregator v1.0.0
                    <br />
                    Built with MERN Stack (SQLite Edition) + Tailwind CSS.
                </p>
            </div>
        </div>
    );
};

export default Settings;
