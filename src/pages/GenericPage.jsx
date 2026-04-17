import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import BlurText from "../components/BlurText";
import SpotlightCard from "../components/SpotlightCard";
import TiltedScroll from "../components/TiltedScroll";
import Masonry from "../components/Masonry";
import AnimatedList from "../components/AnimatedList";

const PAGE_DATA = {
  "/about": {
    title: "About Us",
    subtitle: "Discover the driving force behind the Association of Ethiopian Insurers.",
    content: [
      "The Association of Ethiopian Insurers (AEI) is dedicated to protecting, promoting, and advancing the common interests of members and the insurance industry.",
      "We act as a medium of consultation and communication with the National Bank of Ethiopia (The regulator) and the Government.",
      "We provide a forum for and promote closer relationships, understanding, agreement, and cooperation among Members on matters of mutual interest.",
      "We collect, compile, and distribute amongst members statistical, technical, commercial, and other information and data of interest to Members."
    ]
  },
  "/members": {
    title: "Our Members",
    subtitle: "A united front of industry leaders driving Ethiopia's insurance landscape.",
    content: [
      "We bring the Ethiopian insurance industry together. Our members include all major insurance providers operating within Ethiopia, creating a robust network of expertise.",
      "Membership provides access to exclusive industry insights, advocacy, and collaborative growth opportunities."
    ],
    tiltedItems: [
      { name: "Awash Insurance", role: "Founding Member" }, 
      { name: "Nyala Insurance", role: "Premium Member" }, 
      { name: "United Insurance", role: "Corporate Member" }, 
      { name: "Nib Insurance", role: "Premium Member" }, 
      { name: "Oromia Insurance", role: "Executive Member" }, 
      { name: "Zemen Insurance", role: "Board Member" }
    ]
  },
  "/board-of-directors": {
    title: "Board of Directors",
    subtitle: "The visionary leadership charting the course for the AEI.",
    content: [
      "Our Board of Directors comprises seasoned professionals and executives from across member organizations.",
      "They ensure that AEI remains steadfast in its mission to uphold standards, compliance, and mutual growth within the sector."
    ],
    tiltedItems: [
      { name: "Mr. Yared Mola", role: "President" },
      { name: "Mr. Abel Tadesse", role: "V/President" },
      { name: "Mrs. Meseret Bezabih", role: "Member" },
      { name: "Mrs. Zufan Abebe", role: "Member" },
      { name: "Mr. Jibat Alemneh", role: "Member" },
      { name: "Mr. Dagnachew Mehari", role: "Member" },
      { name: "Mr. Nigus Anteneh", role: "Member" },
      { name: "Mrs. Emebet Alemayehu", role: "Secretary-General" }
    ]
  },
  "/news": {
    title: "Industry News",
    subtitle: "The latest updates on Ethiopia's evolving insurance market.",
    content: [
      "Stay informed with up-to-date press releases, regulatory changes, and economic trends impacting the Ethiopian insurance landscape."
    ]
  },
  "/announcements": {
    title: "Announcements",
    subtitle: "Official notices and general assemblies.",
    content: [
      "AEI Gives Recognition of a Lifetime Achievement Award.",
      "21st Annual General Meeting Highlights.",
      "Workshop Prepared by AEI in Collaboration with ERC."
    ]
  },
  "/proclamations": {
    title: "Proclamations & Directives",
    subtitle: "Essential regulatory frameworks.",
    content: [
      "Access the latest regulatory frameworks governing insurance in Ethiopia. These directives ensure fair practices, transparency, and consumer protection across all providers."
    ]
  },
  "/publications": { title: "Publications", subtitle: "In-depth reports and industry journals.", content: ["Download our latest annual reports and industry journals."] },
  "/industry-data": { title: "Industry Data", subtitle: "Data-driven insights for strategic growth.", content: ["Review statistical analytics, market penetration rates, and financial reports from the expanding local market."] },
  "/glossary": { title: "Insurance Glossary", subtitle: "Demystifying insurance terminology.", content: ["A comprehensive dictionary of key insurance terms to help consumers and professionals navigate the industry."] },
  "/articles": { title: "Articles", subtitle: "Expert opinions and analyses.", content: ["Read thought-leadership pieces covering risk management, modern insurance tech, and market forecasts."] },
  "/faq": { title: "FAQ", subtitle: "Frequently Asked Questions", content: ["Find answers to common questions about membership benefits, licensing, and insurance policies."] },
  "/gallery": { 
    title: "Gallery", 
    subtitle: "Moments from our latest events, meetings, and conferences.", 
    content: [
      "Browse photos from our YIPP Trainees awards, general meetings, and workshops reflecting the vibrant culture of our association."
    ],
    galleryImages: [
      { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800", caption: "21st Annual General Meeting", alt: "Business conference" },
      { src: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800", caption: "Networking Session", alt: "People interacting casually at event" },
      { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800", caption: "Workshop by AEI & ERC", alt: "Workshop presenting data" },
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", caption: "Lifetime Achievement Award", alt: "Event stage lights" },
      { src: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=800", caption: "YIPP Trainees Ceremony", alt: "Group photo of young professionals" },
      { src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800", caption: "Executive Board Meet", alt: "Meeting room discussion" }
    ]
  },
  "/contact": { title: "Contact Us", subtitle: "Get in touch with the AEI.", content: ["Address: In front of Meskel Square, Ambessa building 7th floor.", "Email: info@associationofethiopianinsurers.com", "Phone: (251) 115-503-985", "Reach out to us for membership inquiries, press information, or general questions."] },
};

export default function GenericPage() {
  const location = useLocation();
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchDynamicData = async () => {
      if (location.pathname === "/proclamations" || location.pathname === "/publications") {
        try {
          const endpoint = location.pathname.substring(1);
          const res = await fetch(`http://localhost:5000/api/${endpoint}`);
          const data = await res.json();
          setFetchedData(data);
        } catch (error) {
          console.error(`Failed to fetch ${location.pathname} data`, error);
        }
      } else {
        setFetchedData([]);
      }
    };
    fetchDynamicData();
  }, [location.pathname]);
  const data = PAGE_DATA[location.pathname] || {
    title: "Welcome",
    subtitle: "Explore the Association of Ethiopian Insurers.",
    content: ["Please select a tab from the navigation menu to view more details."]
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col bg-slate-50">
      <div className="mb-16">
        <BlurText 
          text={data.title} 
          delay={50} 
          className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400 tracking-tight mb-4"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-500 font-light max-w-3xl"
        >
          {data.subtitle}
        </motion.p>
      </div>

      <div className={`flex-1 flex flex-col gap-16`}>
        {/* Text Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            {data.content.map((paragraph, i) => (
              <p key={i} className="text-slate-700 leading-relaxed text-lg font-light">
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* Contact Form Special Logic */}
          {location.pathname === "/contact" && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="w-full"
            >
              <SpotlightCard className="rounded-3xl border border-slate-200 bg-white p-10 flex flex-col shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-bold mb-6 text-slate-800">Send us a message</h3>
                <input type="text" placeholder="Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors" />
                <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors" />
                <textarea placeholder="Message" rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors resize-none"></textarea>
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold text-lg hover:shadow-lg transition-all active:scale-95">Send Request</button>
              </SpotlightCard>
            </motion.div>
          )}
        </div>

        {/* Dynamic Interactive Render */}
        <div className="w-full mt-8">
          {data.tiltedItems && (
            <div className="pb-10">
               <TiltedScroll items={data.tiltedItems} />
            </div>
          )}

          {(location.pathname === "/proclamations" || location.pathname === "/publications") && fetchedData.length > 0 && (
            <div className="w-full pb-10 max-w-4xl mx-auto">
              <AnimatedList
                items={fetchedData}
                onItemSelect={(item) => {
                  if (item && item.fileUrl) {
                    window.open(`http://localhost:5000${item.fileUrl}`, '_blank');
                  }
                }}
                showGradients
                enableArrowNavigation
                displayScrollbar
              />
            </div>
          )}

          {data.galleryImages && (
            <div className="pb-10 min-h-[500px]">
               <Masonry images={data.galleryImages} columns={3} gap={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
