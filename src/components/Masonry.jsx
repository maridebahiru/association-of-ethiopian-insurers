import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Masonry({ images, columns = 3, gap = 16 }) {
  const [columnsData, setColumnsData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const cols = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : columns;
      const newColumns = Array.from({ length: cols }, () => []);
      
      images.forEach((img, i) => {
        newColumns[i % cols].push({ ...img, index: i });
      });
      setColumnsData(newColumns);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, columns]);

  return (
    <>
      <div 
        className="flex w-full items-start"
        style={{ gap: `${gap}px` }}
      >
        {columnsData.map((col, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col" style={{ gap: `${gap}px` }}>
            {col.map((img) => (
              <motion.div
                key={img.index}
                layoutId={`image-${img.index}`}
                onClick={() => setSelectedImage(img)}
                whileHover={{ scale: 1.02, zIndex: 10 }}
                className="relative cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/10 group"
              >
                <img 
                  src={img.src} 
                  alt={img.alt || "Gallery Image"} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.caption || "View Image"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-10 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              layoutId={`image-${selectedImage.index}`}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl ring-1 ring-white/20"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white bg-black/50 px-6 py-3 rounded-full backdrop-blur-md border border-white/10"
            >
              {selectedImage.caption || "Gallery Details"}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
