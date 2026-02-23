import React, { useState } from 'react';
import { Droplets, MapPin, AlertTriangle, TrendingDown, Users, Ship, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const villageData = [
  { id: 1, name: "V-North", stress: 78, rain: -35, ground: 85, pop: "12,400", lat: 19.07, lng: 72.87, priority: "Critical" },
  { id: 2, name: "V-East", stress: 45, rain: -12, ground: 40, pop: "8,200", lat: 19.12, lng: 72.90, priority: "Moderate" },
  { id: 3, name: "V-South", stress: 92, rain: -55, ground: 120, pop: "15,000", lat: 18.93, lng: 72.83, priority: "Critical" },
  { id: 4, name: "V-West", stress: 20, rain: +5, ground: 15, pop: "5,100", lat: 19.03, lng: 72.81, priority: "Low" },
  { id: 5, name: "V-Central", stress: 65, rain: -20, ground: 55, pop: "22,000", lat: 19.05, lng: 72.85, priority: "High" },
  { id: 6, name: "V-Hills", stress: 55, rain: -15, ground: 30, pop: "3,400", lat: 19.15, lng: 72.95, priority: "Moderate" },
];

export default function App() {
  const [page, setPage] = useState('login');
  const [selectedVillage, setSelectedVillage] = useState(null);

  if (page === 'login') return <LoginPage onLogin={() => setPage('dashboard')} />;

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
            AQUA-GUARD AI
          </h1>
          <p className="text-slate-500 text-sm">District Monitoring Command</p>
        </div>
        <div className="bg-slate-800 p-2 rounded-full px-4 border border-slate-700 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold">LIVE SYSTEM</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {villageData.map((v) => (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedVillage(v)}
            key={v.id} 
            className="bg-slate-800/50 border border-slate-700 p-5 rounded-3xl cursor-pointer hover:border-cyan-500/50 transition-all shadow-xl backdrop-blur-md"
          >
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">{v.name}</h3>
              <span className={`text-[10px] px-2 py-1 rounded-full uppercase font-black ${v.stress > 70 ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                {v.priority}
              </span>
            </div>

            <div className="space-y-3">
              <Indicator label="Stress Index" value={`${v.stress}%`} icon={<AlertTriangle size={14}/>} color="text-orange-400" />
              <Indicator label="Rainfall Dev" value={`${v.rain}%`} icon={<TrendingDown size={14}/>} color="text-blue-400" />
              <Indicator label="Groundwater" value={`${v.ground}m`} icon={<Droplets size={14}/>} color="text-indigo-400" />
            </div>
            
            <button className="mt-5 w-full bg-slate-700 hover:bg-cyan-600 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2">
              VIEW ANALYSIS <ArrowRight size={14}/>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal (Simulating Village Detail Page) */}
      <AnimatePresence>
        {selectedVillage && (
          <DetailOverlay village={selectedVillage} onClose={() => setSelectedVillage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
function LoginPage({ onLogin }) {
  return (
    <div className="h-screen flex items-center justify-center bg-[#020617] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-purple-900/20 animate-pulse" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 bg-slate-900/80 p-10 rounded-[40px] border border-white/10 backdrop-blur-xl w-full max-w-md shadow-2xl text-center">
        <div className="w-20 h-20 bg-cyan-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.5)]">
          <Droplets size={40} className="text-white" />
        </div>
        <h2 className="text-4xl font-black text-white mb-2">Welcome Back</h2>
        <p className="text-slate-400 mb-8">Secure Access to District Water Governance</p>
        <input className="w-full bg-slate-800 border-none rounded-2xl py-4 px-6 mb-4 text-white placeholder:text-slate-600" placeholder="Operator ID" />
        <button onClick={onLogin} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-2xl transition-all shadow-lg shadow-cyan-500/20">
          INITIALIZE DASHBOARD
        </button>
      </motion.div>
    </div>
  );
}

function DetailOverlay({ village, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 p-6 flex items-center justify-center">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-3xl">
        <div className="p-8 md:w-1/2">
          <button onClick={onClose} className="text-slate-500 mb-4 font-bold hover:text-white transition-colors">← BACK</button>
          <h2 className="text-4xl font-black mb-6">{village.name} <span className="text-cyan-500 text-lg block font-normal">Predictive Analysis</span></h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
             <StatBox label="Population" val={village.pop} icon={<Users/>} />
             <StatBox label="Tankers Req." val={Math.ceil(village.stress / 15)} icon={<Ship/>} />
          </div>

          <div className="space-y-4">
             <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
                <p className="text-xs text-indigo-400 font-bold uppercase mb-1">AI Recommendation</p>
                <p className="text-sm">Priority allocation required. Deploy tankers via Route Alpha to avoid congestion near market square.</p>
             </div>
          </div>
        </div>
        <div className="bg-slate-800 md:w-1/2 min-h-[300px] flex items-center justify-center relative">
            <p className="text-slate-500 font-mono text-xs z-10">GOOGLE MAPS API INTEGRATION AREA<br/>[{village.lat}, {village.lng}]</p>
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.google.com/maps/vt/pb=!1m4!1m3!1i12!2i2421!3i1627!2m3!1e0!2sm!3i634123565!3m8!2sen!3sus!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1sfsy')] bg-cover" />
        </div>
      </div>
    </motion.div>
  );
}

function Indicator({ label, value, icon, color }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2 text-slate-400">
        {icon} <span>{label}</span>
      </div>
      <span className={`font-bold ${color}`}>{value}</span>
    </div>
  );
}

function StatBox({ label, val, icon }) {
  return (
    <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
      <div className="text-cyan-500 mb-2">{icon}</div>
      <p className="text-[10px] text-slate-500 uppercase font-bold">{label}</p>
      <p className="text-xl font-black">{val}</p>
    </div>
  );
}