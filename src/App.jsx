import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfiniteLogoScroll from './components/InfiniteLogoScroll';
import Features from './components/Features';
import NewsAndEvents from './components/NewsAndEvents';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import GenericPage from './pages/GenericPage';
import NewsPage from './pages/NewsPage';
import MembersPage from './pages/MembersPage';
import AdminPage from './pages/AdminPage';
import PublicationsPage from './pages/PublicationsPage';
import ProclamationsPage from './pages/ProclamationsPage';
import GalleryPage from './pages/GalleryPage';
import Chatbot from './components/Chatbot';
import Loader from './components/Loader';

function AnimatedRoutes() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <main>
            <Hero />
            <InfiniteLogoScroll />
            <Features />
            <NewsAndEvents />
            <ContactSection />
          </main>
        } />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/proclamations" element={<ProclamationsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<GenericPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 selection:bg-sky-200 selection:text-sky-900 font-sans flex flex-col">
        <Navbar />
        <div className="flex-1">
          <AnimatedRoutes />
        </div>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  );
}

export default App;
