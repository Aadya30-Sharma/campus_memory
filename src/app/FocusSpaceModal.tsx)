"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Timer, Users, Volume2, Play, Pause, RotateCcw, CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface StudyRoom {
  id: string;
  name: string;
  location: string;
  occupancy: number; // percentage
  noiseLevel: "Silent" | "Moderate" | "Collaborative";
  amenities: string[];
}

const rooms: StudyRoom[] = [
  { id: "1", name: "Central Library Silent Zone", location: "Block A, Level 3", occupancy: 85, noiseLevel: "Silent", amenities: ["AC", "Power Outlets", "Individual Desks"] },
  { id: "2", name: "CS Collaborative Pod 4", location: "Tech Quad, Level 2", occupancy: 40, noiseLevel: "Collaborative", amenities: ["Whiteboard", "Dual Monitors", "HDMI"] },
  { id: "3", name: "Graduate Reading Room", location: "Admin Block, Level 1", occupancy: 20, noiseLevel: "Silent", amenities: ["Ergonomic Chairs", "Warm Lighting", "Coffee Vending"] }
];

export default function FocusSpaceModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"rooms" | "timer">("rooms");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Timer className="w-4 h-4" /> Deep Work & Spaces
            </div>
            <h2 className="text-xl font-bold text-white">Focus Space & Co-Working Radar</h2>
            <p className="text-xs text-slate-400 mt-1">
              Locate distraction-free study pods, check live noise levels, and run synchronization focus sessions.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab("rooms")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeTab === "rooms"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "bg-neutral-900 border border-white/5 text-slate-400 hover:bg-neutral-800"
              }`}
            >
              Live Room Radar ({rooms.length})
            </button>
            <button
              onClick={() => setActiveTab("timer")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeTab === "timer"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "bg-neutral-900 border border-white/5 text-slate-400 hover:bg-neutral-800"
              }`}
            >
              Pomodoro Co-Working Pod
            </button>
          </div>

          {activeTab === "rooms" ? (
            <div className="space-y-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    selectedRoom === room.id
                      ? "bg-emerald-950/30 border-emerald-500/50"
                      : "bg-neutral-900/60 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-white">{room.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      room.noiseLevel === "Silent" 
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {room.noiseLevel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{room.location}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/5">
                    <div className="flex gap-2">
                      {room.amenities.map((amenity, idx) => (
                        <span key={idx} className="bg-neutral-950 px-2 py-0.5 rounded text-[10px] text-slate-400 border border-white/5">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <span className="text-emerald-400 font-mono">{room.occupancy}% Occupied</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-6 bg-neutral-900/50 rounded-2xl border border-white/5 p-6">
              <div className="text-center space-y-1">
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">Deep Focus Session</span>
                <div className="text-5xl font-extrabold font-mono tracking-wider text-white">
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? "Pause Session" : "Start Focus Run"}
                </button>
                <button
                  onClick={() => { setIsRunning(false); setTimeLeft(25 * 60); }}
                  className="bg-neutral-800 hover:bg-neutral-700 text-slate-300 p-2.5 rounded-xl transition cursor-pointer border border-white/10"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center max-w-xs">
                Completing this session logs verified focus hours into your College DNA technical and study metrics.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
