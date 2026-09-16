"use client";

import React, { useState } from "react";
import { BookOpen, Search, AlertCircle, ExternalLink } from "lucide-react";

export interface AcademicItem {
  id: string;
  courseCode: string;
  courseName: string;
  type: "slide" | "assignment" | "syllabus" | "notice";
  title: string;
  topic: string;
  dueDate?: string;
  summary: string;
}

const ACADEMIC_ARCHIVE: AcademicItem[] = [
  {
    id: "acad_1",
    courseCode: "CS201",
    courseName: "Data Structures & Algorithms",
    type: "assignment",
    title: "Lab Assignment 3: Red-Black Trees",
    topic: "Balanced Trees",
    dueDate: "Tomorrow, 11:59 PM",
    summary: "Implementation of rotation operations and node recoloring tests.",
  },
  {
    id: "acad_2",
    courseCode: "CS201",
    courseName: "Data Structures & Algorithms",
    type: "slide",
    title: "Week 4: Pointers, Memory Allocation & Structs",
    topic: "Pointers",
    summary: "Covers malloc, calloc, pointer arithmetic, and heap leaks.",
  },
  {
    id: "acad_3",
    courseCode: "CS305",
    courseName: "Operating Systems",
    type: "syllabus",
    title: "Mid-Term Syllabus & Exam Blueprint",
    topic: "Process Scheduling",
    summary: "Units 1 to 3: CPU scheduling algorithms, Deadlocks, and Semaphores.",
  },
  {
    id: "acad_4",
    courseCode: "CS308",
    courseName: "Database Management Systems",
    type: "notice",
    title: "Project Milestone 1 Guidelines",
    topic: "SQL & Normalization",
    dueDate: "Next Friday",
    summary: "Submission requirements for 3NF schema design and ER diagram.",
  },
];

export default function AcademicMemory() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = ACADEMIC_ARCHIVE.filter(
    (item) =>
      item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 rounded-2xl border border-campus-border bg-campus-card backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Academic Memory
        </span>
        <span className="text-[10px] text-slate-500 font-mono">
          {filteredItems.length} indexed
        </span>
      </div>

      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search 'pointers', 'trees', 'CS201'..."
          className="w-full bg-neutral-900/80 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
        />
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">No academic records found.</p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-indigo-500/30 transition group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-indigo-400 font-medium">
                  {item.courseCode}
                </span>
                {item.dueDate ? (
                  <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {item.dueDate}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 uppercase">{item.type}</span>
                )}
              </div>

              <h4 className="text-xs font-medium text-slate-200 mt-1 flex items-center justify-between">
                {item.title}
                <ExternalLink className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition" />
              </h4>

              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
                {item.summary}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}