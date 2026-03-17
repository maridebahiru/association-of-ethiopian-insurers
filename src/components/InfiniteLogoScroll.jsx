import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const COMPANIES = [
  "Awash Insurance", "Nyala Insurance", "United Insurance", 
  "Nib Insurance", "Oromia Insurance", "Zemen Insurance", 
  "EIC", "Tsehay Insurance", "Lucy Insurance", "National Insurance"
];

export default function InfiniteLogoScroll() {
  return (
    <section className="py-16 bg-[#020202] border-t border-b border-white/5 overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-sm font-bold tracking-widest text-amber-500 uppercase">Trusted by Ethiopia's Leading Insurers</h2>
      </div>
      
      <div className="relative w-full max-w-[100vw] overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex flex-nowrap gap-12 sm:gap-20 py-4 items-center pr-12 sm:pr-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          style={{ width: "max-content" }}
        >
          {[...COMPANIES, ...COMPANIES].map((name, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300">
              <div className="h-16 px-8 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-colors cursor-pointer hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <span className="text-white font-bold text-xl">{name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Link to="/members" className="mt-12 group flex items-center gap-2 text-white/50 hover:text-amber-500 transition-colors text-sm font-medium">
        View Full Member Directory 
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </section>
  );
}
