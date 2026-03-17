import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

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
  { name: "Contact us", path: "/contact", dropdown: [] },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-lg bg-white/80 border-b border-slate-200 shadow-sm"
    >
      <Link to="/" className="flex items-center gap-2">
        <img src="/logo.png" alt="Association of Ethiopian Insurers Logo" className="h-14 md:h-20 w-auto" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-2">
        {NAV_ITEMS.map((item, i) => (
          <div
            key={i}
            className="relative"
            onMouseEnter={() => setActiveDropdown(item.name)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to={item.path}
              className={`px-4 py-2 flex items-center gap-1 rounded-full transition-colors text-sm font-medium ${
                location.pathname.startsWith(item.path) || activeDropdown === item.name
                  ? "text-sky-600 bg-sky-50"
                  : "text-slate-600 hover:text-sky-600"
              }`}
            >
              {item.name}
              {item.dropdown.length > 0 && (
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`} />
              )}
            </Link>

            <AnimatePresence>
              {activeDropdown === item.name && item.dropdown.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl origin-top-left"
                >
                  {item.dropdown.map((drop, j) => (
                    <Link
                      key={j}
                      to={drop.path}
                      className="px-5 py-3 text-sm text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {drop.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
