import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Phone, Mail, Printer, Calendar } from "lucide-react";
import eicLogo from "../assets/Ethiopian_Insurance_Corporation.png";

export const COMPANIES = [
  { name: "Ethiopian Insurance Company", image: eicLogo },
  { 
    name: "Zemen Insurance S.C.", 
    phone: "+251-115575850; +251-116151415", 
    email: "info@zemeninsuranceet.com", 
    fax: "+251-116150001", 
    established: "17/01/2020",
    initials: "ZI"
  },
  { 
    name: "Bunna Insurance S.C.", 
    phone: "+251-111263460", 
    email: "info@bunnainsurance.com", 
    fax: "+251-111119207", 
    established: "21/05/2013",
    initials: "BI"
  },
  { 
    name: "Lucy Insurance S.C.", 
    spriteIndex: 3, offsetX: 0, offsetY: 0,
    phone: "+251-114671784/704410/703361", 
    email: "Lucyinsurance@ethionet.et", 
    fax: "+251-114671896", 
    established: "01/10/2012"
  },
  { 
    name: "Tsehay Insurance S.C.", 
    phone: "+251-111119643/9771", 
    email: "officemail@tsehayinsurance.com", 
    fax: "+251-111119886", 
    established: "28/03/2012",
    initials: "TI"
  },
  { 
    name: "Berhan Insurance S.C.", 
    phone: "+251-114674423/46", 
    email: "berhaninsurance@yahoo.com", 
    fax: "+251-114668701", 
    established: "24/05/2011",
    initials: "BI"
  },
  { 
    name: "Abay Insurance S.C.", 
    phone: "+251-115535300", 
    email: "info@abayinsurance.com", 
    fax: "+251-115157690", 
    established: "26/07/2010",
    initials: "AI"
  },
  { 
    name: "Oromia Insurance S.C.", 
    phone: "+251-115572121", 
    email: "oromiainsurance@ethionet.et", 
    fax: "+251-115572122", 
    established: "26/01/2009",
    initials: "OI"
  },
  { 
    name: "Ethio-Life & General Insurance S.C.", 
    phone: "+251-115549651", 
    email: "info@eliginsurance.com", 
    fax: "+251-115549653", 
    established: "23/10/2008",
    initials: "ELG"
  },
  { 
    name: "Lion Insurance Company S.C.", 
    spriteIndex: 2, offsetX: -10, offsetY: -20,
    phone: "+251-116187000/188800", 
    email: "lioninsurance@ethionet.et", 
    fax: "+251-116632940", 
    established: "01/07/2007"
  },
  { 
    name: "Nib Insurance Company S.C.", 
    spriteIndex: 4, offsetX: 0, offsetY: 0,
    phone: "+251-115528194/96; +251-115535129/32", 
    email: "nibinsgm@ethionet.et", 
    fax: "+251-115528193", 
    established: "01/05/2002"
  },
  { 
    name: "United Insurance Company S.C.", 
    phone: "+251-111263434", 
    email: "united.insurance@unic-ethiopia.com", 
    fax: "+251-111263677", 
    established: "01/04/1997",
    initials: "UI"
  },
  { 
    name: "Global Insurance Company S.C.", 
    spriteIndex: 1, offsetX: -10, offsetY: -20,
    phone: "+251-115567400; +251-115-565850", 
    email: "globalinsu@ethionet.et", 
    fax: "+251-115566200", 
    established: "11/01/1997"
  },
  { name: "Nile Insurance Company", spriteIndex: 5, offsetX: 0, offsetY: 0 },
  { name: "National Insurance Company of Ethiopia", spriteIndex: 6, offsetX: 0, offsetY: 0 },
];

export default function InfiniteLogoScroll() {
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <>
      <section className="py-16 bg-white border-t border-b border-slate-200 overflow-hidden flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <h2 className="text-sm font-bold tracking-widest text-sky-500 uppercase">Trusted by Ethiopia's Leading Insurers</h2>
        </div>
        
        <div className="relative w-full max-w-[100vw] overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex flex-nowrap gap-8 sm:gap-12 py-6 items-center pr-8 sm:pr-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 60, repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {[...COMPANIES, ...COMPANIES].map((company, i) => (
               <div 
                  key={i} 
                  onClick={() => setSelectedCompany(company)}
                  className="flex-shrink-0 flex items-center justify-center opacity-75 hover:opacity-100 transition-all duration-300 w-56 sm:w-64"
                >
                 <div className="w-full py-6 px-4 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-200 hover:border-sky-300 hover:bg-white transition-colors cursor-pointer hover:shadow-xl group">
                   
                   {company.image ? (
                     <div className="w-[100px] h-[65px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                       <img src={company.image} alt={`${company.name} Logo`} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                     </div>
                   ) : company.spriteIndex !== undefined ? (
                     <div className="w-[100px] h-[65px] overflow-hidden relative mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
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
                     <div className="w-[85px] h-[65px] bg-slate-200 text-slate-400 font-bold text-2xl rounded-[1rem] mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-sky-100 group-hover:text-sky-500">
                       {company.initials}
                     </div>
                   )}

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
    </>
  );
}
