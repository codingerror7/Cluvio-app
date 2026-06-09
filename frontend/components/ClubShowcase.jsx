"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Megaphone, Compass, Search, Filter, Plus, Mail, MessageSquare, Send, Check } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export const ClubShowcase = () => {
  const showcaseData = [
    {
      id: "members",
      tag: "Members",
      icon: <Users className="w-4 h-4 text-indigo-400" />,
      title: "Manage Members with Perfect Clarity",
      description: "A centralized, searchable directory containing active student profiles, automated dues tracking, custom roles, and participation history. Keep your community organized and accessible in one unified directory.",
      visual: (
        <Card glow className="w-full max-w-md p-5 border-white/[0.06] bg-neutral-950/80 shadow-premium">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.04]">
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search roster..." 
                disabled 
                className="bg-transparent text-xs text-white placeholder-text-muted focus:outline-none w-24"
              />
            </div>
            <div className="flex gap-2">
              <span className="p-1 rounded bg-white/5 border border-border-custom text-text-muted text-[10px] flex items-center gap-1">
                <Filter className="w-2.5 h-2.5" /> Filter
              </span>
              <span className="p-1 rounded bg-brand-primary text-white text-[10px] flex items-center gap-1 font-medium">
                <Plus className="w-2.5 h-2.5" /> Add
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: "Jessica Song", role: "Treasurer", email: "jessica@university.edu", status: "Active" },
              { name: "Liam O'Connor", role: "Lead Designer", email: "liam.oc@university.edu", status: "Active" },
              { name: "Marcus Vane", role: "General Member", email: "m.vane@university.edu", status: "Pending" }
            ].map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] font-semibold text-white">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{member.name}</div>
                    <div className="text-[10px] text-text-muted">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-medium text-text-muted px-2 py-0.5 bg-neutral-900 border border-border-custom rounded-md">
                    {member.role}
                  </span>
                  <Badge variant={member.status === "Active" ? "success" : "warning"} className="text-[9px] px-1.5 py-0">
                    {member.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )
    },
    {
      id: "events",
      tag: "Events",
      icon: <Calendar className="w-4 h-4 text-purple-400" />,
      title: "Plan Events & Track RSVPs Seamlessly",
      description: "Create fully customizable landing pages for meetings, workshops, and social events. Monitor attendee registration, send automated push reminders, and scan digital check-ins dynamically at the door.",
      visual: (
        <Card glow className="w-full max-w-md p-5 border-white/[0.06] bg-neutral-950/80 shadow-premium">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 border border-brand-secondary/20 mb-4">
            <div className="text-xs font-bold text-brand-secondary uppercase tracking-wider mb-1">Upcoming Event</div>
            <h4 className="text-base font-bold text-white mb-2">Winter Tech Symposium 2026</h4>
            <div className="flex items-center gap-4 text-[11px] text-text-muted mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Jan 18, 6:00 PM</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 84 Registered</span>
            </div>
            
            <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/[0.04]">
              <span className="text-xs font-medium text-white">Ticket Status</span>
              <Badge variant="success">Confirmed RSVP</Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs">View Registrations</Button>
            <Button variant="primary" size="sm" className="flex-1 text-xs">Edit Page</Button>
          </div>
        </Card>
      )
    },
    {
      id: "announcements",
      tag: "Announcements",
      icon: <Megaphone className="w-4 h-4 text-amber-400" />,
      title: "Reach Your Members, Wherever They Are",
      description: "Draft announcements once and dispatch them across multiple platforms simultaneously. With built-in integrations for Slack, Email, and SMS, ensure high priority updates never get buried in busy chat rooms.",
      visual: (
        <Card glow className="w-full max-w-md p-5 border-white/[0.06] bg-neutral-950/80 shadow-premium">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <span className="text-xs font-bold text-white">New Broadcast</span>
              <Badge variant="primary" className="text-[10px]">Ready</Badge>
            </div>
            <div>
              <label className="text-[10px] text-text-muted block mb-1">Subject</label>
              <div className="w-full bg-white/5 border border-border-custom rounded-lg px-3 py-1.5 text-xs text-white">
                Final Call: Applications Close Tonight
              </div>
            </div>
            <div>
              <label className="text-[10px] text-text-muted block mb-1">Deliver To</label>
              <div className="flex gap-2">
                {["Email", "Slack", "Discord"].map((ch) => (
                  <div key={ch} className="flex-1 flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-[10px] text-white font-medium">
                    <Check className="w-2.5 h-2.5 text-indigo-400" /> {ch}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <span className="text-xs text-text-muted flex items-center gap-1 py-1.5 px-3">
                <Mail className="w-3.5 h-3.5" /> Save Draft
              </span>
              <Button variant="primary" size="sm" className="gap-1.5 text-xs">
                Send <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>
      )
    },
    {
      id: "communities",
      tag: "Communities",
      icon: <Compass className="w-4 h-4 text-emerald-400" />,
      title: "Organize Subgroups and Committees",
      description: "Break your organization down into focused departments, event committees, or graduation cohorts. Keep conversations productive and file uploads structured with customized moderation guidelines.",
      visual: (
        <Card glow className="w-full max-w-md p-5 border-white/[0.06] bg-neutral-950/80 shadow-premium">
          <div className="space-y-3">
            <div className="text-xs font-bold text-white mb-2">Active Channels</div>
            {[
              { name: "Executive Committee", count: 8, activity: "Active 5m ago" },
              { name: "Marketing & Design", count: 14, activity: "New upload by Liam" },
              { name: "Hackathon Volunteers", count: 32, activity: "Active 1h ago" }
            ].map((ch, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.01] border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-border-custom flex items-center justify-center text-text-muted">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      #{ch.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}
                    </div>
                    <div className="text-[10px] text-text-muted">{ch.activity}</div>
                  </div>
                </div>
                <div className="text-[10px] text-text-muted font-medium bg-white/5 px-2 py-0.5 rounded-md">
                  {ch.count} members
                </div>
              </div>
            ))}
          </div>
        </Card>
      )
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-black">
      {/* Dynamic light glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-glow-radial opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-glow-radial-secondary opacity-25 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <Badge variant="primary" className="mb-4">
            Product Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Everything your club needs, <br />
            integrated in one sleek workspace.
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Stop stitching together generic messaging tools, spreadsheets, and calendar apps. Cluvio provides a dedicated center designed specifically for modern club operations.
          </p>
        </div>

        {/* Feature Sections (Alternating) */}
        <div className="space-y-32">
          {showcaseData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                
                {/* Visual Card (Swaps side based on alternating index) */}
                <div 
                  className={`lg:col-span-6 flex justify-center ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex justify-center"
                  >
                    {item.visual}
                  </motion.div>
                </div>

                {/* Text Content */}
                <div 
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2 text-brand-primary">
                      <div className="p-1.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20">
                        {item.icon}
                      </div>
                      <span className="text-xs font-semibold tracking-wider uppercase">{item.tag}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="pt-4">
                      <a 
                        href="#contact" 
                        className="inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-brand-primary transition-colors group"
                      >
                        Learn more about {item.tag.toLowerCase()}{" "}
                        <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
                      </a>
                    </div>
                  </motion.div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ClubShowcase;
