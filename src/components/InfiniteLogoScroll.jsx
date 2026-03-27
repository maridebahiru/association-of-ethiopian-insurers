import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const COMPANIES = [
  { name: "Ethiopian Insurance Company", spriteIndex: 0 },
  { name: "Global Insurance Company", spriteIndex: 1 },
  { name: "Lion Insurance Company", spriteIndex: 2 },
  { name: "Lucy Insurance company", spriteIndex: 3 },
  { name: "Nib Insurance Company", spriteIndex: 4 },
  { name: "Nile Insurance Company", spriteIndex: 5 },
  { name: "National Insurance Company of Ethiopia", spriteIndex: 6 },
];

export default function InfiniteLogoScroll() {
  return (
    <section className="py-16 bg-white border-t border-b border-slate-200 overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase">Trusted by Ethiopia's Leading Insurers</h2>
      </div>
      
      <div className="relative w-full max-w-[100vw] overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex flex-nowrap gap-8 sm:gap-12 py-6 items-center pr-8 sm:pr-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          style={{ width: "max-content" }}
        >
          {[...COMPANIES, ...COMPANIES].map((company, i) => (
             <div key={i} className="flex-shrink-0 flex items-center justify-center opacity-75 hover:opacity-100 transition-all duration-300 w-56 sm:w-64">
               <div className="w-full py-6 px-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-200 hover:border-sky-300 hover:bg-white transition-colors cursor-pointer hover:shadow-xl group">
                 
                 {/* CSS Sprite Logo Extraction */}
                 <div className="w-[140px] h-[75px] overflow-hidden relative mb-4 transition-transform duration-300 group-hover:scale-110">
                    <img 
                      src="/insurers-logos.jpg" 
                      alt={`${company.name} Logo`}
                      className="absolute max-w-none mix-blend-multiply"
                      style={{ 
                         top: '0px',
                         left: `calc(70px - ${company.spriteIndex * (1024/7) + (1024/7)/2}px)`,
                         width: '1024px',
                         height: '150px' 
                      }}
                    />
                 </div>

                 <span className="text-slate-800 font-bold text-[13px] sm:text-[14px] text-center leading-tight min-h-[40px] flex items-center">
                   {company.name}
                 </span>
               </div>
             </div>
          ))}
        </motion.div>
      </div>

      <Link to="/members" className="mt-12 group flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors text-sm font-medium">
        View Full Member Directory 
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </section>
  );
}
