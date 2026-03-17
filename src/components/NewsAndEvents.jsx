import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SpotlightCard from "./SpotlightCard";
import { Calendar, ArrowRight, Bell } from "lucide-react";

export default function NewsAndEvents() {
  const items = [
    {
      type: "Event",
      date: "Nov 24, 2024",
      title: "21st Annual General Meeting",
      desc: "Join us for our annual overview of market trends and strategic goals. We discuss key milestones and upcoming initiatives.",
      link: "/events",
      icon: <Calendar className="w-5 h-5 text-amber-500" />
    },
    {
      type: "News",
      date: "Oct 12, 2024",
      title: "Lifetime Achievement Award",
      desc: "AEI recognizes outstanding contributions to the Ethiopian insurance sector, honoring leaders who have transformed the industry.",
      link: "/news",
      icon: <Bell className="w-5 h-5 text-amber-500" />
    },
    {
      type: "Announcement",
      date: "Sep 05, 2024",
      title: "New Regulatory Policy Updates",
      desc: "Critical updates to the directives published by the National Bank of Ethiopia. Read the full brief to ensure compliance.",
      link: "/announcements",
      icon: <Bell className="w-5 h-5 text-yellow-500" />
    }
  ];

  return (
    <section className="py-24 bg-[#050505] relative z-10 border-t border-white/5" id="news">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
            >
              Latest & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">Greatest</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/50 max-w-xl text-lg font-light"
            >
              Stay updated with the latest industry news, regulatory announcements, and upcoming association events.
            </motion.p>
          </div>
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
          >
            <Link to="/news" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors">
              View All Updates <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <SpotlightCard className="h-full rounded-[2rem] bg-gradient-to-left from-white/[0.04] to-transparent border border-white/[0.08] p-8 flex flex-col hover:border-amber-500/30 transition-colors group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">{item.type}</span>
                    <span className="text-xs text-white/40">{item.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                <p className="text-white/50 leading-relaxed font-light flex-1 mb-6">
                  {item.desc}
                </p>
                <Link to={item.link} className="flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400 mt-auto w-fit">
                  Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
