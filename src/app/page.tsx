"use client";

import CampusGraphModal from "./CampusGraphModal";
import InfoChangeModal from "./InfoChangeModal";
import CatchMeUpModal from "./CatchMeUpModal";
import ResumeBuilderModal from "./ResumeBuilderModal";
import FuturePathModal from "./FuturePathModal";
import SkillGapModal from "./SkillGapModal";
import PeerMatchModal from "./PeerMatchModal";
import GradePredictorModal from "./GradePredictorModal";
import OfficeHoursModal from "./OfficeHoursModal";
import AlumniNetworkModal from "./AlumniNetworkModal";
import ExplainNoticeModal from "./ExplainNoticeModal";
import SerendipityModal from "./SerendipityModal";
import LifecycleModal from "./LifecycleModal";
import PersonalizationModal from "./PersonalizationModal";
import WhisperModal from "./WhisperModal";
import FocusSpaceModal from "./FocusSpaceModal";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, Compass, MapPin, BookOpen, ShieldCheck, 
  Flame, HelpCircle, ArrowUpRight, Award, History, Send, Network, Zap, FileText, Target, Users, Calculator, GraduationCap, Briefcase, Shuffle, Clock, Sliders, MessageSquareQuote, Timer 
} from "lucide-react";

import { CAMPUS_ACTIVITIES } from "./data/campus-mock";
import MemoryVault from "./MemoryVault";
import CampusPulseModal from "./CampusPulseModal";

type Year = 1 | 2 | 3 | 4;
// IGDTUW Kashmere Gate Campus Landmarks & Blocks
const IGDTUW_BLOCKS = [
  { id: 'admin', name: 'Administrative Block', lat: 28.6645, lng: 77.2322, desc: 'Main office & registrar' },
  { id: 'it', name: 'IT & CSE Block', lat: 28.6648, lng: 77.2325, desc: 'Computer labs & lecture halls' },
  { id: 'mech', name: 'Mechanical Block', lat: 28.6642, lng: 77.2320, desc: 'Workshops & labs' },
  { id: 'lib', name: 'Library (LRC)', lat: 28.6646, lng: 77.2328, desc: 'Learning Resource Centre' },
  { id: 'hostel', name: 'Hostels (Krishna/Kaveri)', lat: 28.6640, lng: 77.2318, desc: 'Residential zone' },
];

// Helper to calculate distance in meters (Haversine formula)
const getDistanceFromLatLonInMeters = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

