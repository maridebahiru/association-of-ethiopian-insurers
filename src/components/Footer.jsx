import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#0b1d30] text-white pt-20 pb-10 mt-auto overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="inline-block group">
              <img 
                src={logo} 
                alt="AEI Logo" 
                className="h-24 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
              Empowering the Ethiopian insurance sector through advocacy, data-driven insights, and uncompromising professional standards.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-white/10 hover:border-sky-500/50 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-white/10 hover:border-sky-500/50 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-white/10 hover:border-sky-500/50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-8 h-1 bg-[#c0944f]"></span>
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Members", path: "/members" },
                { name: "News & Press", path: "/news" },
                { name: "Contact Us", path: "/contact" }
              ].map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 text-sm group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500/50 group-hover:bg-sky-400 transition-colors"></span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-8 h-1 bg-[#c0944f]"></span>
            </h4>
            <div className="flex flex-col gap-4">
              {[
                { name: "Proclamations", path: "/proclamations" },
                { name: "Publications", path: "/publications" },
                { name: "Industry Data", path: "/industry-data" },
                { name: "Help Center (FAQ)", path: "/faq" }
              ].map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 text-sm group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500/50 group-hover:bg-sky-400 transition-colors"></span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Contact Details
              <span className="absolute bottom-0 left-0 w-8 h-1 bg-[#c0944f]"></span>
            </h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                  <MapPin className="w-5 h-5 text-sky-400" />
                </div>
                <p className="text-slate-300 text-sm leading-snug pt-1">
                  Ambessa Building 7th floor,<br />
                  Addis Ababa, Ethiopia.
                </p>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                  <Mail className="w-5 h-5 text-sky-400" />
                </div>
                <a href="mailto:info@associationofethiopianinsurers.com" className="text-slate-300 text-sm pt-2 hover:text-white transition-colors">
                  info@aei-ethiopia.com
                </a>
              </div>
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-sky-500/20 transition-colors">
                  <Phone className="w-5 h-5 text-sky-400" />
                </div>
                <a href="tel:+251115503985" className="text-slate-300 text-sm pt-2 hover:text-white transition-colors">
                  +251 115 503 985
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Association of Ethiopian Insurers. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <a key={item} href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
