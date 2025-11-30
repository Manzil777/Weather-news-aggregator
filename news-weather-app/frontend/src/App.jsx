import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import News from './pages/News';
import Weather from './pages/Weather';
import Saved from './pages/Saved';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </Router>
  );
}

export default App;
