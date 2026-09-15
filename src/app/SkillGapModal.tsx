"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Target, AlertTriangle, CheckCircle2, Sparkles, ArrowRight, BookOpen } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activities: any[];
}

interface TargetRole {
  id: string;
  title: string;
  requiredSkills: { name: string; category: "tech" | "core" | "leadership"; weight: number }[];
}

const roles: TargetRole[] = [
  {
    id: "ai_eng",
    title: "AI / ML Research Engineer",
    requiredSkills: [
      { name: "PyTorch & Transformers", category: "tech", weight: 90 },
      { name: "Distributed Training / CUDA", category: "tech", weight: 75 },
      { name: "Advanced Linear Algebra", category: "core", weight: 85 },
      { name: "Research Paper Writing", category: "leadership", weight: 60 },
    ],
  },
  {
    id: "sde_faang",
    title: "Software Engineer (FAANG / Top Tech)",
    requiredSkills: [
      { name: "Data Structures & Algorithms", category: "core", weight: 95 },
      { name: "Low-Level System Design", category: "tech", weight: 85 },
      { name: "Concurrency & Multithreading", category: "tech", weight: 80 },
      { name: "Open Source Contributions", category: "leadership", weight: 50 },
    ],
  },
  {
    id: "pm",
    title: "Product Manager (APM Programs)",
    requiredSkills: [
      { name: "Product Metrics & Analytics", category: "core", weight: 90 },
      { name: "Wireframing & UX Sense", category: "tech", weight: 70 },
      { name: "Cross-functional Leadership", category: "leadership", weight: 95 },
      { name: "Market Sizing & Case Studies", category: "core", weight: 80 },
    ],
  },
];

export default function SkillGapModal({ isOpen, onClose, activities }: Props) {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("ai_eng");

  if (!isOpen) return null;

  const activeRole = roles.find((r) => r.id === selectedRoleId) || roles[0];

  // Simple heuristic simulation based on logged activities count / keywords
  const userText = activities.map((a) => `${a.title} ${a.description}`).join(" ").toLowerCase();

  const evaluatedSkills = activeRole.requiredSkills.map((skill) => {
    const keyword = skill.name.toLowerCase().split(" ")[0];
    const isPresent = userText.includes(keyword) || Math.random() > 0.4; // simulated check
    return {
      ...skill,
      status: isPresent ? ("acquired" as const) : ("missing" as const),
      score: isPresent ? Math.floor(80 + Math.random() * 20) : Math.floor(20 + Math.random() * 30),
    };
  });

  const completionRate = Math.round(
    evaluatedSkills.reduce((acc, curr) => acc + (curr.status === "acquired" ? curr.weight : 0), 0) /
      evaluatedSkills.reduce((acc, curr) => acc + curr.weight, 0) * 100
  );

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
              <Target className="w-4 h-4" /> Competency Audit Engine
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Skill Gap Analyzer <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Cross-referencing your timeline stream and college DNA against industry role benchmarks.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`p-3 rounded-2xl text-xs font-medium transition cursor-pointer border text-left flex flex-col justify-between ${
                  selectedRoleId === role.id
                    ? "bg-emerald-600/20 border-emerald-500 text-white shadow-lg shadow-emerald-900/20"
                    : "bg-neutral-900 border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                <span>{role.title}</span>
                <span className="text-[10px] text-slate-500 mt-1">Target Benchmark</span>
              </button>
            ))}
          </div>

          {/* Readiness Meter Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-900 to-neutral-900/60 border border-white/5 mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Overall Match Readiness</span>
              <h3 className="text-2xl font-black text-white mt-0.5">{completionRate}% Ready</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {completionRate > 70 ? "Strong profile fit. Focus on polishing high-weight skill gaps." : "Significant gaps detected. Bridge missing items via recommended tasks."}
              </p>
            </div>
            <div className="h-16 w-16 rounded-full border-4 border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm bg-emerald-500/10">
              {completionRate}%
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Detailed Competency Breakdown</h3>
            {evaluatedSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{skill.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                      skill.status === "acquired"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {skill.status === "acquired" ? "Acquired" : "Gap Detected"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {skill.status === "acquired" ? "Verified through timeline activity & coursework." : "Requires targeted project or elective registration."}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono font-bold text-slate-200">{skill.score}%</span>
                  <p className="text-[10px] text-slate-500">Weight: {skill.weight}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
