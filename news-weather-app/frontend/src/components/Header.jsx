import { Link, useLocation } from 'react-router-dom';
import { Settings, Menu } from 'lucide-react';

import logo from '../assets/logo.png';

const Header = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'text-primary font-semibold' : 'text-gray-600 dark:text-gray-400 hover:text-primary font-medium';

    return (
        <header className="py-3 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 transition-colors duration-300">
            <nav className="flex justify-between items-center">
                <Link to="/" className="flex flex-col">
                    <img src={logo} alt="NW Aggregator" className="h-20 w-auto object-contain" />
                </Link>

                <div className="hidden lg:flex items-center space-x-8 font-display">
                    <Link to="/" className={`text-lg transition-colors ${isActive('/')}`}>
                        Dashboard
                    </Link>
                    <Link to="/foryou" className={`text-lg transition-colors ${isActive('/foryou')}`}>
                        For You
                    </Link>
                    <Link to="/news" className={`text-lg transition-colors ${isActive('/news')}`}>
                        News
                    </Link>
                    <Link to="/weather" className={`text-lg transition-colors ${isActive('/weather')}`}>
                        Weather
                    </Link>
                    <Link to="/saved" className={`text-lg transition-colors ${isActive('/saved')}`}>
                        Saved
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/settings" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors">
                        <Settings size={24} />
                    </Link>
                    <button className="lg:hidden text-gray-900 dark:text-white">
                        <Menu size={24} />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
