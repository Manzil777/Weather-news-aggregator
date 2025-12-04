import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden text-white font-sans selection:bg-accent-primary selection:text-white">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 z-[-1]">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
