import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import { X, Briefcase, Award, User } from "lucide-react";

export default function TiltedScroll({ items }) {
  const containerRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  return (
    <>
      <div 
        className="flex flex-wrap items-center justify-center gap-8 py-12"
        ref={containerRef}
      >
        {items.map((item, id) => (
          <Card key={id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="relative h-40 bg-gradient-to-r from-sky-500 to-sky-400">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-12 left-10">
                  <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl">
                    <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden">
                       {selectedItem.image ? (
                         <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                       ) : (
                         <User className="w-12 h-12 text-sky-200" />
                       )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-16 px-10 pb-10">
                 <h3 className="text-3xl font-black text-slate-800 tracking-tight mb-1 uppercase">
                   {selectedItem.name}
                 </h3>
                 <p className="text-sky-600 font-bold uppercase tracking-widest text-sm mb-8">
                   {selectedItem.role || selectedItem.description}
                 </p>

                 <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 border border-slate-100">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Position</p>
                        <p className="text-slate-700 font-medium">Board Member, Association of Ethiopian Insurers</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 border border-slate-100">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Organization</p>
                        <p className="text-slate-700 font-medium">Leading executive representative of the Ethiopian Insurance Sector.</p>
                      </div>
                    </div>
                 </div>

                 <button 
                   onClick={() => setSelectedItem(null)}
                   className="mt-10 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all shadow-lg hover:shadow-sky-500/20"
                 >
                   Close Profile
                 </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Card({ item, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      onClick={onClick}
      variants={{
        hidden: { opacity: 0, scale: 0.8, rotateX: 20, rotateY: -20, z: -100 },
        visible: { opacity: 1, scale: 1, rotateX: 0, rotateY: 0, z: 0 }
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
      whileHover={{ 
        scale: 1.05, 
        rotateX: -10, 
        rotateY: 10,
        boxShadow: "0px 20px 40px rgba(14, 165, 233, 0.15)"
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="relative w-64 h-80 rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:border-sky-300 shadow-md group"
    >
      <div 
        className="absolute inset-0 rounded-[2.5rem] bg-sky-400/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ transform: "translateZ(-50px)" }}
      />
      <div 
        className="w-20 h-20 rounded-2xl bg-slate-100 mb-6 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-black text-sky-500 uppercase">{item.name?.charAt(0)}</span>
        )}
      </div>
      <h3 
        className="text-lg font-black text-slate-800 mb-2 uppercase tracking-tight leading-tight"
        style={{ transform: "translateZ(40px)" }}
      >
        {item.name}
      </h3>
      <p 
        className="text-sky-500 font-bold text-xs uppercase tracking-widest"
        style={{ transform: "translateZ(20px)" }}
      >
        {item.role || item.description}
      </p>
    </motion.div>
  );
}
