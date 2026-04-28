import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  {
    name: "About AEI",
    path: "/about",
    dropdown: [
      { name: "About Us", path: "/about" },
      { name: "Members", path: "/members" },
      { name: "Board of Directors", path: "/board-of-directors" },
    ],
  },
  {
    name: "News & Events",
    path: "/news",
    dropdown: [
      { name: "News", path: "/news" },
      { name: "Announcements", path: "/announcements" },
    ],
  },
  {
    name: "Data & Resources",
    path: "/resources",
    dropdown: [
      { name: "Proclamations & Directives", path: "/proclamations" },
      { name: "Publications", path: "/publications" },
      { name: "Industry Data", path: "/industry-data" },
      { name: "Insurance Glossary", path: "/glossary" },
      { name: "Articles", path: "/articles" },
      { name: "FAQ", path: "/faq" },
    ],
  },
  { name: "Gallery", path: "/gallery", dropdown: [] },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (name) => {
    if (mobileDropdown === name) {
      setMobileDropdown(null);
    } else {
      setMobileDropdown(name);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-md py-2"
          : "bg-white/80 backdrop-blur-md border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between xl:gap-8">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <img 
            src={logo} 
            alt="Association of Ethiopian Insurers Logo" 
            className="h-12 md:h-16 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center justify-center flex-1 space-x-1 lg:space-x-3">
          {NAV_ITEMS.map((item, i) => {
            const isActive = location.pathname.startsWith(item.path);
            const isHovered = activeDropdown === item.name;
            
            return (
              <div
                key={i}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 flex items-center gap-1.5 transition-colors duration-200 text-[15px] font-semibold tracking-tight ${
                    isActive || isHovered
                      ? "text-sky-600"
                      : "text-slate-600 hover:text-sky-600"
                  }`}
                >
                  {item.name}
                  {item.dropdown.length > 0 && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isHovered ? "rotate-180 text-sky-600" : "text-slate-400 group-hover:text-sky-500"}`} />
                  )}
                </Link>

                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-[2px] left-4 right-4 h-0.5 bg-sky-500 rounded-t-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <AnimatePresence>
                  {isHovered && item.dropdown.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 flex flex-col bg-white border border-slate-100/50 rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] ring-1 ring-black/5"
                    >
                      <div className="p-2 flex flex-col gap-1">
                        {item.dropdown.map((drop, j) => (
                          <Link
                            key={j}
                            to={drop.path}
                            className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2 group/link ${
                              location.pathname === drop.path 
                                ? "bg-sky-50 text-sky-600" 
                                : "text-slate-600 hover:bg-slate-50 hover:text-sky-500"
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full transition-opacity duration-200 ${location.pathname === drop.path ? "bg-sky-500 opacity-100" : "bg-sky-400 opacity-0 group-hover/link:opacity-100"}`} />
                            {drop.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-2 xl:gap-4 flex-shrink-0">
          <Link
            to="/contact"
            className="hidden xl:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 bg-sky-500 border border-transparent rounded-full shadow-md hover:bg-sky-600 hover:shadow-lg hover:-translate-y-0.5"
          >
            Contact us
          </Link>
          
          <button 
            className="xl:hidden p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
              {NAV_ITEMS.map((item, i) => (
                <div key={i} className="flex flex-col">
                  {item.dropdown.length > 0 ? (
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className={`py-3 px-4 flex items-center justify-between font-semibold rounded-xl transition-colors ${
                        mobileDropdown === item.name || location.pathname.startsWith(item.path)
                          ? "bg-sky-50 text-sky-600"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          mobileDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={`py-3 px-4 font-semibold rounded-xl transition-colors ${
                        location.pathname.startsWith(item.path) 
                          ? "bg-sky-50 text-sky-600" 
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {mobileDropdown === item.name && item.dropdown.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col overflow-hidden"
                      >
                        <div className="pl-6 pr-2 py-2 flex flex-col gap-1 border-l-2 border-slate-100 ml-6 mt-1 mb-2">
                          {item.dropdown.map((drop, j) => (
                            <Link
                              key={j}
                              to={drop.path}
                              onClick={closeMobileMenu}
                              className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                location.pathname === drop.path ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <span className={`w-1 h-1 rounded-full ${location.pathname === drop.path ? "bg-sky-600" : "bg-slate-300"}`} />
                              {drop.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-full py-3 px-4 text-sm font-bold text-white transition-all duration-300 bg-sky-500 rounded-xl shadow-md hover:bg-sky-600"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
