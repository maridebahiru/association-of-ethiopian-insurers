import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function SpotlightCard({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) {
  const isHovered = useRef(false);
  const [isHoveredState, setHoveredState] = useState(false);
  const containerRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
    setHoveredState(true);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    setHoveredState(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity: isHoveredState ? 1 : 0,
          background: `radial-gradient(600px circle at ${smoothX}px ${smoothY}px, ${spotlightColor}, transparent 40%)`,
        }}
        initial={false}
      />
      {children}
    </div>
  );
}