export default function CampusOS() {
  const [isGraphOpen, setIsGraphOpen] = useState(false);
  const [isChangeTrackerOpen, setIsChangeTrackerOpen] = useState(false);
  const [isCatchMeUpOpen, setIsCatchMeUpOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isFuturePathOpen, setIsFuturePathOpen] = useState(false);
  const [isSkillGapOpen, setIsSkillGapOpen] = useState(false);
  const [isPeerMatchOpen, setIsPeerMatchOpen] = useState(false);
  const [isGradePredictorOpen, setIsGradePredictorOpen] = useState(false);
  const [isOfficeHoursOpen, setIsOfficeHoursOpen] = useState(false);
  const [isAlumniModalOpen, setIsAlumniModalOpen] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [isSerendipityOpen, setIsSerendipityOpen] = useState(false);
  const [isLifecycleOpen, setIsLifecycleOpen] = useState(false);
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [isWhisperOpen, setIsWhisperOpen] = useState(false);
  const [isFocusSpaceOpen, setIsFocusSpaceOpen] = useState(false);

  // 1. All State Management
  // Living Campus Geolocation State
  const [locationText, setLocationText] = useState("CS Block • Lab 4");
  const [locationSubtext, setLocationSubtext] = useState("AI Society Hack-Meet in 20m");
  const [isLocating, setIsLocating] = useState(false);

const [blockDistances, setBlockDistances] = useState<any[]>([]);

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        setLocationText(`IGDTUW GPS Active`);
        setLocationSubtext(`Lat: ${userLat.toFixed(4)}, Lng: ${userLng.toFixed(4)}`);
        
        // Calculate distance to each campus block
        const evaluatedBlocks = IGDTUW_BLOCKS.map(block => ({
          ...block,
          distance: getDistanceFromLatLonInMeters(userLat, userLng, block.lat, block.lng)
        }));
        
        setBlockDistances(evaluatedBlocks);
        setIsLocating(false);
      },
      (error) => {
        alert("Unable to retrieve your location. Please check browser permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const [selectedYear, setSelectedYear] = useState<Year>(1);
  const [copilotInput, setCopilotInput] = useState("");
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isPulseOpen, setIsPulseOpen] = useState(false);
  const [activities, setActivities] = useState<any[]>(CAMPUS_ACTIVITIES);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

    // ---> PASTE ACADEMIC STATE & HANDLERS HERE <---
    const [academicItems, setAcademicItems] = useState([
      { id: 1, title: "Data Structures (CS201)", status: "Due Tomorrow", statusColor: "text-amber-400 bg-amber-400/10" },
      { id: 2, title: "Pointers & Memory Slides", status: "Indexed", statusColor: "text-slate-400 bg-white/5" },
    ]);
    const [newClassTitle, setNewClassTitle] = useState("");
    const [newClassStatus, setNewClassStatus] = useState("Due Soon");

    const handleAddAcademicItem = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newClassTitle.trim()) return;
      
      const newItem = {
        id: Date.now(),
        title: newClassTitle,
        status: newClassStatus,
        statusColor: newClassStatus.toLowerCase().includes("due") ? "text-amber-400 bg-amber-400/10" : "text-indigo-300 bg-indigo-500/10"
      };

      setAcademicItems([newItem, ...academicItems]);
      setNewClassTitle("");
    };

    const handleRemoveAcademicItem = (id: number) => {
      setAcademicItems(academicItems.filter(item => item.id !== id));
    };

    const handleCopilotSubmit = async (e: React.FormEvent) => {
      // ... your existing code below ...

  const handleCopilotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;

    const userQuery = copilotInput;
    setCopilotInput("");
    setCopilotResponse(null);
    setIsCopilotLoading(true);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userQuery }),
      });
      const data = await res.json();
      setCopilotResponse(data.reply);
    } catch (err) {
      setCopilotResponse("Failed to reach the AI brain.");
    } finally {
      setIsCopilotLoading(false);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMemory = {
      id: Date.now(),
      year: selectedYear,
      title: newTitle,
      description: newDesc || "Custom user-logged entry into Campus OS.",
      date: "Just now",
      status: "verified" as const,
    };

    setActivities([newMemory, ...activities]);
    setNewTitle("");
    setNewDesc("");
  };

  const currentActivities = activities.filter((a) => a.year === selectedYear);

  const dnaStats = {
    1: { tech: 45, leadership: 20, research: 15, creative: 60 },
    2: { tech: 68, leadership: 45, research: 30, creative: 55 },
    3: { tech: 88, leadership: 60, research: 50, creative: 45 },
    4: { tech: 94, leadership: 78, research: 65, creative: 50 },
  }[selectedYear];

  return (
    <div className="min-h-screen bg-campus-dark text-slate-100 selection:bg-indigo-500/30 font-sans relative overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow pointer-events-none -z-10" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-campus-border backdrop-blur-xl bg-campus-dark/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              CAMPUS MEMORY
            </span>
            <span className="text-[10px] text-slate-500 ml-2 border border-white/10 px-1.5 py-0.5 rounded-full">
              OS v2.13
            </span>
          </div>
        </div>

        {/* Global Year Switcher */}
        <div className="flex items-center bg-campus-card border border-campus-border rounded-full p-1 shadow-inner">
          {([1, 2, 3, 4] as Year[]).map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`relative px-4 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                selectedYear === yr ? "text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {selectedYear === yr && (
                <motion.div
                  layoutId="activeYearPill"
                  className="absolute inset-0 bg-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10">Year {yr}</span>
            </button>
          ))}
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {/* Focus Space Button */}
          <button 
            onClick={() => setIsFocusSpaceOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Timer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Focus Space</span>
          </button>

          {/* Whisper Wall Button */}
          <button 
            onClick={() => setIsWhisperOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <MessageSquareQuote className="w-3.5 h-3.5 text-rose-400" />
            <span>Whisper Wall</span>
          </button>

          {/* Preferences Button */}
          <button 
            onClick={() => setIsPersonalizationOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Preferences</span>
          </button>

          {/* Explain Notice Button */}
          <button 
            onClick={() => setIsExplainModalOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Explain Notice</span>
          </button>

          {/* Lifecycle Manager Button */}
          <button 
            onClick={() => setIsLifecycleOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lifecycle</span>
          </button>

          {/* Serendipity Button */}
          <button 
            onClick={() => setIsSerendipityOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-pink-500/30 text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Shuffle className="w-3.5 h-3.5 text-pink-400" />
            <span>Serendipity</span>
          </button>

          {/* Alumni Radar Button */}
          <button 
            onClick={() => setIsAlumniModalOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-purple-500/30 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span>Alumni Radar</span>
          </button>

          {/* Office Hours Button */}
          <button 
            onClick={() => setIsOfficeHoursOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Office Hours</span>
          </button>

          {/* Grade Predictor Button */}
          <button 
            onClick={() => setIsGradePredictorOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Grade Predictor</span>
          </button>

          {/* Peer Match Button */}
          <button 
            onClick={() => setIsPeerMatchOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-purple-500/30 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Peer Match</span>
          </button>

          {/* Skill Gap Button */}
          <button 
            onClick={() => setIsSkillGapOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Target className="w-3.5 h-3.5 text-emerald-400" />
            <span>Skill Gap</span>
          </button>

          {/* Future Path Button */}
          <button 
            onClick={() => setIsFuturePathOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-400" />
            <span>Future Path</span>
          </button>

          {/* Resume Builder Button */}
          <button 
            onClick={() => setIsResumeOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-purple-500/30 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Resume Builder</span>
          </button>

          {/* Catch Me Up Button */}
          <button 
            onClick={() => setIsCatchMeUpOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Catch Me Up</span>
          </button>

          {/* Notice Shifts Button */}
          <button 
            onClick={() => setIsChangeTrackerOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Notice Shifts</span>
          </button>

          {/* Launch Vault Button */}
          <button 
            onClick={() => setIsVaultOpen(true)}
            className="text-xs px-3 py-1.5 rounded-lg border border-purple-500/30 text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 transition flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <History className="w-3.5 h-3.5" />
            <span>Launch 90s Vault</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 pb-28">
        
        {/* Left Column */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="p-4 rounded-2xl border border-campus-border bg-campus-card backdrop-blur-md space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
      <MapPin className="w-3.5 h-3.5 text-indigo-400" /> Living Campus (IGDTUW)
    </span>
    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
  </div>

  <div className="rounded-xl bg-neutral-900/80 border border-white/5 p-3 space-y-2 max-h-48 overflow-y-auto">
    <p className="text-xs font-medium text-white">{locationText}</p>
    <p className="text-[11px] text-slate-400">{locationSubtext}</p>
    
    {blockDistances.length > 0 ? (
      <div className="space-y-1.5 pt-2 border-t border-white/10">
        <p className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider">Distances to Blocks:</p>
        {blockDistances.map(b => (
          <div key={b.id} className="flex justify-between text-[11px] bg-white/5 p-1.5 rounded">
            <span className="text-slate-200">{b.name}</span>
            <span className="text-indigo-400 font-mono">{b.distance}m away</span>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-[10px] text-slate-500 italic">Click below to compute routes to IGDTUW blocks.</p>
    )}
  </div>

  <button 
    onClick={handleFetchLocation}
    disabled={isLocating}
    className="w-full text-[11px] text-indigo-300 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/15 transition border border-indigo-500/20 cursor-pointer disabled:opacity-50"
  >
    {isLocating ? "Pinpointing IGDTUW GPS..." : "Find route to campus blocks"}
  </button>
</div>
<div className="p-4 rounded-2xl border border-campus-border bg-campus-card backdrop-blur-md space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
      <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Academic Memory
    </span>
    <span className="text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded-full">Live Sync</span>
  </div>

  {/* Dynamic List of Items */}
  <div className="space-y-2 max-h-44 overflow-y-auto">
    {academicItems.map((item) => (
      <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/80 border border-white/5 group">
        <span className="text-xs text-slate-200 font-medium truncate max-w-[150px]">{item.title}</span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-md ${item.statusColor}`}>{item.status}</span>
          <button 
            onClick={() => handleRemoveAcademicItem(item.id)}
            className="text-slate-500 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition cursor-pointer"
            title="Remove"
          >
            ×
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Form to Add New Class Uploads / Assignments */}
  <form onSubmit={handleAddAcademicItem} className="space-y-2 pt-2 border-t border-white/10">
    <input 
      type="text" 
      placeholder="Add assignment or notes..." 
      value={newClassTitle}
      onChange={(e) => setNewClassTitle(e.target.value)}
      className="w-full text-xs bg-neutral-900 border border-white/10 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
    />
    <div className="flex gap-2">
      <select 
        value={newClassStatus}
        onChange={(e) => setNewClassStatus(e.target.value)}
        className="text-[11px] bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-slate-300 focus:outline-none"
      >
        <option value="Due Soon">Due Soon</option>
        <option value="Indexed">Indexed</option>
        <option value="New Upload">New Upload</option>
      </select>
      <button 
        type="submit"
        className="flex-1 text-[11px] text-indigo-300 py-1 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/25 transition border border-indigo-500/30 cursor-pointer font-medium"
      >
        + Add to Memory
      </button>
    </div>
  </form>
