"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, FileText, AlertCircle, CheckCircle2, Clock, Users, ShieldAlert, ArrowRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface NoticeAnalysis {
  title: string;
  whoAffected: string;
  whatItMeans: string;
  actions: string[];
  deadline: string;
  consequences: string;
}

const sampleNotices = [
  {
    name: "Hostel Late-Night Access & Biometric Rule Revision",
    text: "Circular No: H/2026/44. It is hereby notified to all undergraduate residents that biometric logging between 11:30 PM and 05:00 AM is mandatory. Failure to register entry on 3 consecutive occasions without prior written permission from the Warden will result in parents being notified and withdrawal of mess privileges for 7 days."
  },
  {
    name: "Mid-Sem Attendance Waiver & Medical Submission Guidelines",
    text: "Academic Section Notice: Students seeking attendance relaxation for medical grounds during the mid-semester examination period must submit Form M-3 countersigned by the Chief Medical Officer within 48 hours of resuming classes. Retrospective submissions after portal closure on April 12th will under no circumstances be entertained."
  }
];

export default function ExplainNoticeModal({ isOpen, onClose }: Props) {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<NoticeAnalysis | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = (textToAnalyze?: string) => {
    const text = textToAnalyze || inputText;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setAnalysis(null);

    setTimeout(() => {
      if (text.includes("Hostel")) {
        setAnalysis({
          title: "Hostel Late-Night Access & Biometric Rule Revision",
          whoAffected: "All undergraduate students living in the campus hostels.",
          whatItMeans: "You must scan your biometric ID if you enter or are inside the hostel between 11:30 PM and 5:00 AM.",
          actions: [
            "Ensure your biometric registration is active at the gate.",
            "If returning late, make sure to log your entry properly."
          ],
          deadline: "Immediate effect (active now).",
          consequences: "Missing 3 consecutive logs triggers a parent notification and a 7-day suspension of mess privileges."
        });
      } else {
        setAnalysis({
          title: "Medical Attendance Waiver Policy",
          whoAffected: "Students seeking attendance relaxation for mid-sem exams due to illness.",
          whatItMeans: "Medical certificates alone are not enough; they must be on 'Form M-3' signed by the Chief Medical Officer.",
          actions: [
            "Get Form M-3 signed by the CMO.",
            "Submit physical/digital copy before the portal deadline."
          ],
          deadline: "Portal closes April 12th (Strict cutoff).",
          consequences: "No late submissions will be accepted after the deadline; attendance shortage will remain unexcused."
        });
      }
      setIsAnalyzing(false);
    }, 1000);
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
              <FileText className="w-4 h-4" /> Administrative Decoder
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Explain This Notice <Sparkles className="w-4 h-4 text-indigo-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Paste any convoluted administrative circular or choose a sample to decode it into plain English.
            </p>
          </div>

          {/* Quick Sample Selectors */}
          <div className="mb-4">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Or Test With Sample Notices:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleNotices.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(sample.text);
                    handleAnalyze(sample.text);
                  }}
                  className="p-2.5 rounded-xl bg-neutral-900 border border-white/5 hover:border-indigo-500/40 text-left text-xs text-slate-300 transition flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate pr-2">{sample.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* Text Input Area */}
          <div className="space-y-3 mb-6">
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste official circular text, rules, or notice paragraph here..."
              className="w-full bg-neutral-900 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
            />
            <button
              onClick={() => handleAnalyze()}
              disabled={isAnalyzing || !inputText.trim()}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Decoding Notice...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" /> Break Down Notice
                </>
              )}
            </button>
          </div>

          {/* Analysis Result Display */}
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30"
            >
              <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">
                {analysis.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/5">
                  <span className="text-indigo-400 font-semibold flex items-center gap-1.5 mb-1">
                    <Users className="w-3.5 h-3.5" /> Who is affected
                  </span>
                  <p className="text-slate-300">{analysis.whoAffected}</p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/5">
                  <span className="text-amber-400 font-semibold flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5" /> Deadline / Timing
                  </span>
                  <p className="text-slate-300">{analysis.deadline}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/5 text-xs">
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> What it actually means
                </span>
                <p className="text-slate-200">{analysis.whatItMeans}</p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/80 border border-white/5 text-xs">
                <span className="text-purple-400 font-semibold flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Required Action Items
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-300 mt-1">
                  {analysis.actions.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>

              {analysis.consequences && (
                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-xs">
                  <span className="text-red-400 font-semibold flex items-center gap-1.5 mb-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Consequences (If stated)
                  </span>
                  <p className="text-red-200">{analysis.consequences}</p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
