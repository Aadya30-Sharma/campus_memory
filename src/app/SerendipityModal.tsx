"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Shuffle, ExternalLink } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const serendipityItems = [
  {
    id: 1,
    title: "Inter-College Fine Arts & Photography Exhibition",
    category: "Creative Arts",
    usualBubble: "You typically filter for Coding & Hackathons",
    reason: "Open to all branches. No prior portfolio required; beginner workshop included.",
    deadline: "In 2 days",
  },
  {
    id: 2,
    title: "Public Speaking & Parliamentary Debate Bootcamp",
    category: "Oratory",
    usualBubble: "You typically filter for Technical/Engineering logs",
    reason: "Great for building leadership DNA metrics. Cross-disciplinary peer network.",
    deadline: "Next week",
  },
  {
    id: 3,
    title: "Botany & Urban Farming Innovation Grant Pitch",
    category: "Environmental",
    usualBubble: "You typically filter for Software & AI projects",
    reason: "Cross-domain challenge looking for tech-backed IoT solutions. High cash prize.",
    deadline: "Friday",
  },
];

export default function SerendipityModal({ isOpen, onClose }: Props) {
  const [exploredId, setExploredId] = useState<number | null>(null);

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
            <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Shuffle className="w-4 h-4" /> Anti-Bubble Engine
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Serendipity & Discovery <Sparkles className="w-4 h-4 text-pink-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Deliberately surfacing high-value cross-domain opportunities outside your usual routine to expand your college DNA.
            </p>
          </div>

          <div className="space-y-3">
            {serendipityItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 hover:border-pink-500/30 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs text-amber-400 font-medium">Deadline: {item.deadline}</span>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-[11px] text-slate-400 italic mt-0.5">{item.usualBubble}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950 border border-white/5 text-xs text-slate-300">
                  <span className="text-pink-400 font-semibold">Why you are seeing this:</span> {item.reason}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setExploredId(item.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                      exploredId === item.id
                        ? "bg-emerald-600 text-white"
                        : "bg-pink-600 hover:bg-pink-500 text-white shadow-lg shadow-pink-600/20"
                    }`}
                  >
                    {exploredId === item.id ? (
                      <>Added to Horizon</>
                    ) : (
                      <>
                        Explore Opportunity <ExternalLink className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
