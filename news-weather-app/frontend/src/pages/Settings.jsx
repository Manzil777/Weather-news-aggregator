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
        <div className="container mx-auto p-4 md:p-8 max-w-3xl animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-8 font-display">Settings</h1>

            <div className="glass-panel p-8 rounded-3xl mb-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6 font-display">Preferences</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Default City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-yellow-500 outline-none placeholder-gray-500 transition-all"
                        placeholder="Enter your city"
                    />
                    <p className="text-sm text-gray-500 mt-2">This city will be used for the dashboard weather widget.</p>
                </div>

                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 font-medium transition-all backdrop-blur-md"
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-4 font-display">About</h2>
                <p className="text-gray-300 mb-2">News & Weather Aggregator v1.0.0</p>
                <p className="text-gray-400 text-sm">Built with MERN Stack (SQLite Edition) + Tailwind CSS.</p>
            </div>
        </div>
    );
};

export default Settings;
