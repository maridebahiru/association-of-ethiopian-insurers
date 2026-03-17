import { motion } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-24 bg-slate-50 relative z-10 border-t border-slate-200" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400">Touch</span>
            </h2>
            <p className="text-slate-600 text-xl font-light mb-10 max-w-md">
              Whether you have questions about membership, events, or industry data, we are here to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-sky-50 group-hover:border-sky-300 transition-all shadow-sm">
                  <MapPin className="w-5 h-5 text-sky-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-semibold mb-1">Office Address</h4>
                  <p className="text-slate-500 font-light">Infront of Meskel Square,<br />Ambessa building 7th floor.<br />Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-sky-50 group-hover:border-sky-300 transition-all shadow-sm">
                  <Phone className="w-5 h-5 text-sky-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-semibold mb-1">Phone Number</h4>
                  <p className="text-slate-500 font-light">(251) 115-503-985</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-sky-50 group-hover:border-sky-300 transition-all shadow-sm">
                  <Mail className="w-5 h-5 text-sky-500 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-slate-800 font-semibold mb-1">Email Address</h4>
                  <p className="text-slate-500 font-light">info@associationofethiopianinsurers.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SpotlightCard className="rounded-[2.5rem] border border-slate-200 bg-white p-8 md:p-10 flex flex-col shadow-xl">
              <h3 className="text-2xl font-bold mb-8 text-slate-800">Send us a message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors" />
                    <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors" />
                <textarea placeholder="How can we help?" rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-colors resize-none"></textarea>
                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 text-white font-bold text-lg hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2">
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
