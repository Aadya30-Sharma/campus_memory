"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Briefcase, Send, CheckCircle2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Alumni {
  id: string;
  name: string;
  batch: string;
  role: string;
  company: string;
  avatarColor: string;
  tags: string[];
}

const alumniData: Alumni[] = [
  {
    id: "1",
    name: "Rohan Verma",
    batch: "Batch of 2022",
    role: "Associate Consultant",
    company: "McKinsey & Company",
    avatarColor: "from-blue-500 to-indigo-600",
    tags: ["Strategy", "MBA Prep", "Case Studies"]
  },
  {
    id: "2",
    name: "Priya Sharma",
    batch: "Batch of 2021",
    role: "Senior Product Manager",
    company: "Google",
    avatarColor: "from-purple-500 to-pink-600",
    tags: ["Product", "Tech", "System Design"]
  },
  {
    id: "3",
    name: "Aditya Rao",
    batch: "Batch of 2023",
    role: "Quantitative Researcher",
    company: "Jane Street",
    avatarColor: "from-emerald-500 to-teal-600",
    tags: ["Quant", "Algorithms", "Mathematics"]
  }
];

export default function AlumniNetworkModal({ isOpen, onClose }: Props) {
  const [filter, setFilter] = useState("All");
  const [requestedId, setRequestedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredAlumni = filter === "All" 
    ? alumniData 
    : alumniData.filter(a => a.tags.includes(filter) || a.company.toLowerCase().includes(filter.toLowerCase()));

  const handleConnect = (id: string) => {
    setRequestedId(id);
    setTimeout(() => setRequestedId(null), 3000);
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
              <Briefcase className="w-4 h-4" /> Career Trajectory & Referrals
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Alumni Network Radar <Sparkles className="w-4 h-4 text-purple-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Connect with distinguished alumni across top-tier consulting, tech, and quantitative firms.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {["All", "Consulting", "Tech", "Google", "McKinsey", "Quant"].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  filter === tag
                    ? "bg-purple-600 text-white"
                    : "bg-neutral-900 border border-white/5 text-slate-400 hover:bg-neutral-800"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Alumni List */}
          <div className="space-y-3">
            {filteredAlumni.map((alum) => (
              <div
                key={alum.id}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${alum.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg`}>
                    {alum.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-white">{alum.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono">{alum.batch}</span>
                    </div>
                    <p className="text-xs text-purple-300 font-medium">{alum.role} at <span className="text-white font-semibold">{alum.company}</span></p>
                    <div className="flex gap-1.5 mt-2">
                      {alum.tags.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleConnect(alum.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    requestedId === alum.id
                      ? "bg-emerald-600 text-white"
                      : "bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30"
                  }`}
                >
                  {requestedId === alum.id ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Request Sent
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Request Referral
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
