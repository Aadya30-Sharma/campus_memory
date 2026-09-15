"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Sparkles, CheckCircle2, UserPlus } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Peer {
  id: string;
  name: string;
  major: string;
  year: string;
  matchScore: number;
  skills: string[];
  availability: string;
}

const mockPeers: Peer[] = [
  {
    id: "1",
    name: "Aarav Mehta",
    major: "Computer Science",
    year: "Year 2",
    matchScore: 94,
    skills: ["PyTorch", "Systems", "React"],
    availability: "Free at 4:00 PM",
  },
  {
    id: "2",
    name: "Rohan Verma",
    major: "Electrical Engineering",
    year: "Year 3",
    matchScore: 88,
    skills: ["Algorithms", "C++", "Hardware"],
    availability: "Free tomorrow morning",
  },
  {
    id: "3",
    name: "Neha Gupta",
    major: "Design & Product",
    year: "Year 2",
    matchScore: 82,
    skills: ["Figma", "UI/UX", "User Research"],
    availability: "Free tonight",
  },
];

export default function PeerMatchModal({ isOpen, onClose }: Props) {
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleConnect = (id: string) => {
    setConnectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
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
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" /> Collaborative Intelligence
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Peer Matcher <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Connect with compatible study partners and hackathon teammates based on active schedules and complementary DNA.
            </p>
          </div>

          {/* Peer Cards */}
          <div className="space-y-3">
            {mockPeers.map((peer) => {
              const isConnected = connectedIds.includes(peer.id);
              return (
                <div
                  key={peer.id}
                  className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 flex items-center justify-between hover:border-purple-500/30 transition"
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{peer.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                        {peer.year} • {peer.major}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {peer.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-800 text-slate-300 border border-white/5 font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400">{peer.availability}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      {peer.matchScore}% Match
                    </span>
                    <button
                      onClick={() => toggleConnect(peer.id)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-medium transition flex items-center gap-1.5 cursor-pointer border ${
                        isConnected
                          ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                          : "bg-purple-600 hover:bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-600/20"
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" /> Connect
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
