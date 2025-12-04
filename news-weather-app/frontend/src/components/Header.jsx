import { Link, useLocation } from 'react-router-dom';
import { Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Dashboard' },
        { path: '/foryou', label: 'For You' },
        { path: '/news', label: 'News' },
        { path: '/weather', label: 'Weather' },
        { path: '/saved', label: 'Saved' },
    ];

    return (
        <header className="sticky top-0 z-50 px-4 py-4">
            <nav className="rounded-2xl px-6 py-3 flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-3 group">
                    <img
                        src={logo}
                        alt="NW Aggregator"
                        className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="font-display font-bold text-xl tracking-tight hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        News & Weather
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative px-4 py-2 rounded-full text-sm font-display transition-all duration-300 ${isActive(link.path)
                                ? 'text-white font-medium'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {isActive(link.path) && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-md border border-white/10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{link.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <Link
                        to="/settings"
                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <Settings size={20} />
                    </Link>
                    <button
                        className="lg:hidden p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-4 right-4 mt-2 glass-panel rounded-2xl p-4 lg:hidden flex flex-col space-y-2"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive(link.path)
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
