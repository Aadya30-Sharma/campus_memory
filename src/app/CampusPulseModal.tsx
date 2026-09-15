"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, XCircle, HelpCircle, Send } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const myths = [
  {
    claim: "First-year students cannot apply for technical society core teams.",
    status: "contradicted",
    detail: "Official recruitment guidelines confirm all undergraduate years are eligible for open recruitment.",
    reports: 4
  },
  {
    claim: "Prof. Sharma allows 2nd-year students into the Edge AI lab.",
    status: "verified",
    detail: "Confirmed via departmental research notice posted August 28th.",
    reports: 12
  },
  {
    claim: "Hostel gates close 30 minutes earlier during exam weeks.",
    status: "unverified",
    detail: "Student-reported rumor. No administrative circular has been issued.",
    reports: 9
  }
];

export default function CampusPulseModal({ isOpen, onClose }: Props) {
  const [puzzleAnswer, setPuzzleAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Campus Pulse & Mythbuster</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Separating verified campus announcements from rumors and missing information.
            </p>
          </div>

          {/* Mythbuster Section */}
          <div className="space-y-3 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Campus Claims
            </h3>
            {myths.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-200">
                    "{item.claim}"
                  </span>
                  {item.status === "verified" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                  {item.status === "contradicted" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Contradicted
                    </span>
                  )}
                  {item.status === "unverified" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Student Rumor
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Campus Puzzle / Information Gap Section */}
          <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-950/20">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
              <HelpCircle className="w-4 h-4" />
              CAMPUS PUZZLE: MISSING INFORMATION DETECTED
            </div>
            <p className="text-xs text-slate-300">
              The AI Hack-Meet at CS Lab 4 lists a 2:00 PM start time, but no official notice specifies the end time or equipment required.
            </p>

            {submitted ? (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                Contribution submitted for student consensus verification.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (puzzleAnswer.trim()) setSubmitted(true);
                }}
                className="mt-3 flex gap-2"
              >
                <input
                  type="text"
                  value={puzzleAnswer}
                  onChange={(e) => setPuzzleAnswer(e.target.value)}
                  placeholder="Know the answer? Contribute a detail..."
                  className="flex-1 bg-neutral-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs flex items-center gap-1 transition cursor-pointer"
                >
                  <Send className="w-3 h-3" /> Submit
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}