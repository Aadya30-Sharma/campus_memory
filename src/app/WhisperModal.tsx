"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquareQuote, Flame, Heart, Send, ShieldAlert, Sparkles } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Whisper {
  id: string;
  content: string;
  category: "Academics" | "Hostel Life" | "Confessions" | "Placements";
  timestamp: string;
  reactions: { relatable: number; oof: number; fire: number };
}

const initialWhispers: Whisper[] = [
  {
    id: "1",
    content: "Is anyone else completely lost in the third module of Data Structures, or is it just me?",
    category: "Academics",
    timestamp: "12m ago",
    reactions: { relatable: 24, oof: 12, fire: 2 }
  },
  {
    id: "2",
    content: "The midnight chai at the campus tapri hits different during assignment week.",
    category: "Hostel Life",
    timestamp: "1h ago",
    reactions: { relatable: 45, oof: 3, fire: 19 }
  },
  {
    id: "3",
    content: "Managed to clear the technical round after 3 rejections. Never give up on the grind!",
    category: "Placements",
    timestamp: "3h ago",
    reactions: { relatable: 67, oof: 1, fire: 41 }
  }
];

export default function WhisperModal({ isOpen, onClose }: Props) {
  const [whispers, setWhispers] = useState<Whisper[]>(initialWhispers);
  const [newContent, setNewContent] = useState("");
  const [category, setCategory] = useState<Whisper["category"]>("Academics");
  const [activeTab, setActiveTab] = useState<"feed" | "sentiment">("feed");

  if (!isOpen) return null;

  const handlePostWhisper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newWhisper: Whisper = {
      id: Date.now().toString(),
      content: newContent,
      category,
      timestamp: "Just now",
      reactions: { relatable: 1, oof: 0, fire: 0 }
    };

    setWhispers([newWhisper, ...whispers]);
    setNewContent("");
  };

  const handleReact = (id: string, type: keyof Whisper["reactions"]) => {
    setWhispers(prev =>
      prev.map(w => {
        if (w.id === id) {
          return {
            ...w,
            reactions: { ...w.reactions, [type]: w.reactions[type] + 1 }
          };
        }
        return w;
      })
    );
  };

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
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <MessageSquareQuote className="w-4 h-4" /> Anonymous Bulletin
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Campus Whisper Network & Sentiment
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Zero-knowledge anonymous thoughts, secrets, and live mood analytics across campus.
            </p>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-2 mb-4 border-b border-white/10 pb-3">
            <button
              onClick={() => setActiveTab("feed")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeTab === "feed"
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20"
                  : "bg-neutral-900 border border-white/5 text-slate-400 hover:bg-neutral-800"
              }`}
            >
              Whisper Feed ({whispers.length})
            </button>
            <button
              onClick={() => setActiveTab("sentiment")}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                activeTab === "sentiment"
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20"
                  : "bg-neutral-900 border border-white/5 text-slate-400 hover:bg-neutral-800"
              }`}
            >
              Campus Sentiment Heatmap
            </button>
          </div>

          {activeTab === "feed" ? (
            <div className="space-y-4">
              {/* Post Input */}
              <form onSubmit={handlePostWhisper} className="p-3 rounded-2xl bg-neutral-900/80 border border-white/5 space-y-3">
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Drop an anonymous thought, study vent, or confession..."
                  rows={2}
                  className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none resize-none"
                />
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="bg-neutral-950 border border-white/10 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value="Academics">Academics</option>
                    <option value="Hostel Life">Hostel Life</option>
                    <option value="Confessions">Confessions</option>
                    <option value="Placements">Placements</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Broadcast Whisper
                  </button>
                </div>
              </form>

              {/* Whisper List */}
              <div className="space-y-3">
                {whispers.map((w) => (
                  <div key={w.id} className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                        {w.category}
                      </span>
                      <span className="text-[10px] text-slate-500">{w.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{w.content}</p>
                    <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
                      <button
                        onClick={() => handleReact(w.id, "relatable")}
                        className="flex items-center gap-1 hover:text-rose-400 transition cursor-pointer bg-neutral-950 px-2.5 py-1 rounded-lg border border-white/5"
                      >
                        <Heart className="w-3 h-3 text-rose-500" /> {w.reactions.relatable} Relatable
                      </button>
                      <button
                        onClick={() => handleReact(w.id, "oof")}
                        className="flex items-center gap-1 hover:text-amber-400 transition cursor-pointer bg-neutral-950 px-2.5 py-1 rounded-lg border border-white/5"
                      >
                        <ShieldAlert className="w-3 h-3 text-amber-500" /> {w.reactions.oof} Oof
                      </button>
                      <button
                        onClick={() => handleReact(w.id, "fire")}
                        className="flex items-center gap-1 hover:text-orange-400 transition cursor-pointer bg-neutral-950 px-2.5 py-1 rounded-lg border border-white/5"
                      >
                        <Flame className="w-3 h-3 text-orange-500" /> {w.reactions.fire} 🔥
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Overall Campus Mood Index</span>
                  <span className="text-xs text-rose-400 font-mono">⚡ 78% High Voltage</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-slate-400">
                      <span>Exam & Deadline Panic</span>
                      <span className="text-rose-400">84%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 w-[84%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-slate-400">
                      <span>Placement Excitement</span>
                      <span className="text-emerald-400">65%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[65%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-slate-400">
                      <span>Caffeine Dependency</span>
                      <span className="text-amber-400">92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[92%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
