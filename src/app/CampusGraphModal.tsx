"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Network } from "lucide-react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// Beautiful dark-themed nodes representing the Campus Knowledge Graph
const initialNodes = [
  { 
    id: "1", position: { x: 250, y: 20 }, 
    data: { label: "You (Year 2)" }, 
    style: { background: "#312e81", color: "white", border: "1px solid #6366f1", borderRadius: "12px", width: 150, textAlign: "center" as const } 
  },
  { 
    id: "2", position: { x: 50, y: 120 }, 
    data: { label: "Computer Vision Project" }, 
    style: { background: "#171717", color: "#a3a3a3", border: "1px solid #333", borderRadius: "8px" } 
  },
  { 
    id: "3", position: { x: 450, y: 120 }, 
    data: { label: "AI Society" }, 
    style: { background: "#171717", color: "#a3a3a3", border: "1px solid #333", borderRadius: "8px" } 
  },
  { 
    id: "4", position: { x: 50, y: 220 }, 
    data: { label: "Sarah Chen (Senior)" }, 
    style: { background: "#064e3b", color: "#34d399", border: "1px solid #10b981", borderRadius: "8px" } 
  },
  { 
    id: "5", position: { x: 450, y: 220 }, 
    data: { label: "Prof. Sharma (Edge AI Lab)" }, 
    style: { background: "#4c1d95", color: "#a78bfa", border: "1px solid #8b5cf6", borderRadius: "8px" } 
  },
];

// Connecting the nodes with animated glowing lines
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#6366f1", strokeWidth: 2 } },
  { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#6366f1", strokeWidth: 2 } },
  { id: "e2-4", source: "2", target: "4", animated: true, style: { stroke: "#10b981", strokeWidth: 2 } },
  { id: "e3-5", source: "3", target: "5", animated: true, style: { stroke: "#8b5cf6", strokeWidth: 2 } },
];

export default function CampusGraphModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4">
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          className="relative w-full max-w-4xl h-[70vh] rounded-3xl border border-white/10 bg-neutral-950 p-6 shadow-2xl overflow-hidden flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white transition z-50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-4 z-10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Network className="w-5 h-5 text-indigo-400" />
              <span>Campus Knowledge Graph</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Visualizing how your activities connect you to seniors, faculty, and opportunities.
            </p>
          </div>

          {/* The React Flow Canvas */}
          <div className="flex-1 rounded-2xl border border-white/5 bg-neutral-900/50 overflow-hidden">
            <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
              <Background color="#333" gap={16} />
              <Controls className="bg-neutral-800 border-white/10 fill-white" />
            </ReactFlow>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}