import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-dark-bg text-dark-text font-sans relative">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-6">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
