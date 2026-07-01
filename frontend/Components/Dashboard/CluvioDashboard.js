"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers3,
  LayoutDashboard,
  Users,
  Grid,
  Calendar,
  ShieldCheck,
  CheckCircle,
  Bell,
  MessageSquare,
  Trophy,
  Award,
  BarChart3,
  CalendarDays,
  Settings,
  User,
  Search,
  Plus,
  Send,
  X,
  ArrowRight,
  LogOut,
  ChevronDown,
  Info,
  CalendarCheck,
  Activity,
  Check,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Table from "../UI/Table";
import Badge from "../UI/Badge";

// Pre-populated default state data
const initialMembers = [
  { id: 1, name: "Aarav Sharma", email: "aarav@university.edu", role: "President", status: "Active", joined: "2025-09-12" },
  { id: 2, name: "Priya Verma", email: "priya@university.edu", role: "Event Coordinator", status: "Active", joined: "2025-10-01" },
  { id: 3, name: "Rahul Mehta", email: "rahul@university.edu", role: "Technical Lead", status: "Active", joined: "2025-08-20" },
  { id: 4, name: "Sneha Kapoor", email: "sneha@university.edu", role: "Secretary", status: "Active", joined: "2025-11-05" },
  { id: 5, name: "Amit Patel", email: "amit.p@university.edu", role: "Member", status: "Active", joined: "2025-11-10" },
  { id: 6, name: "Ishaan Sen", email: "ishaan@university.edu", role: "Member", status: "Inactive", joined: "2025-09-30" },
  { id: 7, name: "Riya Gupta", email: "riya.g@university.edu", role: "Member", status: "Active", joined: "2025-12-02" },
  { id: 8, name: "Vikram Malhotra", email: "vikram@university.edu", role: "Member", status: "Active", joined: "2025-12-15" }
];

const initialEvents = [
  { id: 1, name: "AI Hackathon 2026", date: "2026-07-15", time: "09:00 AM", location: "Block C Auditorium", registrations: 124, status: "Upcoming" },
  { id: 2, name: "UI/UX Workshop", date: "2026-07-22", time: "02:30 PM", location: "Lab 4, Tech Building", registrations: 68, status: "Upcoming" },
  { id: 3, name: "Weekly Dev Circle", date: "2026-07-08", time: "05:00 PM", location: "Student Lounge", registrations: 32, status: "Upcoming" },
  { id: 4, name: "Annual Tech Symposium", date: "2026-06-18", time: "10:00 AM", location: "Campus Theatre", registrations: 240, status: "Completed" },
  { id: 5, name: "Core Committee Meeting", date: "2026-06-30", time: "04:00 PM", location: "Conference Room B", registrations: 12, status: "Completed" }
];

const initialAnnouncements = [
  { id: 1, title: "Registrations Open for AI Hackathon", body: "Team up and register before July 10th. Cash prizes up to $2,000 up for grabs!", date: "2 hours ago", author: "Aarav Sharma", category: "Urgent", pinned: true },
  { id: 2, title: "UI/UX Bootcamp Resources Uploaded", body: "Check the resources tab under the workspace settings to view slides, templates, and Figma files from yesterday's session.", date: "1 day ago", author: "Priya Verma", category: "Info", pinned: false },
  { id: 3, title: "Welcome to Cluvio Workspace", body: "We've officially shifted our club operations to Cluvio. Please update your profiles and customize notification triggers.", date: "3 days ago", author: "System", category: "General", pinned: false }
];

const initialChats = {
  general: [
    { id: 1, user: "Aarav Sharma", time: "11:20 AM", text: "Hey everyone! Welcome to the Cluvio platform. This will be our central channel." },
    { id: 2, user: "Priya Verma", time: "11:22 AM", text: "This looks super clean. The dark layout is beautiful!" },
    { id: 3, user: "Rahul Mehta", time: "11:25 AM", text: "Agreed. Much better than scattered Discord channels and spreadsheets." }
  ],
  "dev-talk": [
    { id: 1, user: "Rahul Mehta", time: "Yesterday", text: "Has anyone set up next-compiler? Trying to optimize build times." },
    { id: 2, user: "Amit Patel", time: "Yesterday", text: "Yeah, works natively on React 19. Build times cut by 40%." }
  ],
  "event-planning": [
    { id: 1, user: "Priya Verma", time: "10:00 AM", text: "We need coordinates for the auditorium audio system for the Hackathon." },
    { id: 2, user: "Sneha Kapoor", time: "10:05 AM", text: "I've filed the request form with the campus admin. Will follow up today." }
  ]
};

const initialClubs = [
  { id: 1, name: "Coding Club", category: "Academic & Tech", members: 142, head: "Aarav Sharma", status: "Active" },
  { id: 2, name: "Engineering Senate", category: "Academic & Tech", members: 88, head: "Siddharth Rao", status: "Active" },
  { id: 3, name: "Music Society", category: "Arts & Culture", members: 110, head: "Neha Kapoor", status: "Active" },
  { id: 4, name: "Design Co-op", category: "Arts & Culture", members: 54, head: "Ananya Iyer", status: "Active" },
  { id: 5, name: "Robotics Chapter", category: "Academic & Tech", members: 96, head: "Karan Johar", status: "Active" },
  { id: 6, name: "Debate League", category: "General Interest", members: 42, head: "Rohan Varma", status: "Active" }
];