</div>

          <div className="p-4 rounded-2xl border border-campus-border bg-campus-card backdrop-blur-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Academic Memory
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/5 flex justify-between items-center">
                <span>Data Structures (CS201)</span>
                <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Due Tomorrow</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-900/60 border border-white/5 flex justify-between items-center">
                <span>Pointers & Memory Slides</span>
                <span className="text-[10px] text-slate-400">Indexed</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Column */}
        <section className="lg:col-span-6 space-y-6">
          <div className="p-4 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-neutral-900/40 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-indigo-400">
              <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
              CAMPUS RADAR INSIGHT
            </div>
            <p className="text-sm font-medium text-slate-200">
              Hackathon season has officially started across 3 tech societies.
            </p>
            <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-amber-400" /> Most Confusing: Hostel Curfew
              </span>
              <span className="text-white/20">•</span>
              <span 
                onClick={() => setIsPulseOpen(true)}
                className="text-indigo-300 hover:underline cursor-pointer flex items-center gap-0.5"
              >
                View Pulse & Myths <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Year {selectedYear} Timeline Stream
              </h3>
              <span className="text-xs text-slate-500">{currentActivities.length} memories logged</span>
            </div>
            <form onSubmit={handleAddMemory} className="p-3 rounded-xl border border-campus-border bg-campus-card/50 space-y-2 mb-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Log a new hackathon, project, or milestone..."
                className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Short description..."
                  className="flex-1 bg-neutral-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
            <div className="space-y-3">
              {currentActivities.map((act) => (
                <div 
                  key={act.id} 
                  className="p-4 rounded-xl border border-campus-border bg-campus-card/70 hover:border-indigo-500/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      act.status === 'verified' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                      <ShieldCheck className="w-3 h-3" /> {act.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-400">{act.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100 mt-2">{act.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{act.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="p-4 rounded-2xl border border-campus-border bg-campus-card backdrop-blur-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-4">
              <Award className="w-3.5 h-3.5 text-indigo-400" /> College DNA
            </span>
            <div className="space-y-3">
              {[
                { label: "Technical", value: dnaStats.tech, color: "bg-indigo-500" },
                { label: "Leadership", value: dnaStats.leadership, color: "bg-purple-500" },
                { label: "Research", value: dnaStats.research, color: "bg-emerald-500" },
                { label: "Creative", value: dnaStats.creative, color: "bg-pink-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-slate-400 font-mono">{item.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-campus-border bg-campus-card backdrop-blur-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
              <Compass className="w-3.5 h-3.5 text-indigo-400" /> What To Do Next
            </span>
            <p className="text-xs text-slate-300 mt-1">
              {selectedYear === 1 && "Join 1 technical club and setup Git repository."}
              {selectedYear === 2 && "Apply for summer research lab openings by Friday."}
              {selectedYear === 3 && "Complete STAR bullet points for internship drives."}
              {selectedYear === 4 && "Review capstone documentation & export master portfolio."}
            </p>
            <button 
              onClick={() => setIsGraphOpen(true)}
              className="w-full mt-4 p-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 transition flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
                <Network className="w-4 h-4" />
                View Your Connection Graph
              </div>
              <ArrowUpRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </aside>
      </main>

      {/* Floating Copilot Bar */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50">
        {copilotResponse && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 p-3 rounded-xl bg-neutral-900/95 border border-indigo-500/40 text-xs text-indigo-200 shadow-xl flex justify-between items-start backdrop-blur-xl"
          >
            <span>{copilotResponse}</span>
            <button 
              onClick={() => setCopilotResponse(null)}
              className="text-slate-400 hover:text-white ml-2 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}

        <form 
          onSubmit={handleCopilotSubmit}
          className="flex items-center gap-2 p-2 rounded-2xl bg-neutral-900/90 border border-indigo-500/30 shadow-2xl backdrop-blur-xl"
        >
          <input
            type="text"
            value={copilotInput}
            onChange={(e) => setCopilotInput(e.target.value)}
            placeholder="Ask Campus Copilot: 'I have 45 min free' or 'Who knows React?'..."
            className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <button 
            type="submit"
            className="h-8 w-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition flex items-center justify-center text-white shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        {isCopilotLoading && (
          <div className="flex items-center space-x-2 text-xs text-indigo-400 animate-pulse py-2 px-1">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <span>Campus Copilot is thinking...</span>
          </div>
        )}
      </footer>

      {/* Modals */}
      <MemoryVault 
        isOpen={isVaultOpen} 
        onClose={() => setIsVaultOpen(false)} 
      />
      <CampusPulseModal 
        isOpen={isPulseOpen} 
        onClose={() => setIsPulseOpen(false)} 
      />
      <CampusGraphModal 
        isOpen={isGraphOpen} 
        onClose={() => setIsGraphOpen(false)} 
      />
      <InfoChangeModal 
        isOpen={isChangeTrackerOpen} 
        onClose={() => setIsChangeTrackerOpen(false)} 
      />
      <CatchMeUpModal 
        isOpen={isCatchMeUpOpen} 
        onClose={() => setIsCatchMeUpOpen(false)} 
      />
      <ResumeBuilderModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        activities={activities}
      />
      <FuturePathModal 
        isOpen={isFuturePathOpen} 
        onClose={() => setIsFuturePathOpen(false)} 
      />
      <SkillGapModal 
        isOpen={isSkillGapOpen} 
        onClose={() => setIsSkillGapOpen(false)} 
        activities={activities}
      />
      <PeerMatchModal 
        isOpen={isPeerMatchOpen} 
        onClose={() => setIsPeerMatchOpen(false)} 
      />
      <GradePredictorModal 
        isOpen={isGradePredictorOpen} 
        onClose={() => setIsGradePredictorOpen(false)} 
      />
      <OfficeHoursModal 
        isOpen={isOfficeHoursOpen} 
        onClose={() => setIsOfficeHoursOpen(false)} 
      />
      <AlumniNetworkModal 
        isOpen={isAlumniModalOpen} 
        onClose={() => setIsAlumniModalOpen(false)} 
      />
      <ExplainNoticeModal 
        isOpen={isExplainModalOpen} 
        onClose={() => setIsExplainModalOpen(false)} 
      />
      <SerendipityModal 
        isOpen={isSerendipityOpen} 
        onClose={() => setIsSerendipityOpen(false)} 
      />
      <LifecycleModal 
        isOpen={isLifecycleOpen} 
        onClose={() => setIsLifecycleOpen(false)} 
      />
      <PersonalizationModal 
        isOpen={isPersonalizationOpen} 
        onClose={() => setIsPersonalizationOpen(false)} 
      />
      <WhisperModal 
        isOpen={isWhisperOpen} 
        onClose={() => setIsWhisperOpen(false)} 
      />
      <FocusSpaceModal 
        isOpen={isFocusSpaceOpen} 
        onClose={() => setIsFocusSpaceOpen(false)} 
      />
    </div>
  );
}
}