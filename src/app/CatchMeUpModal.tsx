"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface BriefingItem {
  id: string;
  category: "action" | "opportunity" | "change" | "fyi";
  title: string;
  description: string;
  urgency: "high" | "medium" | "low";
  source: string;
}

const mockBriefing: BriefingItem[] = [
  {
    id: "1",
    category: "action",
    title: "Submit Data Structures Lab 3",
    description: "Deadline moved forward to tomorrow at 11:59 PM.",
    urgency: "high",
    source: "Official LMS Portal"
  },
  {
    id: "2",
    category: "opportunity",
    title: "AI Research Lab Openings",
    description: "Prof. Sharma's lab is accepting applications for first & second-years.",
    urgency: "medium",
    source: "Department Circular"
  },
  {
    id: "3",
    category: "change",
    title: "Midsem Exam Venue Shift",
    description: "CS201 exam moved from Room 102 to Lecture Hall Complex 1.",
    urgency: "high",
    source: "Academic Notice #402"
  },
  {
    id: "4",
    category: "fyi",
    title: "Library Extended Hours",
    description: "Central library will remain open 24/7 during midsems starting next week.",
    urgency: "low",
    source: "Student Welfare Board"
  }
];

export default function CatchMeUpModal({ isOpen, onClose }: Props) {
  const [filter, setFilter] = useState<string>("all");

  if (!isOpen) return null;

  const filteredItems = filter === "all" 
    ? mockBriefing 
    : mockBriefing.filter(item => item.category === filter);

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
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-400" /> Smart Briefing Engine
            </div>
            <h2 className="text-xl font-bold text-white">
              "Catch Me Up" Summary
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Here is what happened while you were away for the last 4 days, filtered by priority and relevance.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { id: "all", label: "All Updates" },
              { id: "action", label: "Action Required" },
              { id: "opportunity", label: "Opportunities" },
              { id: "change", label: "Schedule Changes" },
              { id: "fyi", label: "FYI" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer border ${
                  filter === tab.id
                    ? "bg-indigo-600 border-indigo-500 text-white"
                    : "bg-neutral-900 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Briefing List */}
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 space-y-2 hover:border-indigo-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border ${
                    item.category === 'action' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    item.category === 'opportunity' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    item.category === 'change' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-500">Source: {item.source}</span>
                </div>

                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
