"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Compass, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type TrackKey = "ai" | "product" | "quant" | "startup";

interface RoadmapStep {
  semester: string;
  focus: string;
  milestone: string;
}

const paths: Record<TrackKey, { title: string; subtitle: string; steps: RoadmapStep[] }> = {
  ai: {
    title: "AI Research & Deep Tech Track",
    subtitle: "Targeting top-tier AI labs, masters/PhD admissions, or R&D engineering roles.",
    steps: [
      { semester: "Year 1 - Sem 2", focus: "Mathematical Foundation", milestone: "Master Linear Algebra & complete introductory Python ML projects." },
      { semester: "Year 2 - Sem 1", focus: "Lab Integration", milestone: "Secure undergraduate research assistantship with Prof. Sharma." },
      { semester: "Year 2 - Sem 2", focus: "Core Paper Reading", milestone: "Reproduce a baseline Transformer architecture paper from scratch." },
      { semester: "Year 3 - Sem 1", focus: "Publication / Open Source", milestone: "Submit workshop paper or release high-impact GitHub repository." }
    ]
  },
  product: {
    title: "Product Management & Strategy Track",
    subtitle: "Targeting elite consulting firms, APM roles, and tech leadership.",
    steps: [
      { semester: "Year 1 - Sem 2", focus: "Campus Leadership", milestone: "Take charge of operations or design in a major campus fest." },
      { semester: "Year 2 - Sem 1", focus: "User Metrics & Case Studies", milestone: "Participate in national corporate case competitions and hackathons." },
      { semester: "Year 2 - Sem 2", focus: "Tech Product Internship", milestone: "Secure summer intern role focusing on product feature ownership." },
      { semester: "Year 3 - Sem 1", focus: "Capstone Strategy", milestone: "Launch a student-facing campus utility with 1,000+ active users." }
    ]
  },
  quant: {
    title: "Quantitative Finance & Systems Track",
    subtitle: "Targeting high-frequency trading (HFT) firms and algorithmic trading roles.",
    steps: [
      { semester: "Year 1 - Sem 2", focus: "Advanced Data Structures", milestone: "Solve 300+ LeetCode problems, focusing on graphs and low-level memory." },
      { semester: "Year 2 - Sem 1", focus: "Probability & Stochastic Calculus", milestone: "Take advanced math electives and competitive programming streams." },
      { semester: "Year 2 - Sem 2", focus: "C++ Optimization", milestone: "Build high-performance matching engines and latency benchmarks." },
      { semester: "Year 3 - Sem 1", focus: "Prop Trading Internships", milestone: "Apply for quant developer roles with rigorous systems testing." }
    ]
  },
  startup: {
    title: "Founder & Venture Builder Track",
    subtitle: "Targeting venture-backed entrepreneurship and zero-to-one product building.",
    steps: [
      { semester: "Year 1 - Sem 2", focus: "Rapid Prototyping", milestone: "Ship 3 full-stack hackathon projects in 3 months." },
      { semester: "Year 2 - Sem 1", focus: "Distribution & Community", milestone: "Grow a student community of 500+ developers around your open tool." },
      { semester: "Year 2 - Sem 2", focus: "Incubation", milestone: "Pitch to university startup cells or pre-seed accelerators." },
      { semester: "Year 3 - Sem 1", focus: "Launch & Monetization", milestone: "Incorporate venture and secure first cohort of beta users." }
    ]
  }
};

export default function FuturePathModal({ isOpen, onClose }: Props) {
  const [activeTrack, setActiveTrack] = useState<TrackKey>("ai");

  if (!isOpen) return null;

  const currentPath = paths[activeTrack];

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
              <Compass className="w-4 h-4 text-indigo-400" /> Career Simulation Engine
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Future Path Explorer <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Simulate customized multi-year academic and professional trajectories based on your long-term ambitions.
            </p>
          </div>

          {/* Track Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {[
              { id: "ai", label: "AI Research" },
              { id: "product", label: "Product & Strategy" },
              { id: "quant", label: "Quant / HFT" },
              { id: "startup", label: "Venture / Founder" }
            ].map((track) => (
              <button
                key={track.id}
                onClick={() => setActiveTrack(track.id as TrackKey)}
                className={`p-3 rounded-2xl text-xs font-medium transition cursor-pointer border text-center ${
                  activeTrack === track.id
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-neutral-900 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>

          {/* Selected Track Details */}
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 mb-6">
            <h3 className="text-sm font-bold text-white mb-1">{currentPath.title}</h3>
            <p className="text-xs text-slate-400">{currentPath.subtitle}</p>
          </div>

          {/* Roadmap Steps */}
          <div className="space-y-3">
            {currentPath.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 flex items-start gap-3 hover:border-indigo-500/30 transition"
              >
                <div className="h-7 w-7 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 uppercase tracking-wider font-semibold">
                      {step.semester}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{step.focus}</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1">{step.milestone}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
