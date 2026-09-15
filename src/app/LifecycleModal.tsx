"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Archive, CheckCircle2, RefreshCw, AlertTriangle } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface LifecycleItem {
  id: string;
  title: string;
  source: string;
  status: "active" | "fading" | "archived";
  expiryDate: string;
  reason: string;
}

const lifecycleData: LifecycleItem[] = [
  {
    id: "1",
    title: "Mid-Semester Exam Timetable Change (Slot B)",
    source: "Academic Affairs Notice #402",
    status: "active",
    expiryDate: "Expires in 3 days",
    reason: "Relevant to current exam week. High urgency."
  },
  {
    id: "2",
    title: "Hostel Wi-Fi Maintenance Downtime",
    source: "IT Dept Circular",
    status: "fading",
    expiryDate: "Expired 12 hours ago",
    reason: "Maintenance window completed. Deprecating from primary feed."
  },
  {
    id: "3",
    title: "Annual Cultural Fest Volunteer Registration",
    source: "Student Council",
    status: "archived",
    expiryDate: "Archived last month",
    reason: "Event concluded. Preserved in Vault for historical record."
  }
];

export default function LifecycleModal({ isOpen, onClose }: Props) {
  const [filter, setFilter] = useState<"all" | "active" | "fading" | "archived">("all");

  if (!isOpen) return null;

  const filteredItems = filter === "all" 
    ? lifecycleData 
    : lifecycleData.filter(i => i.status === filter);

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
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" /> Data Hygiene & Lifecycle
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Information Lifecycle Manager
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Automated decay and archival tracking so stale notices don't clutter active campus workflows.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 mb-4">
            {(["all", "active", "fading", "archived"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition cursor-pointer ${
                  filter === tab
                    ? "bg-cyan-600 text-white"
                    : "bg-neutral-900 border border-white/5 text-slate-400 hover:bg-neutral-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Lifecycle List */}
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">{item.source}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 capitalize font-medium ${
                      item.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : item.status === "fading"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                    }`}
                  >
                    {item.status === "active" && <CheckCircle2 className="w-3 h-3" />}
                    {item.status === "fading" && <AlertTriangle className="w-3 h-3" />}
                    {item.status === "archived" && <Archive className="w-3 h-3" />}
                    {item.status}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white">{item.title}</h3>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-white/5">
                  <span>{item.reason}</span>
                  <span className="font-mono text-[11px] text-cyan-300">{item.expiryDate}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
