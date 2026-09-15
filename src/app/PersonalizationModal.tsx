"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sliders, Shield, Bell, Database } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PersonalizationModal({ isOpen, onClose }: Props) {
  const [feedAlgorithm, setFeedAlgorithm] = useState<"balanced" | "academic" | "social" | "career">("balanced");
  const [notifications, setNotifications] = useState({
    deadlines: true,
    peerMatches: true,
    alumniRadar: false,
    gradeAlerts: true,
  });
  const [visibility, setVisibility] = useState<"public" | "peers" | "private">("peers");

  if (!isOpen) return null;

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
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
              <Sliders className="w-4 h-4" /> Customization & Privacy
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Personalization Control Panel
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Fine-tune your campus AI feed weights, notification alerts, and network visibility.
            </p>
          </div>

          {/* Feed Priority Algorithm */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-indigo-400" /> AI Feed Priority Weights
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["balanced", "academic", "social", "career"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFeedAlgorithm(mode)}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer capitalize text-xs ${
                    feedAlgorithm === mode
                      ? "bg-indigo-600/20 border-indigo-500 text-white font-semibold"
                      : "bg-neutral-900/60 border-white/5 text-slate-400 hover:bg-neutral-900"
                  }`}
                >
                  <div className="font-medium text-slate-200">{mode}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {mode === "balanced" && "Standard mix"}
                    {mode === "academic" && "Exams & notes"}
                    {mode === "social" && "Clubs & events"}
                    {mode === "career" && "Placements & skills"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-amber-400" /> Smart Notification Triggers
            </h3>
            <div className="space-y-2">
              {[
                { key: "deadlines", label: "Academic Deadlines & Exam Timetable Shifts", desc: "Urgent changes to assignments or classes" },
                { key: "peerMatches", label: "Peer Study & Hackathon Match Alerts", desc: "When a peer with complementary skills is found" },
                { key: "alumniRadar", label: "Alumni Radar & Mentorship Pings", desc: "Alumni working at target companies visit campus" },
                { key: "gradeAlerts", label: "Grade Prediction & GPA Threshold Warnings", desc: "Real-time updates on semester standing" },
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => toggleNotification(item.key as any)}
                  className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-neutral-900 transition"
                >
                  <div>
                    <div className="text-xs font-medium text-white">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </div>
                  <div className={`w-9 h-5 rounded-full transition relative p-0.5 ${notifications[item.key as keyof typeof notifications] ? "bg-indigo-600" : "bg-neutral-800"}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications[item.key as keyof typeof notifications] ? "translate-x-4" : "translate-x-0"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Visibility */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Campus Network Visibility
            </h3>
            <div className="flex gap-2">
              {(["public", "peers", "private"] as const).map((vis) => (
                <button
                  key={vis}
                  onClick={() => setVisibility(vis)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs capitalize transition cursor-pointer ${
                    visibility === vis
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-medium"
                      : "bg-neutral-900/60 border-white/5 text-slate-400 hover:bg-neutral-900"
                  }`}
                >
                  {vis === "public" && "Entire Campus"}
                  {vis === "peers" && "Batchmates Only"}
                  {vis === "private" && "Stealth Mode"}
                </button>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
