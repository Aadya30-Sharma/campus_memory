"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, Sparkles, TrendingUp, Award } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface CourseGrade {
  code: string;
  name: string;
  credits: number;
  currentScore: number;
  targetGrade: string;
}

const initialCourses: CourseGrade[] = [
  { code: "CS201", name: "Data Structures & Algorithms", credits: 4, currentScore: 85, targetGrade: "A" },
  { code: "MA202", name: "Discrete Mathematics", credits: 4, currentScore: 78, targetGrade: "A-" },
  { code: "EE101", name: "Basic Electronics", credits: 3, currentScore: 90, targetGrade: "A+" },
  { code: "HU103", name: "Professional Ethics", credits: 2, currentScore: 92, targetGrade: "A+" }
];

export default function GradePredictorModal({ isOpen, onClose }: Props) {
  const [courses, setCourses] = useState<CourseGrade[]>(initialCourses);

  if (!isOpen) return null;

  // Calculate simulated CGPA based on weights (simple scale out of 10)
  const getGradePoint = (score: number) => {
    if (score >= 90) return 10;
    if (score >= 80) return 9;
    if (score >= 70) return 8;
    if (score >= 60) return 7;
    return 6;
  };

  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  const weightedPoints = courses.reduce((acc, c) => acc + getGradePoint(c.currentScore) * c.credits, 0);
  const currentCGPA = (weightedPoints / totalCredits).toFixed(2);

  const handleScoreChange = (index: number, newScore: number) => {
    const updated = [...courses];
    updated[index].currentScore = Math.max(0, Math.min(100, newScore));
    setCourses(updated);
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
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" /> Academic Forecasting Engine
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              GPA & Academic Simulator <Sparkles className="w-4 h-4 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Simulate final grades and project your cumulative GPA based on real-time coursework inputs.
            </p>
          </div>

          {/* CGPA Summary Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 border border-amber-500/20 mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Simulated Current CGPA</span>
              <h3 className="text-3xl font-black text-white mt-0.5">{currentCGPA} <span className="text-xs text-slate-500 font-normal">/ 10.0</span></h3>
              <p className="text-[11px] text-amber-300/80 mt-0.5 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> On track for Dean's Honor List
              </p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
              <Award className="w-6 h-6" />
            </div>
          </div>

          {/* Course List & Sliders */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Active Semester Courses</h3>
            {courses.map((course, idx) => (
              <div
                key={course.code}
                className="p-4 rounded-2xl bg-neutral-900/80 border border-white/5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono font-semibold">
                      {course.code}
                    </span>
                    <h4 className="text-sm font-semibold text-white mt-1">{course.name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-200 font-mono">{course.currentScore}%</span>
                    <p className="text-[10px] text-slate-500">{course.credits} Credits</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={course.currentScore}
                    onChange={(e) => handleScoreChange(idx, Number(e.target.value))}
                    className="flex-1 accent-amber-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 w-12 text-right">Target: {course.targetGrade}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
