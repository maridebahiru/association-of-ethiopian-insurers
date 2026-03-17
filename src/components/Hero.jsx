import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TrueFocus from "./TrueFocus";

export default function Hero() {
  return (
    <div className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-slate-50 pt-20">
      {/* Background glowing orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-sky-300/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-sky-200/40 rounded-full blur-[120px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[85rem] mx-auto px-6 text-center space-y-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center w-full"
        >
          <span className="inline-block py-2 px-6 mb-8 rounded-full bg-sky-100 border border-sky-200 text-sky-600 font-bold tracking-widest text-xs uppercase shadow-sm">
            Bridging The Industry
          </span>
          <TrueFocus 
            sentence="Empowering the Ethiopian Insurance Sector."
            manualMode={false}
            blurAmount={4}
            borderColor="#0ea5e9"
            glowColor="rgba(14, 165, 233, 0.3)"
            animationDuration={0.6}
            pauseBetweenAnimations={1800}
            className="mb-8"
          />
          <p className="mt-8 text-lg sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Providing advocacy, industry resources, data, and standards for the sustainable growth of insurance markets in Ethiopia.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link to="/contact" className="px-8 py-4 w-full sm:w-auto text-center rounded-full bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold text-lg hover:shadow-lg hover:scale-105 transition-all">
            Join AEI Today
          </Link>
          <Link to="/members" className="px-8 py-4 w-full sm:w-auto text-center rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-lg shadow-sm transition-all hover:border-slate-300 hover:scale-105">
            View Members
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.5 }} 
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center mt-10"
      >
         <span className="text-xs uppercase tracking-[0.2em] font-medium text-slate-400">Scroll</span>
         <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-transparent mx-auto mt-4" />
      </motion.div>
    </div>
  );
}
