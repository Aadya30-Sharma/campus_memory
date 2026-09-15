"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, History, ArrowRight, AlertCircle, ShieldAlert, CheckCircle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface NoticeUpdate {
  id: string;
  title: string;
  category: string;
  oldValue: string;
  newValue: string;
  changeType: "time" | "deadline" | "venue" | "cancellation";
  updatedAt: string;
  affectedTask: string;
}

const mockChanges: NoticeUpdate[] = [
  {
    id: "1",
    title: "Data Structures Midsem Exam",
    category: "Academic",
    oldValue: "09:00 AM, Room 102",
    newValue: "10:30 AM, Lecture Hall Complex (LHC-1)",
    changeType: "time",
    updatedAt: "15 mins ago",
    affectedTask: "Conflicts with AI Society Hack-Meet start time."
  },
  {
    id: "2",
    title: "AI Hackathon Submission Deadline",
    category: "Society",
    oldValue: "Sept 18, 11:59 PM",
    newValue: "Sept 20, 06:00 PM",
    changeType: "deadline",
    updatedAt: "2 hours ago",
    affectedTask: "Team review meeting pushed back by 24 hours."
  },
  {
    id: "3",
    title: "Edge AI Lab Guest Lecture",
    category: "Research",
    oldValue: "CS Block • Lab 4",
    newValue: "Cancelled / Rescheduled to Next Week",
    changeType: "cancellation",
    updatedAt: "Yesterday",
    affectedTask: "Free slot opened up in your afternoon schedule."
  }
];

export default function InfoChangeModal({ isOpen, onClose }: Props) {
  const [updates] = useState<NoticeUpdate[]>(mockChanges);

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
              <History className="w-5 h-5 text-indigo-400" />
              <span>Information Change Tracking</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Real-time diff engine detecting modifications in schedules, venues, and deadlines across your campus feeds.
            </p>
          </div>

          <div className="space-y-4">
            {updates.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 space-y-3 relative overflow-hidden"
              >
                {/* Top Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-500">Updated {item.updatedAt}</span>
                  </div>
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Shift Detected
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>

                {/* Diff Comparison Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs bg-neutral-950/60 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Previous State</span>
                    <span className="text-rose-400 line-through bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20 inline-block">
                      {item.oldValue}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">New Official State</span>
                    <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 inline-block">
                      {item.newValue}
                    </span>
                  </div>
                </div>

                {/* Downstream Impact / Affected Task */}
                <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-300 bg-indigo-950/20 p-2.5 rounded-xl border border-indigo-500/20">
                  <ShieldAlert className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-indigo-300 font-medium">Downstream Impact: </strong>
                    {item.affectedTask}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
