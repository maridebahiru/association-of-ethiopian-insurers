import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, Download, Search, Clock } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function PublicationsPage() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("category", "publication")
        .order("created_at", { ascending: false });

      if (!error) setDocs(data);
      setLoading(false);
    };
    fetchDocs();
  }, []);

  const filteredDocs = docs.filter(doc => 
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 font-sans">
      {/* Page Header */}
      <div className="bg-[#0b1d30] py-12 md:py-16 text-white border-b-4 border-[#c0944f]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-[#c0944f]"
          >
            Publications
          </motion.h1>
          <div className="flex items-center gap-2 mt-4 text-sm font-medium text-white/70">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Publications</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Search Bar */}
        <div className="relative mb-12 max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search publications..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all outline-none"
          />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c0944f] mx-auto"></div>
            <p className="mt-4 text-slate-500">Loading publications...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => (
                <motion.div 
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#c0944f] mb-6 group-hover:bg-[#c0944f] group-hover:text-white transition-colors">
                      <FileText className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight mb-3 line-clamp-2">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
                      <Clock className="w-4 h-4" />
                      {new Date(doc.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                  
                  <a 
                    href={doc.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-[#0b1d30] font-bold rounded-xl hover:bg-[#0b1d30] hover:text-white transition-all group-hover:shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-medium">No publications found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