const initialCommunities = [
  { id: 1, title: "Web Dev & Open Source", description: "Sharing web development tricks, open-source projects, and cool UI demos.", posts: 45, members: 89 },
  { id: 2, title: "AI Research Circle", description: "Deep-dives into ML models, papers, prompt engineering, and university research.", posts: 32, members: 78 },
  { id: 3, title: "Product Design Syndicate", description: "Figma tips, portfolio critiques, design systems discussion, and case studies.", posts: 18, members: 52 },
  { id: 4, title: "Campus Activity Hub", description: "General chatter, campus stories, fun meetups, and meme channel.", posts: 112, members: 130 }
];

const CluvioDashboard = ({ onSignOut }) => {
  // Routing / View state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentWorkspace, setCurrentWorkspace] = useState("Coding Club");
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);

  // Search, modal, notification states
  const [searchTerm, setSearchTerm] = useState("");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  // Dynamic application state
  const [members, setMembers] = useState(initialMembers);
  const [events, setEvents] = useState(initialEvents);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [chats, setChats] = useState(initialChats);
  const [activeChannel, setActiveChannel] = useState("general");
  const [typedMessage, setTypedMessage] = useState("");
  
  // Modals for creating items
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [newEventData, setNewEventData] = useState({ name: "", date: "", time: "", location: "" });

  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [newAnnouncementData, setNewAnnouncementData] = useState({ title: "", body: "", category: "General" });

  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, activeChannel]);

  // Handle Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Quick Action Handler
  const handleQuickAction = (action) => {
    setQuickActionOpen(false);
    if (action === "event") setEventModalOpen(true);
    if (action === "announcement") setAnnouncementModalOpen(true);
  };

  // Add a new event
  const createEvent = (e) => {
    e.preventDefault();
    if (!newEventData.name || !newEventData.date) return;
    const added = {
      id: events.length + 1,
      name: newEventData.name,
      date: newEventData.date,
      time: newEventData.time || "12:00 PM",
      location: newEventData.location || "Online",
      registrations: 0,
      status: "Upcoming"
    };
    setEvents([added, ...events]);
    setNewEventData({ name: "", date: "", time: "", location: "" });
    setEventModalOpen(false);
    showToast("Event scheduled successfully!");
  };

  // Add a new announcement
  const createAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncementData.title || !newAnnouncementData.body) return;
    const added = {
      id: announcements.length + 1,
      title: newAnnouncementData.title,
      body: newAnnouncementData.body,
      category: newAnnouncementData.category,
      date: "Just now",
      author: "Aarav Sharma",
      pinned: false
    };
    setAnnouncements([added, ...announcements]);
    setNewAnnouncementData({ title: "", body: "", category: "General" });
    setAnnouncementModalOpen(false);
    showToast("Announcement posted!");
  };

  // Chat message sending
  const sendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    const msg = {
      id: Date.now(),
      user: "Aarav Sharma",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: typedMessage
    };
    setChats({
      ...chats,
      [activeChannel]: [...chats[activeChannel], msg]
    });
    setTypedMessage("");
  };

  // Interactive Toast notification
  const [toastText, setToastText] = useState("");
  const [showToastBar, setShowToastBar] = useState(false);
  const showToast = (text) => {
    setToastText(text);
    setShowToastBar(true);
    setTimeout(() => setShowToastBar(false), 3000);
  };

  // Toggle Member status
  const toggleMemberStatus = (id) => {
    setMembers(members.map(m => m.id === id ? { ...m, status: m.status === "Active" ? "Inactive" : "Active" } : m));
    showToast("Member status updated");
  };

  // Change Member role
  const changeMemberRole = (id, newRole) => {
    setMembers(members.map(m => m.id === id ? { ...m, role: newRole } : m));
    showToast(`Role updated to ${newRole}`);
  };

  // Attendance checking state
  const [attendanceList, setAttendanceList] = useState(
    initialMembers.map(m => ({ id: m.id, name: m.name, attended: false }))
  );
  const toggleAttendance = (id) => {
    setAttendanceList(attendanceList.map(a => a.id === id ? { ...a, attended: !a.attended } : a));
  };

  // Sidebar link items
  const menuGroups = [
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
        { id: "analytics", label: "Analytics", icon: BarChart3 }
      ]
    },
    {
      title: "Operations",
      items: [
        { id: "clubs", label: "Clubs", icon: Grid },
        { id: "communities", label: "Communities", icon: Users },
        { id: "events", label: "Events", icon: Calendar, badge: 3 },
        { id: "members", label: "Member Management", icon: ShieldCheck },
        { id: "attendance", label: "Attendance", icon: CalendarCheck },
        { id: "announcements", label: "Announcements", icon: Info }
      ]
    },
    {
      title: "Community",
      items: [
        { id: "chat", label: "Chat Workspace", icon: MessageSquare },
        { id: "leaderboards", label: "Leaderboards", icon: Trophy },
        { id: "achievements", label: "Achievements", icon: Award }
      ]
    },
    {
      title: "Personal",
      items: [
        { id: "calendar", label: "Calendar", icon: CalendarDays },
        { id: "profile", label: "Profile", icon: User },
        { id: "settings", label: "Settings", icon: Settings }
      ]
    }
  ];

  // Helper for rendering Active tab title
  const getTabLabel = () => {
    for (const group of menuGroups) {
      const match = group.items.find(item => item.id === activeTab);
      if (match) return match.label;
    }
    return "Dashboard";
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F14] text-[#F4F6F8] flex overflow-hidden w-full">
      
      {/* Sidebar navigation */}
      <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[#11161C] flex flex-col h-screen select-none">
        
        {/* Workspace Brand Dropdown */}
        <div className="p-4 border-b border-[var(--border)] relative">
          <button 
            onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
            className="w-full flex items-center justify-between p-2 rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 rounded-lg brand-mark flex items-center justify-center text-white">
                <Layers3 size={14} />
              </div>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-soft)]">Workspace</h4>
                <p className="text-sm font-medium text-white truncate max-w-[120px]">{currentWorkspace}</p>
              </div>
            </div>
            <ChevronDown size={14} className="text-[var(--muted)]" />
          </button>

          {/* Workspace select popup */}
          <AnimatePresence>
            {showWorkspaceDropdown && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setShowWorkspaceDropdown(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-4 right-4 top-16 bg-[#171D24] border border-[var(--border)] rounded-[var(--radius-md)] p-1 z-40 shadow-soft"
                >
                  {["Coding Club", "Engineering Senate", "Music Society", "Design Co-op"].map(w => (
                    <button
                      key={w}
                      onClick={() => {
                        setCurrentWorkspace(w);
                        setShowWorkspaceDropdown(false);
                        showToast(`Switched workspace to ${w}`);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[var(--muted)] hover:text-white rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] transition-colors"
                    >
                      {w}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar space-y-6">
          {menuGroups.map(group => (
            <div key={group.title} className="space-y-1">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-soft)] px-3">{group.title}</h5>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSearchTerm("");
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-[var(--radius-sm)] transition-all ${
                        isActive 
                          ? "bg-[var(--accent-soft)] text-[var(--foreground)] font-medium border-l-2 border-[var(--accent)]" 
                          : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs">
                        <Icon size={14} className={isActive ? "text-[var(--accent)]" : ""} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold h-4 px-1.5 flex items-center justify-center rounded-full bg-[var(--accent)] text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Footer Action */}
        <div className="p-4 border-t border-[var(--border)] mt-auto bg-[#141A22]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--accent)] flex items-center justify-center font-bold text-xs text-white">
              AS
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Aarav Sharma</p>
              <p className="text-[10px] text-[var(--muted-soft)]">President</p>
            </div>
          </div>
          <button 
            onClick={onSignOut}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--muted)] hover:text-white transition-colors"
            title="Sign Out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      {/* Main Console Window */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-14 border-b border-[var(--border)] bg-[#11161C] px-6 flex items-center justify-between z-10 shrink-0">
          
          {/* Breadcrumb title */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--muted-soft)] uppercase tracking-wider">{currentWorkspace}</span>
            <span className="text-xs text-[var(--muted-soft)]">/</span>
            <span className="text-xs font-medium text-white">{getTabLabel()}</span>
          </div>

          {/* Quick searches & Actions */}
          <div className="flex items-center gap-4">
            
            {/* Global Cmd + K search bar */}
            <div className="relative w-64">
              <Search size={14} className="absolute left-3 top-2.5 text-[var(--muted-soft)]" />
              <input
                type="text"
                placeholder="Search anything... (Ctrl+K)"
                onClick={() => setCommandPaletteOpen(true)}
                readOnly
                className="w-full h-8 pl-9 pr-8 text-xs bg-[var(--surface-strong)] border border-[var(--border)] rounded-[var(--radius-sm)] cursor-pointer text-[var(--muted)] hover:border-[var(--border-strong)] transition-colors focus:outline-none"
              />
              <span className="absolute right-2.5 top-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold text-[var(--muted-soft)] bg-[var(--surface-raised)] border border-[var(--border)]">
                Ctrl+K
              </span>
            </div>

            {/* Quick Actions Dropdown */}
            <div className="relative">
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => setQuickActionOpen(!quickActionOpen)}
                className="h-8 flex items-center gap-1 text-xs"
              >
                <Plus size={14} />
                <span>Create</span>
              </Button>

              <AnimatePresence>
                {quickActionOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setQuickActionOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 mt-1 bg-[#171D24] border border-[var(--border)] rounded-[var(--radius-md)] p-1 z-40 shadow-soft w-44"
                    >
                      <button
                        onClick={() => handleQuickAction("event")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--muted)] hover:text-white rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] transition-colors text-left"
                      >
                        <Calendar size={13} className="text-[var(--accent)]" />
                        <span>Schedule Event</span>
                      </button>
                      <button
                        onClick={() => handleQuickAction("announcement")}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[var(--muted)] hover:text-white rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] transition-colors text-left"
                      >
                        <Info size={13} className="text-[var(--warning)]" />
                        <span>Post Announcement</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dashboard notification triggers */}
            <button 
              onClick={() => {
                setActiveTab("notifications");
              }}
              className="relative p-1.5 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--muted)] hover:text-white transition-colors"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            </button>
          </div>
        </header>

        {/* Scrollable Main Content Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#0B0F14] no-scrollbar">
          
          {/* Active module conditional switcher */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              
              {/* 1. MODULE: DASHBOARD SUMMARY */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Banner summary */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[var(--surface)] to-[var(--surface-strong)] rounded-[var(--radius-lg)] border border-[var(--border)] shadow-soft">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        Welcome back, Aarav! <Sparkles size={16} className="text-amber-400" />
                      </h2>
                      <p className="text-xs text-[var(--muted)] mt-1">Here is what is happening with the Coding Club this week.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button size="sm" onClick={() => setActiveTab("events")}>Manage Events</Button>
                      <Button size="sm" variant="secondary" onClick={() => setActiveTab("chat")}>Open Chat</Button>
                    </div>
                  </div>

                  {/* Core widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card interactive={false} className="p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] border border-[var(--accent-line)]">
                        <Users size={18} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-soft)]">Total Members</h4>
                        <p className="metric-value mt-1">142</p>
                      </div>
                    </Card>
                    <Card interactive={false} className="p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[var(--success)] border border-emerald-500/20">
                        <CalendarCheck size={18} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-soft)]">Events Hosted</h4>
                        <p className="metric-value mt-1">54</p>
                      </div>
                    </Card>
                    <Card interactive={false} className="p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-[var(--warning)] border border-amber-500/20">
                        <Activity size={18} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-soft)]">Engagement Rate</h4>
                        <p className="metric-value mt-1">87%</p>
                      </div>
                    </Card>
                    <Card interactive={false} className="p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                        <Trophy size={18} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-soft)]">Leaderboard Rank</h4>
                        <p className="metric-value mt-1">#1</p>
                      </div>
                    </Card>
                  </div>

                  {/* Split analytics and recent actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Activity tracking */}
                    <Card interactive={false} className="p-5 lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                        <h3 className="text-sm font-semibold text-white">Membership Growth</h3>
                        <span className="text-xs text-[var(--success)] flex items-center gap-1">
                          +15% this month <ArrowUpRight size={14} />
                        </span>
                      </div>
                      <div className="h-44 w-full flex items-end justify-between pt-4">
                        {/* Custom SVG line chart mockup */}
                        <svg className="w-full h-full text-[var(--accent)]" viewBox="0 0 300 100" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25"/>
                              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0"/>
                            </linearGradient>
                          </defs>
                          <path d="M0,80 Q30,70 60,65 T120,40 T180,30 T240,15 T300,5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                          <path d="M0,80 Q30,70 60,65 T120,40 T180,30 T240,15 T300,5 L300,100 L0,100 Z" fill="url(#chartGlow)" />
                        </svg>
                      </div>
                      <div className="flex justify-between text-[10px] text-[var(--muted-soft)] font-bold uppercase pt-1 border-t border-[var(--border)]">
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                      </div>
                    </Card>

                    {/* Announcement feed panel */}
                    <Card interactive={false} className="p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                        <h3 className="text-sm font-semibold text-white">Recent Announcements</h3>
                        <button onClick={() => setActiveTab("announcements")} className="text-xs text-[var(--accent)] hover:underline">View All</button>
                      </div>
                      <div className="space-y-3">
                        {announcements.slice(0, 2).map(a => (
                          <div key={a.id} className="p-3 bg-[var(--surface-strong)] rounded-lg border border-[var(--border)] space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                a.category === "Urgent" ? "bg-[var(--danger)]/10 text-rose-300" : "bg-[var(--accent-soft)] text-indigo-300"
                              }`}>{a.category}</span>
                              <span className="text-[10px] text-[var(--muted-soft)]">{a.date}</span>
                            </div>
                            <h4 className="text-xs font-semibold text-white">{a.title}</h4>
                            <p className="text-[11px] text-[var(--muted)] line-clamp-2 leading-relaxed">{a.body}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* 2. MODULE: NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <Card interactive={false} className="p-6 max-w-2xl mx-auto space-y-6">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Notifications Center</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">Manage details of system triggers and announcements.</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => showToast("All marked as read")}>Mark all read</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 1, title: "New event attendee", text: "Amit Patel registered for the UI/UX Bootcamp.", time: "10 minutes ago", icon: CalendarCheck, read: false },
                      { id: 2, title: "Announcement pinned", text: "Aarav Sharma pinned the announcement: 'Hackathon Registrations Open'.", time: "2 hours ago", icon: Info, read: false },
                      { id: 3, title: "System check completed", text: "Cluvio verified backup data modules and synchronization settings.", time: "1 day ago", icon: ShieldCheck, read: true }
                    ].map(n => (
                      <div key={n.id} className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                        n.read ? "bg-transparent border-[var(--border)]" : "bg-[var(--accent-soft)]/20 border-[var(--border-strong)]"
                      }`}>
                        <div className="h-8 w-8 rounded-lg bg-[var(--surface-strong)] flex items-center justify-center text-[var(--muted)] shrink-0">
                          <n.icon size={15} />
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-semibold text-white">{n.title}</h4>
                            <span className="text-[10px] text-[var(--muted-soft)]">{n.time}</span>
                          </div>
                          <p className="text-xs text-[var(--muted)]">{n.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* 3. MODULE: ANALYTICS */}
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card interactive={false} className="p-5 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-soft)]">Total Message Volume</h4>
                      <p className="metric-value">2,842</p>
                      <div className="text-xs text-[var(--success)]">+12% vs last month</div>
                    </Card>
                    <Card interactive={false} className="p-5 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-soft)]">Active Attendees</h4>
                      <p className="metric-value">344</p>
                      <div className="text-xs text-[var(--success)]">+8% vs last month</div>
                    </Card>
                    <Card interactive={false} className="p-5 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-soft)]">Completed Tasks</h4>
                      <p className="metric-value">18</p>
                      <div className="text-xs text-[var(--muted-soft)]">All key targets met</div>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card interactive={false} className="p-5 space-y-4">
                      <h3 className="text-sm font-semibold text-white">Event Attendance Comparison</h3>
                      <div className="h-48 w-full flex items-end justify-between gap-3 pt-6">
                        {[
                          { name: "Coding Circle", val: "65%" },
                          { name: "Weekly Meet", val: "40%" },
                          { name: "AI Symposium", val: "90%" },
                          { name: "Figma Session", val: "75%" }
                        ].map(c => (
                          <div key={c.name} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-[var(--surface-strong)] rounded-lg overflow-hidden h-36 flex items-end">
                              <div className="w-full bg-[var(--accent)] transition-all duration-500" style={{ height: c.val }} />
                            </div>
                            <span className="text-[10px] text-white font-medium">{c.val}</span>
                            <span className="text-[9px] text-[var(--muted-soft)] truncate max-w-full">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card interactive={false} className="p-5 space-y-4">
                      <h3 className="text-sm font-semibold text-white">Engagement Channels</h3>
                      <div className="space-y-3.5">
                        {[
                          { chan: "#general", score: 85, vol: "1,202 messages" },
                          { chan: "#dev-talk", score: 62, vol: "645 messages" },
                          { chan: "#event-planning", score: 45, vol: "410 messages" }
                        ].map(ch => (
                          <div key={ch.chan} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-white">{ch.chan}</span>
                              <span className="text-[var(--muted)]">{ch.vol}</span>
                            </div>
                            <div className="w-full h-1.5 bg-[var(--surface-strong)] rounded-full overflow-hidden">
                              <div className="h-full bg-[var(--accent)]" style={{ width: `${ch.score}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* 4. MODULE: CLUBS */}
              {activeTab === "clubs" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Campus Clubs Directory</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">Explore active organizations and clubs at Cluvio.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search size={14} className="text-[var(--muted-soft)] -mr-8 z-10" />
                      <input
                        type="text"
                        placeholder="Filter clubs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-8 pl-9 pr-4 text-xs bg-[var(--surface-strong)] border border-[var(--border)] rounded-[var(--radius-sm)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {initialClubs.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map(club => (
                      <Card key={club.id} className="p-5 space-y-4 hover:border-[var(--accent)]">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--accent-strong)]">{club.category}</span>
                            <h4 className="text-base font-semibold text-white mt-1">{club.name}</h4>
                          </div>
                          <span className="text-[10px] font-bold text-[var(--success)] bg-emerald-500/10 px-2 py-0.5 rounded-full">{club.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-3 text-xs">
                          <div>
                            <p className="text-[10px] text-[var(--muted-soft)] uppercase tracking-wider">Members</p>
                            <p className="text-sm font-semibold text-white mt-0.5">{club.members}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-[var(--muted-soft)] uppercase tracking-wider">Lead</p>
                            <p className="text-sm font-semibold text-white mt-0.5 truncate">{club.head}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. MODULE: COMMUNITIES */}
              {activeTab === "communities" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Interest Communities</h3>
                    <p className="text-xs text-[var(--muted)] mt-0.5">Explore open discussion spaces and knowledge channels.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {initialCommunities.map(c => (
                      <Card key={c.id} className="p-5 space-y-4 hover:border-[var(--accent)]">
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-white flex items-center justify-between">
                            <span>{c.title}</span>
                            <span className="text-[10px] text-[var(--muted-soft)] flex items-center gap-1 font-normal">
                              {c.members} members
                            </span>
                          </h4>
                          <p className="text-xs leading-relaxed text-[var(--muted)]">{c.description}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--muted-soft)]">
                          <span>{c.posts} posts active</span>
                          <button className="text-[var(--accent)] hover:underline flex items-center gap-1">
                            Join Forum <ArrowRight size={13} />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. MODULE: EVENTS */}
              {activeTab === "events" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Events Operations</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">Create, modify, and track upcoming university events.</p>
                    </div>
                    <Button size="sm" onClick={() => setEventModalOpen(true)}>Create Event</Button>
                  </div>

                  <Table
                    columns={[
                      { key: "name", label: "Event Name", render: (e) => <span className="font-semibold text-white">{e.name}</span> },
                      { key: "date", label: "Date" },
                      { key: "location", label: "Location" },
                      { key: "registrations", label: "Registrants", render: (e) => <span className="px-2 py-0.5 text-xs bg-[var(--surface-raised)] rounded border border-[var(--border)] text-white">{e.registrations} registered</span> },
                      { key: "status", label: "Status", render: (e) => <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${e.status === "Upcoming" ? "bg-[var(--accent-soft)] text-indigo-300" : "bg-[var(--surface-strong)] text-[var(--muted-soft)]"}`}>{e.status}</span> }
                    ]}
                    rows={events}
                  />
                </div>
              )}

              {/* 7. MODULE: MEMBER MANAGEMENT */}
              {activeTab === "members" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Member Directory</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">Manage roles, roles editing, and toggle membership states.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search size={14} className="text-[var(--muted-soft)] -mr-8 z-10" />
                      <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-8 pl-9 pr-4 text-xs bg-[var(--surface-strong)] border border-[var(--border)] rounded-[var(--radius-sm)] focus:outline-none"
                      />
                    </div>
                  </div>

                  <Table
                    columns={[
                      {
                        key: "name",
                        label: "Name",
                        render: (row) => (
                          <div className="flex items-center gap-3">
                            <div className="h-7 w-7 rounded-full bg-[var(--surface-strong)] border border-[var(--border)] flex items-center justify-center font-bold text-[10px] text-white">
                              {row.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-semibold text-white">{row.name}</p>
                              <p className="text-[10px] text-[var(--muted-soft)]">{row.email}</p>
                            </div>
                          </div>
                        )
                      },
                      {
                        key: "role",
                        label: "Role",
                        render: (row) => (
                          <div className="relative">
                            <select 
                              value={row.role}
                              onChange={(e) => changeMemberRole(row.id, e.target.value)}
                              className="bg-[#171D24] border border-[var(--border)] rounded px-2 py-1 text-xs text-white focus:outline-none"
                            >
                              <option value="President">President</option>
                              <option value="Event Coordinator">Event Coordinator</option>
                              <option value="Technical Lead">Technical Lead</option>
                              <option value="Secretary">Secretary</option>
                              <option value="Member">Member</option>
                            </select>
                          </div>
                        )
                      },
                      { key: "joined", label: "Join Date" },
                      {
                        key: "status",
                        label: "Status",
                        render: (row) => (
                          <button
                            onClick={() => toggleMemberStatus(row.id)}
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              row.status === "Active" ? "bg-emerald-500/10 text-[var(--success)]" : "bg-rose-500/10 text-[var(--danger)]"
                            }`}
                          >
                            {row.status}
                          </button>
                        )
                      }
                    ]}
                    rows={members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))}
                  />
                </div>
              )}

              {/* 8. MODULE: ATTENDANCE */}
              {activeTab === "attendance" && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white">Weekly Dev Circle - Attendance Check</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">Toggle attendee check-ins. Updates are logged to server dynamically.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--muted)]">Present Rate</p>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {Math.round((attendanceList.filter(a => a.attended).length / attendanceList.length) * 100)}%
                      </p>
                    </div>
                  </div>

                  <Card interactive={false} className="p-4 space-y-2">
                    {attendanceList.map(a => (
                      <div key={a.id} className="flex items-center justify-between p-2 hover:bg-[var(--surface-hover)] rounded transition-colors">
                        <span className="text-xs font-semibold text-white">{a.name}</span>
                        <button
                          onClick={() => toggleAttendance(a.id)}
                          className={`h-6 w-6 rounded-md flex items-center justify-center border transition-all ${
                            a.attended ? "bg-[var(--accent)] border-[var(--accent)] text-white" : "border-[var(--border)] text-transparent"
                          }`}
                        >
                          <Check size={14} strokeWidth={3} />
                        </button>
                      </div>
                    ))}
                  </Card>
                </div>
              )}

              {/* 9. MODULE: ANNOUNCEMENTS */}
              {activeTab === "announcements" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Announcements Board</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">View and publish important organization updates.</p>
                    </div>
                    <Button size="sm" onClick={() => setAnnouncementModalOpen(true)}>Post Announcement</Button>
                  </div>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {announcements.map(a => (
                      <Card key={a.id} interactive={false} className="p-5 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              a.category === "Urgent" ? "bg-[var(--danger)]/15 text-rose-300" : "bg-[var(--accent-soft)] text-indigo-300"
                            }`}>{a.category}</span>
                            {a.pinned && (
                              <span className="text-[10px] font-medium text-amber-300 flex items-center gap-1">
                                <Sparkles size={12} /> Pinned
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[var(--muted-soft)]">{a.date}</span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-lg font-semibold text-white">{a.title}</h4>
                          <p className="text-sm leading-relaxed text-[var(--muted)]">{a.body}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[var(--muted-soft)] border-t border-[var(--border)] pt-3">
                          <span>Author:</span>
                          <span className="font-medium text-white">{a.author}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. MODULE: CHAT */}
              {activeTab === "chat" && (
                <div className="h-[calc(100vh-12rem)] flex border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
                  
                  {/* Channels selection bar */}
                  <div className="w-56 bg-[#11161C] border-r border-[var(--border)] p-4 flex flex-col space-y-4 select-none shrink-0">
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted-soft)]">Channels</h5>
                    <div className="space-y-1">
                      {Object.keys(chats).map(c => (
                        <button
                          key={c}
                          onClick={() => setActiveChannel(c)}
                          className={`w-full text-left px-3 py-1.5 rounded-[var(--radius-sm)] text-xs transition-all ${
                            activeChannel === c 
                              ? "bg-[var(--accent-soft)] text-white font-medium" 
                              : "text-[var(--muted)] hover:text-white hover:bg-[var(--surface-hover)]"
                          }`}
                        >
                          # {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Messages screen */}
                  <div className="flex-1 flex flex-col bg-[#141A22]/30">
                    
                    {/* Channel Header */}
                    <div className="h-12 border-b border-[var(--border)] px-4 flex items-center justify-between bg-[#11161C]/50">
                      <span className="text-sm font-semibold text-white"># {activeChannel}</span>
                      <span className="text-xs text-[var(--muted-soft)]">Discussion Space</span>
                    </div>

                    {/* Chat Bubble List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                      {chats[activeChannel].map(m => (
                        <div key={m.id} className="flex gap-3">
                          <div className="h-8 w-8 rounded-full bg-[var(--surface-strong)] flex items-center justify-center font-bold text-xs text-[var(--muted)]">
                            {m.user[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white">{m.user}</span>
                              <span className="text-[10px] text-[var(--muted-soft)]">{m.time}</span>
                            </div>
                            <p className="text-xs text-[var(--muted)] mt-1 bg-[var(--surface-strong)]/40 p-2.5 rounded-lg border border-[var(--border)] max-w-lg leading-relaxed">
                              {m.text}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Chat Input field */}
                    <form onSubmit={sendMessage} className="p-4 border-t border-[var(--border)] flex gap-2">
                      <input
                        type="text"
                        placeholder={`Message #${activeChannel}...`}
                        value={typedMessage}
                        onChange={(e) => setTypedMessage(e.target.value)}
                        className="flex-1 h-9 px-4 text-xs bg-[var(--surface-strong)] border border-[var(--border)] rounded-[var(--radius-sm)] focus:outline-none focus:border-[var(--accent)] text-white"
                      />
                      <Button size="sm" className="h-9 w-9 p-0 flex items-center justify-center">
                        <Send size={14} />
                      </Button>
                    </form>
                  </div>
                </div>
              )}

              {/* 11. MODULE: LEADERBOARD */}
              {activeTab === "leaderboards" && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div>
                    <h3 className="text-base font-bold text-white">Club Leaderboard</h3>
                    <p className="text-xs text-[var(--muted)] mt-0.5">Gamified ranking based on active participation, events, and member signups.</p>
                  </div>

                  <Table
                    columns={[
                      { key: "rank", label: "Rank", render: (r, idx) => <span className="font-bold text-white"># {idx + 1}</span> },
                      { key: "name", label: "Club Name", render: (r) => <span className="font-semibold text-white">{r.name}</span> },
                      { key: "category", label: "Category" },
                      { key: "members", label: "Members" },
                      { key: "points", label: "Score Points", render: (r) => <span className="font-semibold text-[var(--accent)]">{r.members * 15} pts</span> }
                    ]}
                    rows={initialClubs.sort((a,b) => b.members - a.members)}
                  />
                </div>
              )}

              {/* 12. MODULE: ACHIEVEMENTS */}
              {activeTab === "achievements" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-white">Workspace Achievements</h3>
                    <p className="text-xs text-[var(--muted)] mt-0.5">Unlock badges by organizing events and active participation.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Elite Organiser", desc: "Successfully scheduled and hosted 10+ campus events.", unlocked: true, progress: 100 },
                      { title: "Engagement Guru", desc: "Reach an active engagement rate of 80% on all channels.", unlocked: true, progress: 100 },
                      { title: "Community Pillar", desc: "Manage a club with 100+ active university members.", unlocked: true, progress: 100 },
                      { title: "Master Recruiter", desc: "Invite 50+ new students to the club directory.", unlocked: false, progress: 75 },
                      { title: "Feedback Champion", desc: "Maintain 4.8+ rating score from feedback logs.", unlocked: false, progress: 60 }
                    ].map(ach => (
                      <Card key={ach.title} interactive={false} className="p-5 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={`h-9 w-9 rounded-lg flex items-center justify-center border ${
                            ach.unlocked ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-[var(--surface-strong)] border-[var(--border)] text-[var(--muted-soft)]"
                          }`}>
                            <Award size={18} />
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ach.unlocked ? "bg-emerald-500/10 text-[var(--success)]" : "bg-[var(--surface-strong)] text-[var(--muted-soft)]"
                          }`}>
                            {ach.unlocked ? "Unlocked" : "Locked"}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold text-white">{ach.title}</h4>
                          <p className="text-xs text-[var(--muted)] leading-relaxed">{ach.desc}</p>
                        </div>
                        <div className="space-y-1 pt-2">
                          <div className="flex justify-between text-[10px] text-[var(--muted-soft)]">
                            <span>Progress</span>
                            <span>{ach.progress}%</span>
                          </div>
                          <div className="w-full h-1 bg-[var(--surface-strong)] rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--accent)]" style={{ width: `${ach.progress}%` }} />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* 13. MODULE: CALENDAR */}
              {activeTab === "calendar" && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Events Calendar</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">Explore monthly date matrices for schedule coordination.</p>
                    </div>
                    <span className="text-xs font-semibold text-white">July 2026</span>
                  </div>

                  <Card interactive={false} className="p-4 bg-[var(--surface)]">
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--muted-soft)] pb-3 border-b border-[var(--border)]">
                      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>
                    <div className="grid grid-cols-7 gap-2 pt-3 text-center text-xs">
                      {/* Placeholder dates before July */}
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-12 text-transparent" />
                      ))}
                      {/* July calendar grids */}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const hasEvent = day === 8 || day === 15 || day === 22;
                        return (
                          <div 
                            key={`day-${day}`} 
                            className={`h-12 rounded-lg p-1.5 flex flex-col justify-between border ${
                              hasEvent ? "border-[var(--accent-line)] bg-[var(--accent-soft)]/20" : "border-transparent bg-[var(--surface-strong)]/30"
                            }`}
                          >
                            <span className="text-[10px] font-semibold text-[var(--muted)]">{day}</span>
                            {hasEvent && (
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] mx-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              )}

              {/* 14. MODULE: SETTINGS */}
              {activeTab === "settings" && (
                <Card interactive={false} className="p-6 max-w-xl mx-auto space-y-6">
                  <h3 className="text-base font-bold text-white border-b border-[var(--border)] pb-3">Workspace Settings</h3>
                  <div className="space-y-4">
                    <Input label="Workspace Name" defaultValue="Coding Club" />
                    <Input label="Invite Link Domain" defaultValue="https://cluvio.com/invite/coding-club-77" />
                    <div className="space-y-1.5">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Notifications Preference</span>
                      <div className="space-y-2 bg-[var(--surface-strong)] p-3 rounded-lg border border-[var(--border)]">
                        {[
                          "Notify on event registrations",
                          "Real-time announcements email alert",
                          "Slack hook integration enabled"
                        ].map((pref, i) => (
                          <label key={i} className="flex items-center gap-3 text-xs text-[var(--muted)] cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded accent-[var(--accent)]" />
                            <span>{pref}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-2" onClick={() => showToast("Settings updated successfully")}>Save Changes</Button>
                  </div>
                </Card>
              )}

              {/* 15. MODULE: PROFILE */}
              {activeTab === "profile" && (
                <Card interactive={false} className="p-6 max-w-md mx-auto text-center space-y-6">
                  <div className="space-y-3">
                    <div className="h-20 w-20 rounded-full bg-[var(--accent)] flex items-center justify-center font-bold text-2xl text-white mx-auto border-2 border-[var(--border-strong)]">
                      AS
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Aarav Sharma</h3>
                      <p className="text-xs text-[var(--muted)] mt-0.5">aarav@university.edu</p>
                    </div>
                    <span className="eyebrow mx-auto mt-2">President, Coding Club</span>
                  </div>

                  <div className="border-t border-b border-[var(--border)] py-4 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-[10px] text-[var(--muted-soft)] uppercase tracking-wider">Workspace ID</p>
                      <p className="font-semibold text-white mt-0.5">WS-7821-COD</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--muted-soft)] uppercase tracking-wider">Level Rank</p>
                      <p className="font-semibold text-white mt-0.5">Master Coordinator</p>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="w-full" onClick={() => showToast("Profile image change requested")}>Change Avatar</Button>
                </Card>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* MODAL: CREATE EVENT */}
      <AnimatePresence>
        {eventModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEventModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-x-4 top-24 max-w-md mx-auto bg-[#171D24] border border-[var(--border-strong)] rounded-[var(--radius-lg)] p-6 z-[60] shadow-soft space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h3 className="text-sm font-semibold text-white">Schedule New Event</h3>
                <button onClick={() => setEventModalOpen(false)} className="text-[var(--muted)] hover:text-white"><X size={16} /></button>
              </div>
              <form onSubmit={createEvent} className="space-y-4">
                <Input 
                  label="Event Name" 
                  value={newEventData.name} 
                  onChange={(e) => setNewEventData({ ...newEventData, name: e.target.value })} 
                  placeholder="e.g. AI Hackathon 2026"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Date" 
                    type="date" 
                    value={newEventData.date} 
                    onChange={(e) => setNewEventData({ ...newEventData, date: e.target.value })} 
                    required
                  />
                  <Input 
                    label="Time" 
                    placeholder="e.g. 09:00 AM" 
                    value={newEventData.time} 
                    onChange={(e) => setNewEventData({ ...newEventData, time: e.target.value })}
                  />
                </div>
                <Input 
                  label="Location" 
                  placeholder="e.g. Auditorium Room 4" 
                  value={newEventData.location} 
                  onChange={(e) => setNewEventData({ ...newEventData, location: e.target.value })}
                />
                <Button size="sm" className="w-full">Create and Sync Schedule</Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL: CREATE ANNOUNCEMENT */}
      <AnimatePresence>
        {announcementModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAnnouncementModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-x-4 top-24 max-w-md mx-auto bg-[#171D24] border border-[var(--border-strong)] rounded-[var(--radius-lg)] p-6 z-[60] shadow-soft space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h3 className="text-sm font-semibold text-white">Post Announcement</h3>
                <button onClick={() => setAnnouncementModalOpen(false)} className="text-[var(--muted)] hover:text-white"><X size={16} /></button>
              </div>
              <form onSubmit={createAnnouncement} className="space-y-4">
                <Input 
                  label="Title" 
                  value={newAnnouncementData.title} 
                  onChange={(e) => setNewAnnouncementData({ ...newAnnouncementData, title: e.target.value })} 
                  placeholder="Announcing Hackathon 2026"
                  required
                />
                <div className="space-y-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Category</span>
                  <select 
                    value={newAnnouncementData.category}
                    onChange={(e) => setNewAnnouncementData({ ...newAnnouncementData, category: e.target.value })}
                    className="w-full h-9 bg-[var(--surface-strong)] border border-[var(--border)] rounded px-3 text-xs text-white focus:outline-none"
                  >
                    <option value="General">General</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Info">Info</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Content</span>
                  <textarea 
                    value={newAnnouncementData.body} 
                    onChange={(e) => setNewAnnouncementData({ ...newAnnouncementData, body: e.target.value })} 
                    placeholder="Enter details..."
                    required
                    className="w-full h-24 p-3 bg-[var(--surface-strong)] border border-[var(--border)] rounded text-xs text-white focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <Button size="sm" className="w-full">Publish Announcement</Button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* COMMAND PALETTE MODAL (Ctrl+K) */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCommandPaletteOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 15 }}
              className="fixed inset-x-4 top-36 max-w-lg mx-auto bg-[#171D24] border border-[var(--border-strong)] rounded-[var(--radius-lg)] overflow-hidden z-[60] shadow-soft"
            >
              <div className="relative">
                <Search size={16} className="absolute left-4 top-3.5 text-[var(--muted-soft)]" />
                <input
                  type="text"
                  placeholder="Type a command or module name..."
                  autoFocus
                  className="w-full h-12 pl-12 pr-4 bg-[var(--surface)] text-sm text-white focus:outline-none border-b border-[var(--border)]"
                />
              </div>
              <div className="p-2 space-y-0.5 max-h-64 overflow-y-auto">
                <p className="text-[9px] font-bold uppercase tracking-widest text-[var(--muted-soft)] px-3 py-1.5">Modules</p>
                {[
                  { id: "dashboard", label: "Go to Dashboard Dashboard", icon: LayoutDashboard },
                  { id: "chat", label: "Open Channels & Chat Space", icon: MessageSquare },
                  { id: "members", label: "Manage Active Club Members", icon: ShieldCheck },
                  { id: "events", label: "Schedule and Register Events", icon: Calendar },
                  { id: "settings", label: "Open Workspace Settings", icon: Settings }
                ].map(cmd => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      setActiveTab(cmd.id);
                      setCommandPaletteOpen(false);
                      showToast(`Navigated to ${cmd.id}`);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs text-[var(--muted)] hover:text-white rounded-[var(--radius-sm)] hover:bg-[var(--surface-hover)] transition-colors text-left"
                  >
                    <cmd.icon size={13} className="text-[var(--muted-soft)]" />
                    <span>{cmd.label}</span>
                  </button>
                ))}
              </div>
              <div className="h-9 border-t border-[var(--border)] px-4 flex items-center justify-between bg-[#11161C] text-[10px] text-[var(--muted-soft)]">
                <span>Use arrows to navigate, Enter to select</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* TOAST SYSTEM POPUP */}
      <AnimatePresence>
        {showToastBar && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 bg-[#171D24] border border-[var(--accent-line)] rounded-[var(--radius-md)] px-4 py-2.5 z-[100] shadow-soft flex items-center gap-2"
          >
            <CheckCircle size={14} className="text-[var(--success)]" />
            <span className="text-xs font-semibold text-white">{toastText}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CluvioDashboard;
