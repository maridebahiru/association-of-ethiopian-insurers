import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-24 bg-[#020202] relative z-10 border-t border-white/5" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">Touch</span>
            </h2>
            <p className="text-white/50 text-xl font-light mb-10 max-w-md">
              Whether you have questions about membership, events, or industry data, we are here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all shadow-lg">
                  <MapPin className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Office Address</h4>
                  <p className="text-white/50 font-light">Infront of Meskel Square,<br />Ambessa building 7th floor.<br />Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all shadow-lg">
                  <Phone className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone Number</h4>
                  <p className="text-white/50 font-light">(251) 115-503-985</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all shadow-lg">
                  <Mail className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email Address</h4>
                  <p className="text-white/50 font-light">info@associationofethiopianinsurers.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SpotlightCard className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 md:p-10 flex flex-col shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-white">Send us a message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-colors" />
                    <input type="text" placeholder="Last Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-colors" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-colors" />
                <textarea placeholder="How can we help?" rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 focus:bg-white/10 transition-colors resize-none"></textarea>
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 mt-2">
                  <Send className="w-5 h-5" /> Submit Request
                </button>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
