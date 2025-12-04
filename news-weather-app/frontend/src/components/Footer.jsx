import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-white/10 bg-black/20 backdrop-blur-lg py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Column */}
                    <div>
                        <h3 className="text-xl font-display font-bold text-white mb-4">News & Weather</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your daily dose of global news and accurate weather forecasts, all in one beautiful interface.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-display font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">News</Link></li>
                            <li><Link to="/weather" className="text-gray-400 hover:text-white transition-colors">Weather</Link></li>
                            <li><Link to="/saved" className="text-gray-400 hover:text-white transition-colors">Saved</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-lg font-display font-bold text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="https://github.com/Manzil777" className="text-gray-400 hover:text-white transition-colors"><Github size={24} /></a>
                            <a href="https://x.com/manzilshrestha9" className="text-gray-400 hover:text-white transition-colors"><Twitter size={24} /></a>
                            <a href="https://www.linkedin.com/in/manzil-shrestha-6b0607218" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} News & Weather Aggregator. All rights reserved.</p>
                    <p className="flex items-center mt-4 md:mt-0">
                        Made with <Heart size={16} className="text-red-500 mx-1 fill-current" /> by Manzil
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
