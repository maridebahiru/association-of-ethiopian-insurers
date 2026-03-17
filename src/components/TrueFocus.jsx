import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function TrueFocus({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 4,
  borderColor = "#eab308", // Amber 500
  glowColor = "rgba(234, 179, 8, 0.4)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 2000,
  className = ""
}) {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, pauseBetweenAnimations);

      return () => clearInterval(interval);
    }
  }, [manualMode, pauseBetweenAnimations, words.length]);

  const handleMouseEnter = (index) => {
    if (manualMode) {
      setLastActiveIndex(currentIndex);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex !== null ? lastActiveIndex : 0);
    }
  };

  return (
    <div
      className={clsx("flex flex-wrap items-center justify-center gap-2 md:gap-4 relative", className)}
      ref={containerRef}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={index}
            className="cursor-pointer relative px-2 md:px-4 py-1 flex items-center justify-center"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {isActive && (
              <motion.div
                layoutId="focus-rect"
                transition={{
                  duration: animationDuration,
                  type: "spring",
                  bounce: 0.2,
                }}
                className="absolute inset-0 rounded-[8px] border-2 pointer-events-none"
                style={{
                  borderColor: borderColor,
                  boxShadow: `0 0 20px 0px ${glowColor}, inset 0 0 10px 0px ${glowColor}`,
                }}
              />
            )}
            <motion.span
              animate={{
                filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{ duration: animationDuration }}
              className="text-white text-5xl md:text-8xl font-black z-10 font-sans tracking-tight leading-loose"
            >
              {word}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}
