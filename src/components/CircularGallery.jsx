import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CircularGallery = ({
  items,
  autoplay = true,
  colors = {},
  fontSizes = {},
}) => {
  // Color & font config
  const colorName = colors.name ?? "#0f172a"; // slate-900
  const colorDesignation = colors.designation ?? "#64748b"; // slate-500
  const colorTestimony = colors.testimony ?? "#334155"; // slate-700
  const colorArrowBg = colors.arrowBackground ?? "#f1f5f9"; // slate-100
  const colorArrowFg = colors.arrowForeground ?? "#0f172a"; // slate-900
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#0ea5e9"; // sky-500
  
  const fontSizeName = fontSizes.name ?? "2.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "1rem";
  const fontSizeQuote = fontSizes.quote ?? "1.25rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const itemsLength = useMemo(() => items.length, [items]);
  const activeItem = useMemo(
    () => items[activeIndex],
    [activeIndex, items]
  );

  function calculateGap(width) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
      return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
  }

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay && itemsLength > 1) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % itemsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, itemsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, itemsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [itemsLength]);
  
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [itemsLength]);

  // Compute transforms for each image
  function getImageStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
    const isRight = (activeIndex + 1) % itemsLength === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft && itemsLength > 1) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight && itemsLength > 1) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      transform: `scale(0.5)`,
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Images Column */}
        <div className="relative w-full h-[30rem] perspective-1000" ref={imageContainerRef}>
          {items.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover rounded-[3rem] shadow-2xl border-4 border-white"
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Content Column */}
        <div className="flex flex-col justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <div>
                <h3
                  className="font-black uppercase tracking-tighter leading-none"
                  style={{ color: colorName, fontSize: fontSizeName }}
                >
                  {activeItem.name}
                </h3>
                <p
                  className="font-bold uppercase tracking-widest mt-2"
                  style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                >
                  {activeItem.designation}
                </p>
              </div>
              
              <motion.div
                className="leading-relaxed font-light italic"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeItem.quote && activeItem.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
                {!activeItem.quote && <span className="opacity-50">No description available.</span>}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-6 mt-12">
            <button
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous"
            >
              <ArrowLeft size={24} color={hoverPrev ? "#fff" : colorArrowFg} />
            </button>
            <button
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 active:scale-95"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next"
            >
              <ArrowRight size={24} color={hoverNext ? "#fff" : colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default CircularGallery;
