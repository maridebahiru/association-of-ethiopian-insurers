import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 border-t border-slate-200 bg-slate-50 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="AEI Logo" className="h-20 w-auto opacity-100 drop-shadow-sm" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Empowering the Ethiopian insurance sector through advocacy, data, and uncompromising standards.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 hover:shadow-md transition-all hover:scale-110">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 hover:shadow-md transition-all hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-sky-500 hover:border-sky-300 hover:shadow-md transition-all hover:scale-110">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-800 font-bold mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-slate-500 hover:text-sky-600 transition-colors text-sm">About Us</Link>
              <Link to="/members" className="text-slate-500 hover:text-sky-600 transition-colors text-sm">Members Directory</Link>
              <Link to="/news" className="text-slate-500 hover:text-sky-600 transition-colors text-sm">Latest News</Link>
              <Link to="/contact" className="text-slate-500 hover:text-sky-600 transition-colors text-sm">Contact Us</Link>
            </div>
          </div>

          <div>
            <h4 className="text-slate-800 font-bold mb-6">Resources</h4>
            <div className="flex flex-col gap-3">
              <Link to="/proclamations" className="text-slate-500 hover:text-sky-600 transition-colors text-sm">Proclamations & Directives</Link>
              <Link to="/publications" className="text-slate-500 hover:text-sky-600 transition-colors text-sm">Publications</Link>
              <Link to="/industry-data" className="text-slate-500 hover:text-sky-600 transition-colors text-sm">Industry Data</Link>
              <Link to="/faq" className="text-slate-500 hover:text-sky-600 transition-colors text-sm">FAQ</Link>
            </div>
          </div>

          <div>
            <h4 className="text-slate-800 font-bold mb-6">Contact</h4>
            <div className="flex flex-col gap-3">
              <p className="text-slate-500 text-sm">Ambessa building 7th floor, Addis Ababa.</p>
              <p className="text-slate-500 text-sm">info@associationofethiopianinsurers.com</p>
              <p className="text-slate-500 text-sm">+251 115 503 985</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-slate-400 text-xs text-center md:text-left gap-4">
          <p>© {new Date().getFullYear()} Association of Ethiopian Insurers. All Rights Reserved.</p>
          <div className="flex items-center justify-center md:justify-end gap-6">
            <Link to="/privacy" className="hover:text-sky-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-sky-600 transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-sky-600 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
