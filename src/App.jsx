import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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
import Chatbot from './components/Chatbot';

function AnimatedRoutes() {
  const location = useLocation();

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
        <Route path="*" element={<GenericPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 selection:bg-sky-200 selection:text-sky-900 font-sans flex flex-col">
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
