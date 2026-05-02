import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, Video, Archive, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("date", { ascending: false });
      
      if (!error) setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  const latestArticle = news[0] || {
    title: "No News Available",
    category: "Press Release",
    date: "",
    cover_image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
    content: "Stay tuned for updates.",
    link: "#"
  };

  const featured = news.slice(1, 5).map(item => ({
    title: item.title,
    link: item.is_external ? item.external_url : `/news/${item.id}`
  }));

  const events = [
    { title: "Ethiopia Finance Forum 2025", date: "May 17, 2025", link: "/events/1" },
    { title: "Risk Management & Compliance Seminar", date: "Aug 12, 2024", link: "/events/2" }
  ];

  const videos = [
    { title: "Discover our newly reimagined strategic portal here", date: "Oct 10, 2024", link: "/videos/1", thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" },
    { title: "Highlights from the Insurance Week Exhibition", date: "Sep 22, 2024", link: "/videos/2", thumb: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600" }
  ];

  const archives = news.slice(5).map(item => ({
    title: item.title,
    link: item.is_external ? item.external_url : `/news/${item.id}`
  }));

  return (
    <div className="min-h-screen bg-slate-50 relative z-10 flex flex-col pt-24 font-sans">
      
      {/* Page Header (NBE Style Dark) */}
      <div className="bg-[#0b1d30] py-12 md:py-16 text-white border-b-4 border-[#c0944f]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-[#c0944f]"
          >
            News & Events
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mt-4 text-sm font-medium text-white/70"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">News & Events</span>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            
            {/* Latest Article */}
            <section>
              <div className="flex items-center justify-between border-b-2 border-[#0b1d30] pb-2 mb-6">
                <h2 className="text-2xl font-bold uppercase text-[#0b1d30]">Latest Article</h2>
              </div>
              
              <Link to={latestArticle.is_external ? latestArticle.external_url : `/news/${latestArticle.id}`} className="group block bg-white border border-slate-200 hover:shadow-xl transition-all rounded-sm overflow-hidden">
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  <img src={latestArticle.cover_image || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200"} alt="Latest Article" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-[#c0944f] text-white text-xs font-bold uppercase px-3 py-1 shadow-md">
                    {latestArticle.category}
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-slate-500 text-sm font-medium block mb-2">{latestArticle.date}</span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase text-[#0b1d30] leading-tight mb-4 group-hover:text-[#c0944f] transition-colors">
                    {latestArticle.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light text-lg line-clamp-3">
                    {latestArticle.content}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[#0b1d30] font-bold text-sm uppercase tracking-wider group-hover:text-[#c0944f] transition-colors">
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </section>

            {/* Latest Videos */}
            <section>
              <div className="flex items-center justify-between border-b-2 border-[#0b1d30] pb-2 mb-6">
                <h2 className="text-2xl font-bold uppercase text-[#0b1d30]">Latest Videos</h2>
                <Link to="/videos" className="text-sm font-bold text-[#c0944f] uppercase tracking-wider hover:text-[#a88143] transition-colors">View All</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((vid, i) => (
                  <Link key={i} to={vid.link} className="group block bg-white border border-slate-200 hover:shadow-md transition-shadow overflow-hidden">
                    <div className="relative h-48 w-full overflow-hidden">
                      <img src={vid.thumb} alt="Video Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-[#0b1d30] shadow-lg">
                          <Video className="w-5 h-5 ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-bold uppercase text-[#0b1d30] group-hover:text-[#c0944f] transition-colors line-clamp-2 mb-2">{vid.title}</h4>
                      <span className="text-xs font-medium text-slate-500 uppercase">{vid.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            
            {/* Featured */}
            <section>
              <div className="flex items-center justify-between border-b-2 border-[#0b1d30] pb-2 mb-6">
                <h2 className="text-2xl font-bold uppercase text-[#0b1d30]">Featured</h2>
                <Link to="/news" className="text-sm font-bold text-[#c0944f] uppercase tracking-wider hover:text-[#a88143] transition-colors">View All</Link>
              </div>
              <div className="flex flex-col gap-4">
                {featured.map((item, i) => (
                  <Link key={i} to={item.link} className="group flex gap-3 pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                    <ChevronRight className="w-6 h-6 text-[#c0944f] shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                    <h4 className="text-[1rem] font-bold text-[#0b1d30] uppercase group-hover:text-[#c0944f] transition-colors leading-snug">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </section>

            {/* Events */}
            <section>
              <div className="flex items-center justify-between border-b-2 border-[#0b1d30] pb-2 mb-6">
                <h2 className="text-2xl font-bold uppercase text-[#0b1d30]">Events</h2>
                <Link to="/events" className="text-sm font-bold text-[#c0944f] uppercase tracking-wider hover:text-[#a88143] transition-colors">View All</Link>
              </div>
              <div className="flex flex-col gap-6">
                {events.map((ev, i) => (
                  <Link key={i} to={ev.link} className="group flex items-start gap-4 p-4 bg-white border border-slate-200 hover:border-[#c0944f] hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-[#0b1d30] text-[#c0944f] flex flex-col items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 mb-0.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0b1d30] uppercase leading-tight group-hover:text-[#c0944f] transition-colors mb-1">{ev.title}</h4>
                      <span className="text-sm font-medium text-slate-500">{ev.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
            
            {/* From Archive */}
            <section>
              <div className="flex items-center justify-between border-b-2 border-[#0b1d30] pb-2 mb-6">
                <h2 className="text-2xl font-bold uppercase text-[#0b1d30]">From Archive</h2>
                <Link to="/archive" className="text-sm font-bold text-[#c0944f] uppercase tracking-wider hover:text-[#a88143] transition-colors">View All</Link>
              </div>
              <div className="flex flex-col gap-4">
                {archives.map((arc, i) => (
                  <Link key={i} to={arc.link} className="group flex gap-3 items-start pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                    <Archive className="w-5 h-5 text-slate-400 shrink-0 group-hover:text-[#c0944f] transition-colors mt-0.5" />
                    <h4 className="text-[0.95rem] font-bold text-slate-700 leading-snug group-hover:text-[#c0944f] transition-colors">
                      {arc.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
