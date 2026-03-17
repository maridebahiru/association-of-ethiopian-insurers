import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function TiltedScroll({ items }) {
  const containerRef = useRef(null);
  
  return (
    <div 
      className="flex flex-wrap items-center justify-center gap-6 py-8"
      ref={containerRef}
    >
      {items.map((item, id) => (
        <Card key={id} item={item} />
      ))}
    </div>
  );
}

function Card({ item }) {
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
      className="relative w-64 h-80 rounded-[2rem] bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:border-sky-300 shadow-md"
    >
      <div 
        className="absolute inset-0 rounded-[2rem] bg-sky-200/50 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ transform: "translateZ(-50px)" }}
      />
      <div 
        className="w-24 h-24 rounded-full bg-slate-100 mb-6 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden"
        style={{ transform: "translateZ(30px)" }}
      >
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-sky-500">{item.name?.charAt(0) || "M"}</span>
        )}
      </div>
      <h3 
        className="text-xl font-bold text-slate-800 mb-2"
        style={{ transform: "translateZ(40px)" }}
      >
        {item.name}
      </h3>
      <p 
        className="text-sky-600 font-medium text-sm tracking-wide"
        style={{ transform: "translateZ(20px)" }}
      >
        {item.role || item.description}
      </p>
    </motion.div>
  );
}
