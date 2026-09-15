"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, GraduationCap, Bot } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Professor {
  id: string;
  name: string;
  department: string;
  avatarBg: string;
  welcomeMessage: string;
}

const professors: Professor[] = [
  {
    id: "aris",
    name: "Dr. Aris Thorne",
    department: "Computer Science & Algorithms",
    avatarBg: "from-indigo-500 to-purple-600",
    welcomeMessage: "Office hours are open. Bring me your graph theory bugs or algorithmic bottlenecks.",
  },
  {
    id: "maya",
    name: "Dr. Maya Lin",
    department: "Artificial Intelligence & ML",
    avatarBg: "from-emerald-500 to-teal-600",
    welcomeMessage: "Welcome. Let's discuss neural architectures, loss landscapes, or transformer attention weights.",
  },
  {
    id: "vikram",
    name: "Dr. Vikram Roy",
    department: "Systems & Hardware Architecture",
    avatarBg: "from-amber-500 to-orange-600",
    welcomeMessage: "Memory leaks, cache misses, or pipeline stalls? Let's debug it together.",
  },
];

export default function OfficeHoursModal({ isOpen, onClose }: Props) {
  const [selectedProf, setSelectedProf] = useState<Professor>(professors[0]);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "prof"; text: string }[]>([
    { sender: "prof", text: professors[0].welcomeMessage },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isGenerating) return;

    const userText = inputQuery;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputQuery("");
    setIsGenerating(true);

    setTimeout(() => {
      let reply = `That's a profound conceptual question regarding ${selectedProf.department}. Make sure you review the core lemma on page 42 of the lecture notes before next lab.`;
      if (userText.toLowerCase().includes("dijkstra")) {
        reply = "Remember that Dijkstra's algorithm relies on greedy edge relaxation and non-negative edge weights. If weights can be negative, Bellman-Ford is required!";
      } else if (userText.toLowerCase().includes("transformer") || userText.toLowerCase().includes("attention")) {
        reply = "Self-attention computes dot products between queries and keys, scaled by the square root of the dimension, followed by softmax. Think about why the scaling factor is crucial!";
      }
      setMessages((prev) => [...prev, { sender: "prof", text: reply }]);
      setIsGenerating(false);
    }, 800);
  };

  const handleSelectProf = (prof: Professor) => {
    setSelectedProf(prof);
    setMessages([{ sender: "prof", text: prof.welcomeMessage }]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-2xl text-slate-100 flex flex-col h-[85vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-4 shrink-0">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <GraduationCap className="w-4 h-4" /> Virtual Faculty Consultations
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              AI Office Hours <Sparkles className="w-4 h-4 text-indigo-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Consult simulated faculty mentors for Socratic debugging, concept breakdowns, and exam prep.
            </p>
          </div>

          {/* Professor Selector Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-4 shrink-0">
            {professors.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectProf(p)}
                className={`p-2.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2.5 ${
                  selectedProf.id === p.id
                    ? "bg-indigo-600/20 border-indigo-500 text-white"
                    : "bg-neutral-900 border-white/5 text-slate-400 hover:bg-neutral-800"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${p.avatarBg} flex items-center justify-center text-white shrink-0 font-bold text-xs`}>
                  {p.name.split(" ")[1][0]}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold truncate text-slate-200">{p.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{p.department.split(" ")[0]}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Chat Stream */}
          <div className="flex-1 bg-neutral-900/60 border border-white/5 rounded-2xl p-4 overflow-y-auto space-y-3 mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === "user" 
                    ? "bg-purple-600 text-white" 
                    : `bg-gradient-to-tr ${selectedProf.avatarBg} text-white`
                }`}>
                  {msg.sender === "user" ? "You" : selectedProf.name.split(" ")[1][0]}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-purple-600/20 border border-purple-500/30 text-purple-100 rounded-tr-none"
                    : "bg-neutral-900 border border-white/10 text-slate-200 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isGenerating && (
              <div className="flex items-center gap-2 text-xs text-slate-500 animate-pulse">
                <Bot className="w-4 h-4 text-indigo-400" /> {selectedProf.name} is formulating a response...
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="flex gap-2 shrink-0">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask ${selectedProf.name} a doubt...`}
              className="flex-1 bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
            >
              <Send className="w-3.5 h-3.5" /> Ask
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
