"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Sparkles, Trophy, Briefcase, GraduationCap } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [
  {
    year: "Year 1",
    subtitle: "The Beginning",
    icon: Sparkles,
    highlight: "Stepping into the unknown",
    stats: "3 hackathons entered • 2 clubs explored • First Linux build",
    quote: "You started curious about code, figuring out classrooms and finding your circle."
  },
  {
    year: "Year 2",
    subtitle: "Finding Your Place",
    icon: Trophy,
    highlight: "HackDelhi Winner & Club Tech Lead",
    stats: "6 sub-team developers managed • Computer Vision prototype shipped",
    quote: "Your College DNA pivoted toward Product & Leadership."
  },
  {
    year: "Year 3",
    subtitle: "Building Something Real",
    icon: Briefcase,
    highlight: "Undergrad Research & SDE Offer",
    stats: "1 edge AI paper • Summer internship locked",
    quote: "Theoretical work turned into production-grade systems."
  },
  {
    year: "Year 4",
    subtitle: "The Last Chapter",
    icon: GraduationCap,
    highlight: "Full-Time Offer & Master Capstone",
    stats: "1,462 days logged • 23 projects • 1 cohesive journey",
    quote: "You entered as a student. You graduate as an engineer."
  }
];

export default function MemoryVaultModal({ isOpen, onClose }: Props) {
  const [current, setCurrent] = useState(0);

  if (!isOpen) return null;

  const ActiveIcon = slides[current].icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-neutral-950 p-8 shadow-2xl text-slate-100 overflow-hidden"
        >
          {/* Progress Bars */}
          <div className="flex gap-2 mb-6">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  idx <= current ? "bg-indigo-500" : "bg-neutral-800"
                }`}
              />
            ))}
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Slide Content */}
          <div className="space-y-4 my-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              <ActiveIcon className="w-4 h-4" />
              {slides[current].year} • {slides[current].subtitle}
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              {slides[current].highlight}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-indigo-500/40 pl-3">
              "{slides[current].quote}"
            </p>

            <div className="p-3.5 rounded-xl bg-neutral-900 border border-white/5 text-xs text-slate-400 font-mono">
              {slides[current].stats}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <button
              onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
              disabled={current === 0}
              className="p-2 rounded-lg border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs text-slate-500">
              {current + 1} of {slides.length}
            </span>

            {current < slides.length - 1 ? (
              <button
                onClick={() => setCurrent((prev) => Math.min(slides.length - 1, prev + 1))}
                className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition"
              >
                Done
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}