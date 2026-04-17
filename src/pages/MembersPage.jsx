import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion";
import { X, Phone, Mail, Printer, Calendar } from "lucide-react";
import BlurText from "../components/BlurText";
import { COMPANIES } from "../components/InfiniteLogoScroll";

function MemberCard({ company, onClick }) {
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
      onClick={onClick}
      initial="hidden"
      animate={controls}
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
      className="relative w-64 h-80 rounded-[2rem] bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:border-sky-300 shadow-md group"
    >
      <div 
        className="absolute inset-0 rounded-[2rem] bg-sky-200/50 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ transform: "translateZ(-50px)" }}
      />
      
      <div 
        className="w-24 h-24 rounded-2xl bg-white mb-6 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        {company.image ? (
          <img src={company.image} alt={`${company.name} Logo`} className="max-w-[75%] max-h-[75%] object-contain mix-blend-multiply" />
        ) : company.spriteIndex !== undefined ? (
          <div className="w-full h-full relative flex items-center justify-center">
            <img 
              src="/insurers-logos.jpg" 
              alt={`${company.name} Logo`}
              className="absolute max-w-none mix-blend-multiply"
              style={{ 
                 top: `calc(50% + ${company.offsetY || 0}px)`,
                 left: `calc(50% - ${company.spriteIndex * (1024/7) + (1024/7)/2}px + ${company.offsetX || 0}px)`,
                 transformOrigin: `${company.spriteIndex * (1024/7) + (1024/7)/2}px 50%`,
                 transform: 'translateY(-50%) scale(0.65)',
                 width: '1024px',
                 height: 'auto' 
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center transition-colors group-hover:bg-sky-50">
            <span className="text-3xl font-bold text-slate-400 group-hover:text-sky-500 transition-colors">{company.initials}</span>
          </div>
        )}
      </div>

      <h3 
        className="text-lg font-bold text-slate-800 mb-2 leading-tight"
        style={{ transform: "translateZ(40px)" }}
      >
        {company.name}
      </h3>
      
      <p 
        className="text-sky-600 font-medium text-xs tracking-wide uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ transform: "translateZ(20px)" }}
      >
        View Details
      </p>
    </motion.div>
  );
}

export default function MembersPage() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col bg-slate-50">
      <div className="mb-16 text-center lg:text-left">
        <BlurText 
          text="Our Members" 
          delay={50} 
          className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400 tracking-tight mb-4 inline-block"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl mx-auto lg:mx-0"
        >
          A united front of industry leaders driving Ethiopia's insurance landscape. We bring the Ethiopian insurance industry together. Our members include all major insurance providers operating within Ethiopia.
        </motion.p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 py-8">
        {COMPANIES.map((company, i) => (
          <MemberCard 
            key={i} 
            company={company} 
            onClick={() => setSelectedCompany(company)} 
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-4">
                   {selectedCompany.image ? (
                     <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 p-2 flex items-center justify-center shadow-sm">
                       <img src={selectedCompany.image} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                     </div>
                   ) : selectedCompany.spriteIndex !== undefined ? (
                     <div className="w-16 h-16 bg-white rounded-xl border border-slate-200 overflow-hidden relative shadow-sm">
                        <img 
                          src="/insurers-logos.jpg" 
                          alt=""
                          className="absolute max-w-none mix-blend-multiply"
                          style={{ 
                             top: `calc(50% + ${selectedCompany.offsetY || 0}px)`,
                             left: `calc(50% - ${selectedCompany.spriteIndex * (1024/7) + (1024/7)/2}px + ${selectedCompany.offsetX || 0}px)`,
                             transformOrigin: `${selectedCompany.spriteIndex * (1024/7) + (1024/7)/2}px 50%`,
                             transform: 'translateY(-50%) scale(0.4)',
                             width: '1024px',
                             height: 'auto' 
                          }}
                        />
                     </div>
                   ) : (
                     <div className="w-16 h-16 bg-sky-100 text-sky-600 font-bold text-xl rounded-xl flex items-center justify-center shadow-sm">
                       {selectedCompany.initials}
                     </div>
                   )}
                  <h3 className="text-xl font-bold text-slate-800 leading-tight pr-4">
                    {selectedCompany.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedCompany(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-100 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {selectedCompany.phone || selectedCompany.email ? (
                  <div className="space-y-4">
                    {selectedCompany.phone && (
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-sky-50 rounded-lg text-sky-600">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number(s)</p>
                          <p className="text-slate-700 font-medium">{selectedCompany.phone}</p>
                        </div>
                      </div>
                    )}

                    {selectedCompany.email && (
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-sky-50 rounded-lg text-sky-600">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                          <a href={`mailto:${selectedCompany.email}`} className="text-sky-600 hover:text-sky-700 font-medium hover:underline">
                            {selectedCompany.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {selectedCompany.fax && (
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-sky-50 rounded-lg text-sky-600">
                          <Printer className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Fax Number</p>
                          <p className="text-slate-700 font-medium">{selectedCompany.fax}</p>
                        </div>
                      </div>
                    )}

                    {selectedCompany.established && (
                      <div className="flex items-start gap-4">
                        <div className="p-2.5 bg-sky-50 rounded-lg text-sky-600">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Established Date</p>
                          <p className="text-slate-700 font-medium">{selectedCompany.established}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    <p>Detailed contact information is not available for this member.</p>
                  </div>
                )}
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
