import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Image, ArrowLeft, Calendar, Grid, Maximize2 } from "lucide-react";
import BlurText from "../components/BlurText";
import Masonry from "../components/Masonry";
import CircularGallery from "../components/CircularGallery";
import { supabase } from "../lib/supabase";

export default function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchingImages, setFetchingImages] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery_albums")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setAlbums(data);
    setLoading(false);
  };

  const fetchAlbumImages = async (album) => {
    setFetchingImages(true);
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("album_id", album.id)
      .order("created_at", { ascending: true });

    if (!error) {
      setAlbumImages(data.map(img => ({
        src: img.image_url,
        name: album.title,
        designation: new Date(album.date || album.created_at).toLocaleDateString(),
        quote: img.caption || "Capturing the essence of our association's vibrant community and leadership."
      })));
    }
    setFetchingImages(false);
  };

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    fetchAlbumImages(album);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!selectedAlbum ? (
            <motion.div
              key="albums-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-16">
                <BlurText 
                  text="Event Gallery" 
                  delay={50} 
                  className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400 tracking-tight mb-4 inline-block"
                />
                <p className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl">
                  Moments from our latest events, meetings, and conferences. Click an event to view all photos.
                </p>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {albums.map((album) => (
                    <motion.div
                      key={album.id}
                      whileHover={{ y: -10 }}
                      onClick={() => handleAlbumClick(album)}
                      className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="relative h-72 overflow-hidden">
                        <img 
                          src={album.cover_image_url} 
                          alt={album.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                             <Calendar className="w-4 h-4" />
                             {new Date(album.date || album.created_at).toLocaleDateString()}
                           </div>
                           <h3 className="text-2xl font-bold text-white leading-tight uppercase tracking-wide">
                             {album.title}
                           </h3>
                        </div>
                        <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                           <Maximize2 className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="p-8">
                         <p className="text-slate-500 font-light line-clamp-2 mb-6">
                           {album.description || "Browse the full collection of images from this event."}
                         </p>
                         <button className="flex items-center gap-2 text-sky-500 font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all">
                           View Album <ArrowLeft className="w-4 h-4 rotate-180" />
                         </button>
                      </div>
                    </motion.div>
                  ))}

                  {albums.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                       <Image className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                       <p className="text-slate-400 text-xl font-light">No gallery albums found yet.</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="album-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col"
            >
              <button 
                onClick={() => setSelectedAlbum(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-sky-500 font-bold uppercase tracking-wider text-sm mb-12 transition-colors w-fit"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Gallery
              </button>

              <div className="mb-16">
                <div className="flex items-center gap-3 text-sky-500 font-bold uppercase tracking-widest text-xs mb-4">
                  <Grid className="w-4 h-4" /> Event Photos
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4 uppercase leading-tight">
                  {selectedAlbum.title}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-slate-500">
                   <div className="flex items-center gap-2">
                     <Calendar className="w-5 h-5 text-slate-400" />
                     {new Date(selectedAlbum.date || selectedAlbum.created_at).toLocaleDateString()}
                   </div>
                   <div className="h-1.5 w-1.5 rounded-full bg-slate-300 hidden md:block"></div>
                   <p className="text-lg font-light italic">
                     {selectedAlbum.description}
                   </p>
                </div>
              </div>

              {fetchingImages ? (
                <div className="flex justify-center py-20">
                  <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="pb-20">
                   {albumImages.length > 0 ? (
                     <CircularGallery items={albumImages} autoplay={true} />
                   ) : (
                     <div className="py-20 text-center bg-white rounded-[3rem] border border-slate-200 shadow-sm">
                        <Image className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 text-xl font-light">This album has no images yet.</p>
                     </div>
                   )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
