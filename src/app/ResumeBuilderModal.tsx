"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Copy, Check, Sparkles } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activities: any[];
}

export default function ResumeBuilderModal({ isOpen, onClose, activities }: Props) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Transform logged campus activities into STAR format resume bullets
  const starBullets = activities.map((act) => ({
    title: act.title,
    year: `Year ${act.year}`,
    bullet: `Spearheaded "${act.title}" (${act.description}), optimizing system workflows and driving cross-functional collaboration within the campus ecosystem.`
  }));

  const handleCopyAll = () => {
    const textToCopy = starBullets.map(b => `• ${b.title} (${b.year}):\n  - ${b.bullet}`).join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4 text-purple-400" /> Career & Portfolio Engine
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              STAR Resume Builder <Sparkles className="w-4 h-4 text-indigo-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Automatically compiles your 4-year timeline stream into polished, recruiter-ready STAR bullet points.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center mb-4 bg-neutral-900/60 p-3 rounded-2xl border border-white/5">
            <span className="text-xs text-slate-300 font-medium">
              {starBullets.length} Timeline Milestones Converted
            </span>
            <button
              onClick={handleCopyAll}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied to Clipboard!" : "Copy Master Resume Text"}</span>
            </button>
          </div>

          {/* Bullets List */}
          <div className="space-y-3">
            {starBullets.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">
                No timeline memories logged yet! Add some milestones in your timeline stream first.
              </p>
            ) : (
              starBullets.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 space-y-2 hover:border-indigo-500/30 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{item.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono bg-neutral-950 p-2.5 rounded-xl border border-white/5">
                    • {item.bullet}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
