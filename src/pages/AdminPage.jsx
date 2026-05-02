import { useState, useEffect } from "react";
import BlurText from "../components/BlurText";
import { supabase } from "../lib/supabase";


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("news");
  
  // Data states
  const [news, setNews] = useState([]);
  const [proclamations, setProclamations] = useState([]);
  const [publications, setPublications] = useState([]);
  const [albums, setAlbums] = useState([]);

  // Fetch initial data
  const fetchData = async () => {
    try {
      if (activeTab === "news") {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("date", { ascending: false });
        if (error) throw error;
        setNews(data);
      } else if (activeTab === "proclamations" || activeTab === "publications") {
        const category = activeTab === "proclamations" ? "proclamation" : "publication";
        const { data, error } = await supabase
          .from("documents")
          .select("*")
          .eq("category", category)
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        if (activeTab === "proclamations") setProclamations(data);
        else setPublications(data);
      } else if (activeTab === "gallery") {
        const { data, error } = await supabase
          .from("gallery_albums")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setAlbums(data);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id, category) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      if (category === "news") {
        // 1. Get the record to find the cover image path
        const { data: item } = await supabase.from("news").select("cover_image").eq("id", id).single();
        
        if (item && item.cover_image && !item.cover_image.startsWith('http')) {
          // 2. Delete from storage if it's a relative path (managed by us)
          const fileName = item.cover_image.split('/').pop();
          await supabase.storage.from("news").remove([fileName]);
        }

        // 3. Delete from database
        await supabase.from("news").delete().eq("id", id);
      } else if (category === "proclamations" || category === "publications") {
        // ... (existing documents logic)
        const { data: item } = await supabase.from("documents").select("file_path, category").eq("id", id).single();
        
        if (item) {
          const bucket = item.category === "proclamation" ? "proclamations" : "publications";
          await supabase.storage.from(bucket).remove([item.file_path]);
        }

        await supabase.from("documents").delete().eq("id", id);
      } else if (category === "gallery") {
        // Delete album images first
        const { data: images } = await supabase.from("gallery_images").select("image_url").eq("album_id", id);
        if (images && images.length > 0) {
          const fileNames = images.map(img => img.image_url.split('/').pop());
          await supabase.storage.from("gallery").remove(fileNames);
          await supabase.from("gallery_images").delete().eq("album_id", id);
        }
        // Delete album cover
        const { data: album } = await supabase.from("gallery_albums").select("cover_image_url").eq("id", id).single();
        if (album && album.cover_image_url) {
           const coverName = album.cover_image_url.split('/').pop();
           await supabase.storage.from("gallery").remove([coverName]);
        }
        await supabase.from("gallery_albums").delete().eq("id", id);
      }
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col bg-slate-50">
      <BlurText 
        text="Admin Panel" 
        delay={50} 
        className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400 tracking-tight mb-8 inline-block"
      />

      <div className="flex space-x-4 mb-8">
        {["news", "proclamations", "publications", "gallery"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all ${
              activeTab === tab 
                ? "bg-sky-500 text-white shadow-lg" 
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 capitalize leading-tight">
          Manage {activeTab}
        </h2>
        
        {activeTab === "news" && <NewsForm onSuccess={fetchData} />}
        {activeTab === "proclamations" && <ProclamationsForm onSuccess={fetchData} />}
        {activeTab === "publications" && <PublicationsForm onSuccess={fetchData} />}
        {activeTab === "gallery" && <GalleryManagement albums={albums} onSuccess={fetchData} />}
        
        <div className="mt-12">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Existing {activeTab}</h3>
          
          <div className="space-y-4">
            {activeTab === "news" && news.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
                 <div>
                   <p className="font-bold text-slate-800">{item.title}</p>
                   <p className="text-sm text-slate-500">{item.date}</p>
                 </div>
                 <button onClick={() => handleDelete(item.id, "news")} className="text-red-500 hover:bg-red-50 p-2 rounded-lg font-bold">Delete</button>
              </div>
            ))}

             {activeTab === "proclamations" && proclamations.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
                 <div>
                   <p className="font-bold text-slate-800">{item.title}</p>
                   <div className="flex items-center gap-4 text-sm mt-1">
                     <p className="text-slate-500">{new Date(item.created_at).toLocaleDateString()}</p>
                     {item.file_url && <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">View PDF</a>}
                   </div>
                 </div>
                 <button onClick={() => handleDelete(item.id, "proclamations")} className="text-red-500 hover:bg-red-50 p-2 rounded-lg font-bold">Delete</button>
              </div>
            ))}

            {activeTab === "publications" && publications.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
                 <div>
                   <p className="font-bold text-slate-800">{item.title}</p>
                   <div className="flex items-center gap-4 text-sm mt-1">
                     <p className="text-slate-500">{new Date(item.created_at).toLocaleDateString()}</p>
                     {item.file_url && <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">View PDF</a>}
                   </div>
                 </div>
                 <button onClick={() => handleDelete(item.id, "publications")} className="text-red-500 hover:bg-red-50 p-2 rounded-lg font-bold">Delete</button>
              </div>
            ))}

            {activeTab === "gallery" && albums.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
                 <div>
                   <p className="font-bold text-slate-800">{item.title}</p>
                   <p className="text-sm text-slate-500">{new Date(item.date || item.created_at).toLocaleDateString()}</p>
                 </div>
                 <button onClick={() => handleDelete(item.id, "gallery")} className="text-red-500 hover:bg-red-50 p-2 rounded-lg font-bold">Delete Album</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// --- FORM COMPONENTS ---

function NewsForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const content = formData.get("content");
    const date = formData.get("date");
    const isExternal = formData.get("isExternal") === "true";
    const externalUrl = formData.get("externalUrl");
    const coverImageFile = formData.get("coverImage");

    try {
      let coverImageUrl = null;

      if (coverImageFile && coverImageFile.size > 0) {
        const fileName = `${Date.now()}-${coverImageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("news")
          .upload(fileName, coverImageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("news")
          .getPublicUrl(fileName);
        
        coverImageUrl = publicUrl;
      }

      const { error: dbError } = await supabase.from("news").insert({
        title,
        content,
        date,
        is_external: isExternal,
        external_url: externalUrl,
        cover_image: coverImageUrl
      });

      if (dbError) throw dbError;

      e.target.reset();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error adding news: " + err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <input type="text" name="title" placeholder="News Title" required className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-800" />
      <textarea name="content" placeholder="Content/Description" className="w-full p-3 bg-white border border-slate-200 rounded-xl min-h-[100px] text-slate-800" />
      <input type="date" name="date" required className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-800" />
      <div className="flex gap-4 items-center">
        <label className="text-slate-600 font-medium">Cover Image:</label>
        <input type="file" name="coverImage" accept="image/*" className="border border-slate-200 rounded-xl p-2 bg-slate-50 text-slate-800" />
      </div>
      <div className="flex items-center gap-2">
         <input type="checkbox" name="isExternal" value="true" />
         <span className="text-slate-600">Is this an external link?</span>
      </div>
      <input type="text" name="externalUrl" placeholder="External URL (if applicable)" className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-800" />
      <button disabled={loading} type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold text-lg hover:shadow-lg transition-all active:scale-95 disabled:opacity-50">
        {loading ? "Adding..." : "Add News"}
      </button>
    </form>
  )
}

function ProclamationsForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const file = formData.get("file");
    const title = formData.get("title");

    if (!file) return;

    try {
      // 1. Upload to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("proclamations")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("proclamations")
        .getPublicUrl(fileName);

      // 3. Save metadata to database
      const { error: dbError } = await supabase.from("documents").insert({
        title,
        file_url: publicUrl,
        file_path: fileName,
        category: "proclamation",
      });

      if (dbError) throw dbError;

      e.target.reset();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error adding proclamation: " + err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <input type="text" name="title" placeholder="Proclamation/Directive Title" required className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-800" />
      <div className="flex gap-4 items-center">
        <label className="text-slate-600 font-medium">PDF Document:</label>
        <input type="file" name="file" accept=".pdf" required className="border border-slate-200 rounded-xl p-2 bg-slate-50 text-slate-800" />
      </div>
      <button disabled={loading} type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold text-lg hover:shadow-lg transition-all active:scale-95 disabled:opacity-50">
        {loading ? "Adding..." : "Add Proclamation"}
      </button>
    </form>
  )
}

function PublicationsForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const file = formData.get("file");
    const title = formData.get("title");

    if (!file) return;

    try {
      // 1. Upload to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("publications")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("publications")
        .getPublicUrl(fileName);

      // 3. Save metadata to database
      const { error: dbError } = await supabase.from("documents").insert({
        title,
        file_url: publicUrl,
        file_path: fileName,
        category: "publication",
      });

      if (dbError) throw dbError;

      e.target.reset();
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error adding publication: " + err.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <input type="text" name="title" placeholder="Publication Title" required className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-800" />
      <div className="flex gap-4 items-center">
        <label className="text-slate-600 font-medium whitespace-nowrap min-w-[120px]">PDF Document:</label>
        <input type="file" name="file" accept=".pdf" required className="w-full border border-slate-200 rounded-xl p-2 bg-slate-50 text-slate-800" />
      </div>
      <button disabled={loading} type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold text-lg hover:shadow-lg transition-all active:scale-95 disabled:opacity-50">
        {loading ? "Adding..." : "Add Publication"}
      </button>
    </form>
  )
}

function GalleryManagement({ albums, onSuccess }) {
  const [selectedAlbumId, setSelectedAlbumId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const date = formData.get("date");
    const description = formData.get("description");
    const coverFile = formData.get("cover");

    try {
      let coverUrl = "";
      if (coverFile) {
        const fileName = `${Date.now()}-${coverFile.name}`;
        await supabase.storage.from("gallery").upload(fileName, coverFile);
        coverUrl = supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl;
      }

      await supabase.from("gallery_albums").insert({ title, date, description, cover_image_url: coverUrl });
      e.target.reset();
      onSuccess();
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  const handleUploadImages = async (e) => {
    e.preventDefault();
    if (!selectedAlbumId) return alert("Select an album first");
    setLoading(true);
    const files = e.target.images.files;
    
    try {
      for (let file of files) {
        const fileName = `${Date.now()}-${file.name}`;
        await supabase.storage.from("gallery").upload(fileName, file);
        const url = supabase.storage.from("gallery").getPublicUrl(fileName).data.publicUrl;
        await supabase.from("gallery_images").insert({ album_id: selectedAlbumId, image_url: url });
      }
      e.target.reset();
      alert("Images uploaded successfully!");
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Create Album */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-slate-700">Create New Event Album</h3>
          <form onSubmit={handleCreateAlbum} className="space-y-4">
            <input type="text" name="title" placeholder="Album Title (e.g. 21st AGM)" required className="w-full p-3 border border-slate-200 rounded-xl" />
            <input type="date" name="date" required className="w-full p-3 border border-slate-200 rounded-xl" />
            <textarea name="description" placeholder="Short description..." className="w-full p-3 border border-slate-200 rounded-xl" />
            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-500 uppercase">Cover Image</label>
               <input type="file" name="cover" accept="image/*" required className="p-2 border border-slate-200 rounded-xl bg-slate-50" />
            </div>
            <button disabled={loading} className="w-full py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-all">Create Album</button>
          </form>
        </div>

        {/* Upload Images */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-slate-700">Add Images to Album</h3>
          <form onSubmit={handleUploadImages} className="space-y-4">
            <select 
              value={selectedAlbumId} 
              onChange={(e) => setSelectedAlbumId(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl"
              required
            >
              <option value="">Select Album...</option>
              {albums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
            <div className="flex flex-col gap-2">
               <label className="text-sm font-bold text-slate-500 uppercase">Select Multiple Images</label>
               <input type="file" name="images" accept="image/*" multiple required className="p-2 border border-slate-200 rounded-xl bg-slate-50" />
            </div>
            <button disabled={loading} className="w-full py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition-all">Upload Images</button>
          </form>
        </div>
      </div>
    </div>
  );
}
