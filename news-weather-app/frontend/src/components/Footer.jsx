import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-soft-gray py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Column */}
                    <div>
                        <h3 className="text-xl font-bold text-primary-text mb-4">News & Weather</h3>
                        <p className="text-secondary-text text-sm leading-relaxed">
                            Your daily dose of global news and accurate weather forecasts, all in one beautiful interface.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-primary-text mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-secondary-text hover:text-yellow-accent transition-colors">Home</Link></li>
                            <li><Link to="/news" className="text-secondary-text hover:text-yellow-accent transition-colors">News</Link></li>
                            <li><Link to="/weather" className="text-secondary-text hover:text-yellow-accent transition-colors">Weather</Link></li>
                            <li><Link to="/saved" className="text-secondary-text hover:text-yellow-accent transition-colors">Saved</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-lg font-bold text-primary-text mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="https://github.com/Manzil777" className="text-secondary-text hover:text-yellow-accent transition-colors"><Github size={24} /></a>
                            <a href="https://x.com/manzilshrestha9" className="text-secondary-text hover:text-yellow-accent transition-colors"><Twitter size={24} /></a>
                            <a href="https://www.linkedin.com/in/manzil-shrestha-6b0607218" className="text-secondary-text hover:text-yellow-accent transition-colors"><Linkedin size={24} /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-soft-gray pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-secondary-text">
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
