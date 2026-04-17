import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Twitter, Facebook, Linkedin, Youtube } from "lucide-react";

export default function NewsAndEvents() {
  const latestNews = [
    {
      date: "Jun 25, 2025",
      title: "51st AIO Conference Addis Ababa 2025.Highlight of a colourful opening ceremony chaired by the Vice Prime Minister of the Federal Democratic Republic of Ethiopia",
      link: "https://associationofethiopianinsurers.com/2025/06/25/51st-aio-conference-addis-ababa-2025-highlight-of-a-colourful-opening-ceremony-chaired-by-the-vice-prime-minister-of-the-federal-democratic-republic-of-ethiopia/",
      isExternal: true
    },
    {
      date: "Jun 25, 2025",
      title: "✨ A Historic and Proud Moment! ✨",
      link: "https://associationofethiopianinsurers.com/2025/06/25/1894/",
      isExternal: true
    },
    {
      date: "Apr 03, 2025",
      title: "51ST AIO CONFERENCE, ADDIS ABABA 2025.",
      link: "https://associationofethiopianinsurers.com/2025/04/03/51st-aio-conference-addis-ababa-2025/",
      isExternal: true
    }
  ];

  const featuredContents = [
    {
      title: "FINANCIAL STABILITY REPORT",
      desc: "The Association Issues Third Financial Stability Report",
      link: "/reports"
    },
    {
      title: "NATIONAL INSURANCE STRATEGY 2026-2030",
      desc: "Release of draft National Insurance Strategy 2026-2030",
      link: "/strategy"
    }
  ];

  return (
    <section className="py-20 bg-white text-slate-800 relative z-10" id="news">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Latest News (approx 70%) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex items-center gap-6 mb-10 border-b border-slate-200 pb-4">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-slate-900"
              >
                Latest
              </motion.h2>
              <div className="flex items-center gap-4 text-slate-400">
                <a href="#" className="hover:text-sky-500 hover:scale-110 transition-colors"><Twitter className="w-5 h-5 fill-current" /></a>
                <a href="#" className="hover:text-sky-500 hover:scale-110 transition-colors"><Linkedin className="w-5 h-5 fill-current" /></a>
                <a href="#" className="hover:text-sky-500 hover:scale-110 transition-colors"><Facebook className="w-5 h-5 fill-current" /></a>
                <a href="#" className="hover:text-sky-500 hover:scale-110 transition-colors"><Youtube className="w-5 h-5 fill-current" /></a>
              </div>
            </div>

            <div className="flex flex-col flex-1">
              {latestNews.map((news, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {news.isExternal ? (
                    <a 
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group py-6 border-b border-slate-100 hover:bg-slate-50 transition-colors px-4 -mx-4 rounded-sm"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <span className="block text-slate-500 text-sm font-medium mb-2">{news.date}</span>
                          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-800 group-hover:text-sky-600 transition-colors leading-snug">
                            {news.title}
                          </h3>
                        </div>
                        <ChevronRight className="w-8 h-8 text-slate-300 group-hover:text-sky-500 flex-shrink-0 transition-colors" strokeWidth={1.5} />
                      </div>
                    </a>
                  ) : (
                    <Link 
                      to={news.link} 
                      className="block group py-6 border-b border-slate-100 hover:bg-slate-50 transition-colors px-4 -mx-4 rounded-sm"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <span className="block text-slate-500 text-sm font-medium mb-2">{news.date}</span>
                          <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-800 group-hover:text-sky-600 transition-colors leading-snug">
                            {news.title}
                          </h3>
                        </div>
                        <ChevronRight className="w-8 h-8 text-slate-300 group-hover:text-sky-500 flex-shrink-0 transition-colors" strokeWidth={1.5} />
                      </div>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="mt-10"
            >
              <Link 
                to="/news" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold uppercase tracking-wider text-sm transition-all rounded-full shadow-md hover:-translate-y-0.5"
              >
                All News <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Featured Contents (approx 30%) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-10 border-b border-slate-200 pb-4">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold uppercase tracking-wide text-slate-900"
              >
                Featured Contents
              </motion.h2>
            </div>

            <div className="flex flex-col gap-8">
              {featuredContents.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  className="bg-slate-50 p-6 rounded-2xl hover:bg-sky-50 transition-colors border border-slate-100 hover:border-sky-100 shadow-sm"
                >
                  <Link to={feature.link} className="group block">
                    <h4 className="text-lg font-bold text-sky-600 uppercase tracking-wide mb-3 group-hover:text-sky-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 font-light leading-relaxed">
                      {feature.desc}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Some stats or extra links */}
            <div className="mt-12 space-y-3">
              {['18 Insurers', '54 Microfinance Institutes', '32 Banks'].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-600 hover:text-sky-600 hover:translate-x-1 cursor-pointer transition-all border-l-2 border-sky-500 pl-4 py-1">
                  <span className="font-bold text-lg">{stat.split(' ')[0]}</span>
                  <span className="font-light">{stat.slice(stat.indexOf(' ') + 1)}</span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
