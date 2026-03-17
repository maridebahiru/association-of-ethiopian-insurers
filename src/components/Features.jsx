import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileText, TrendingUp, ShieldCheck, Users } from "lucide-react";

export default function Features() {
  const cards = [
    {
      title: "Proclamations & Directives",
      description: "Access the latest regulatory frameworks governing insurance in Ethiopia.",
      link: "/proclamations",
      icon: <FileText className="w-6 h-6 text-sky-500" />
    },
    {
      title: "Industry Data",
      description: "Reliable, up-to-date statistical analytics on the expanding local market.",
      link: "/industry-data",
      icon: <TrendingUp className="w-6 h-6 text-sky-400" />
    },
    {
      title: "Member Advocacy",
      description: "A united voice addressing systemic challenges and fostering partnerships.",
      link: "/about",
      icon: <Users className="w-6 h-6 text-sky-500" />
    },
    {
      title: "Standards & Compliance",
      description: "Guiding the path for transparency, sustainability, and trust.",
      link: "/publications",
      icon: <ShieldCheck className="w-6 h-6 text-sky-400" />
    }
  ];

  return (
    <section className="py-32 bg-slate-50 relative z-10 border-t border-slate-200" id="resources">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6"
          >
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400">Resources</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 max-w-2xl text-xl font-light"
          >
            Essential tools and knowledge base providing members with a competitive edge and regulatory compliance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <Link to={card.link} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="h-full p-8 pb-10 rounded-[2.5rem] bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-start"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-sky-50 flex items-center justify-center mb-8 shadow-sm border border-sky-100 group-hover:scale-110 group-hover:rotate-3 transition-all">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">{card.title}</h3>
                <p className="text-slate-500 leading-relaxed text-base font-light">
                  {card.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
