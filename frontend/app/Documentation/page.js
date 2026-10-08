"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/Landing/Footer";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineUserGroup,
  HiOutlineCog6Tooth,
  HiOutlineSparkles,
  HiOutlineInformationCircle,
  HiOutlineLightBulb,
  HiOutlineExclamationTriangle,
  HiOutlineCheck,
  HiOutlineBars3BottomLeft,
  HiOutlineXMark,
  HiOutlineArrowRight,
  HiOutlineTicket,
  HiOutlineBell,
} from "react-icons/hi2";

const docsData = [
  {
    id: "intro",
    category: "Getting Started",
    title: "Introduction to Cluvio",
    role: "all",
    lastUpdated: "October 2026",
    content: {
      summary:
        "Cluvio is the unified operating system for college clubs, extracurricular activities, and campus leadership.",
      sections: [
        {
          heading: "What is Cluvio?",
          body: "Cluvio replaces fragmented WhatsApp chats, paper sign-up sheets, and disconnected spreadsheets with a single, verified campus workspace. Whether you are a student discovering clubs or a club president running a technical society, Cluvio provides the digital infrastructure to streamline community engagement.",
        },
        {
          heading: "Core Principles",
          bullets: [
            "Verified Campus Identity: Official student enrollment validation prevents anonymous trolling and fake accounts.",
            "Centralized Discovery: All official campus clubs live in one searchable directory with clear categorization.",
            "Unified Event Passes: 1-click RSVP with built-in QR ticket check-ins and attendance verification.",
            "Operational Autonomy: Club presidents manage their committees and announcements without bureaucratic delays.",
          ],
        },
      ],
      callout: {
        type: "note",
        title: "Campus Access Note",
        message:
          "Cluvio accounts are tied to your official university enrollment number. Make sure to register with your verified campus email address.",
      },
    },
  },
  {
    id: "account-setup",
    category: "Getting Started",
    title: "Creating Your Account",
    role: "all",
    lastUpdated: "October 2026",
    content: {
      summary:
        "Step-by-step guide on creating and verifying your Cluvio Student or Club President profile.",
      sections: [
        {
          heading: "Choosing the Right Role",
          body: "During registration, Cluvio prompts you to select either a 'Student' or 'Club President' account. Students can browse, join, and RSVP to events across campus. Club Presidents receive an additional command console to manage their organization's roster, events, and broadcast notices.",
        },
        {
          heading: "Required Information",
          bullets: [
            "Enrollment / Student ID Number (as issued by the college registrar)",
            "Full Legal Name",
            "College or Personal Email Address",
            "Secure Password (minimum 8 characters)",
          ],
        },
      ],
      callout: {
        type: "tip",
        title: "Pro-Tip for Freshmen",
        message:
          "If your enrollment number has not been issued yet, consult your campus admissions coordinator for temporary credential provisioning.",
      },
    },
  },
  {
    id: "student-discovery",
    category: "Students",
    title: "Discovering & Joining Clubs",
    role: "student",
    lastUpdated: "October 2026",
    content: {
      summary:
        "How to search, filter, and become a verified member of active student societies.",
      sections: [
        {
          heading: "Filtering by Domain",
          body: "The Cluvio directory groups student organizations into distinct domains: Technology, Creative Design, Artificial Intelligence, Robotics, Cultural & Performing Arts, and Entrepreneurship. Use the search bar to locate specific clubs by name, keywords, or faculty advisor.",
        },
        {
          heading: "Joining a Club",
          body: "Clubs on Cluvio operate under two formats: Open Membership (instant 1-click enrollment) and Application-Based (requires portfolio submission or technical audition). Check the club profile badge to determine recruitment status.",
        },
      ],
      callout: {
        type: "important",
        title: "Audition Deadlines",
        message:
          "Competitive technical and cultural clubs hold formal recruitments during the first two weeks of each semester. Submit applications early to secure audition slots.",
      },
    },
  },
  {
    id: "student-events",
    category: "Students",
    title: "Participating in Campus Events",
    role: "student",
    lastUpdated: "October 2026",
    content: {
      summary:
        "RSVPing for workshops, hackathons, and symposiums with digital QR passes.",
      sections: [
        {
          heading: "1-Click Ticket Reservation",
          body: "When a club publishes an upcoming workshop or conference, verified students can RSVP with a single click. Your pass is automatically saved to your Cluvio dashboard and sent with a calendar invite.",
        },
        {
          heading: "QR Attendance Check-in",
          body: "At the event entrance, simply display your unique event QR code from the Cluvio mobile web app. The organizing executive team will scan your code to log verified attendance.",
        },
      ],
    },
  },
  {
    id: "president-roster",
    category: "Club Presidents",
    title: "Managing Club Members & Rosters",
    role: "president",
    lastUpdated: "October 2026",
    content: {
      summary:
        "Accepting applicants, assigning committee leads, and managing permissions.",
      sections: [
        {
          heading: "Reviewing Applications",
          body: "Access the 'Presidents Console' to review pending student membership requests. You can inspect the applicant's major, semester, enrollment ID, and portfolio links before approving them with one click.",
        },
        {
          heading: "Executive Committee Roles",
          bullets: [
            "Vice President: Can create events, approve members, and edit club details.",
            "Treasurer: Access to event budget allocations and ticket limit caps.",
            "Technical / Creative Lead: Can publish workshop agendas and resources.",
            "General Member: Can view internal notices and participate in discussions.",
          ],
        },
      ],
      callout: {
        type: "tip",
        title: "Automated Welcome Broadcast",
        message:
          "You can configure an automated welcome message that delivers immediately upon approving any new candidate.",
      },
    },
  },
  {
    id: "president-events",
    category: "Club Presidents",
    title: "Creating Events & Tracking Attendance",
    role: "president",
    lastUpdated: "October 2026",
    content: {
      summary:
        "Publishing multi-track events, setting seat caps, and generating scanner codes.",
      sections: [
        {
          heading: "Publishing a New Event",
          body: "Provide an event title, date/time, campus hall/auditorium venue, RSVP maximum capacity, and cover banner. Once approved, the event immediately features on the public campus calendar.",
        },
        {
          heading: "Door Scanning & Real-time Turnout",
          body: "Use the Cluvio Mobile Scanner tool to scan attendee QR tickets in under 2 seconds. The dashboard displays live turnout numbers and generates an attendance report exportable as CSV.",
        },
      ],
    },
  },
  {
    id: "account-security",
    category: "Account",
    title: "Privacy, Data & Security",
    role: "all",
    lastUpdated: "October 2026",
    content: {
      summary:
        "Learn how Cluvio safeguards student privacy, prevents spam, and enforces safety.",
      sections: [
        {
          heading: "Campus Privacy Standards",
          body: "Your personal contact number is never published publicly. Only verified club executive leads of clubs you have explicitly joined can view your official academic email address for event coordination.",
        },
        {
          heading: "Role Revocation & Handover",
          body: "At the end of an academic year, outgoing club presidents can initiate an executive handover, transferring console privileges to the incoming president with full audit logging.",
        },
      ],
      callout: {
        type: "note",
        title: "Data Protection Guarantee",
        message:
          "Cluvio adheres to institutional student privacy standards. Extracurricular data is strictly used for campus community engagement.",
      },
    },
  },
];

const categories = [
  { name: "Getting Started", icon: HiOutlineBookOpen },
  { name: "Students", icon: HiOutlineAcademicCap },
  { name: "Club Presidents", icon: HiOutlineShieldCheck },
  { name: "Account", icon: HiOutlineCog6Tooth },
];

export default function DocumentationPage() {
  const [activeDocId, setActiveDocId] = useState("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Filter docs based on search and role
  const filteredDocs = docsData.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "all" || doc.role === "all" || doc.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const currentDoc =
    docsData.find((d) => d.id === activeDocId) || docsData[0];

  return (
    <div className="min-h-screen bg-[#070B13] text-white selection:bg-[var(--accent)] selection:text-black">
      <Navbar />

      <main className="relative">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[650px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />

        {/* 1. DOCUMENTATION HERO & SEARCH */}
        <section className="border-b border-white/10 bg-[#0B1120]/50 px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold text-[var(--accent)]">
              <HiOutlineSparkles className="text-sm" />
              <span>CLUVIO KNOWLEDGE BASE</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Cluvio Documentation
            </h1>

            <p className="mt-3 text-base text-white/60 sm:text-lg">
              Everything you need to discover, participate, and lead campus organizations.
            </p>

            {/* Interactive Search Bar */}
            <div className="relative mt-8 mx-auto max-w-2xl">
              <HiOutlineMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documentation, guides, and workflows..."
                className="h-13 w-full rounded-2xl border border-white/10 bg-[#111827] pl-12 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Role Filters */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-white/40 mr-1">Browse by:</span>
              {[
                { id: "all", label: "All Docs" },
                { id: "student", label: "For Students" },
                { id: "president", label: "For Club Presidents" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setRoleFilter(pill.id)}
                  className={`
                    rounded-full px-3.5 py-1 text-xs font-medium transition-all
                    ${
                      roleFilter === pill.id
                        ? "bg-[var(--accent)] text-black font-semibold"
                        : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. MAIN DOCUMENTATION WORKSPACE */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Mobile Drawer Toggle */}
          <div className="flex lg:hidden items-center justify-between rounded-xl border border-white/10 bg-[#111827] p-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-white/70">
              <HiOutlineBookOpen className="text-base text-[var(--accent)]" />
              <span>
                Current: <strong>{currentDoc.title}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/15"
            >
              {mobileNavOpen ? <HiOutlineXMark /> : <HiOutlineBars3BottomLeft />}
              <span>{mobileNavOpen ? "Close Menu" : "Browse Docs"}</span>
            </button>
          </div>

          <div className="grid gap-10 lg:grid-cols-12">
            {/* LEFT SIDEBAR NAVIGATION */}
            <aside
              className={`
                lg:col-span-3 lg:block
                ${mobileNavOpen ? "block mb-6" : "hidden"}
              `}
            >
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#111827]/80 p-5 backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Table of Contents
                  </span>
                  <span className="text-[11px] font-mono text-[var(--accent)]">
                    {filteredDocs.length} Guides
                  </span>
                </div>

                {categories.map((cat) => {
                  const CategoryIcon = cat.icon;
                  const catDocs = filteredDocs.filter(
                    (d) => d.category === cat.name
                  );
                  if (catDocs.length === 0) return null;

                  return (
                    <div key={cat.name} className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                        <CategoryIcon className="text-sm text-[var(--accent)]" />
                        <span>{cat.name}</span>
                      </div>

                      <ul className="space-y-1 pl-3 border-l border-white/10">
                        {catDocs.map((doc) => {
                          const isSelected = doc.id === currentDoc.id;
                          return (
                            <li key={doc.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDocId(doc.id);
                                  setMobileNavOpen(false);
                                  window.scrollTo({ top: 380, behavior: "smooth" });
                                }}
                                className={`
                                  w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-all
                                  ${
                                    isSelected
                                      ? "bg-[var(--accent)]/15 font-semibold text-[var(--accent)] border-l-2 border-[var(--accent)]"
                                      : "text-white/50 hover:bg-white/5 hover:text-white"
                                  }
                                `}
                              >
                                {doc.title}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* CENTER ARTICLE CONTENT */}
            <article className="lg:col-span-6 xl:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-[#111827] p-7 sm:p-10 shadow-2xl">
                {/* Article Header Meta */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>Docs</span>
                    <span>/</span>
                    <span>{currentDoc.category}</span>
                  </div>
                  <span className="text-[11px] text-white/40">
                    {currentDoc.lastUpdated}
                  </span>
                </div>

                {/* Article Title */}
                <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {currentDoc.title}
                </h1>

                {/* Summary Lead */}
                <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
                  {currentDoc.content.summary}
                </p>

                {/* Callout Box if present */}
                {currentDoc.content.callout && (
                  <div
                    className={`
                      mt-8 rounded-2xl p-5 border text-xs sm:text-sm leading-relaxed
                      ${
                        currentDoc.content.callout.type === "tip"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : currentDoc.content.callout.type === "important"
                          ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                          : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                      }
                    `}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1">
                      {currentDoc.content.callout.type === "tip" ? (
                        <HiOutlineLightBulb className="text-base" />
                      ) : currentDoc.content.callout.type === "important" ? (
                        <HiOutlineExclamationTriangle className="text-base" />
                      ) : (
                        <HiOutlineInformationCircle className="text-base" />
                      )}
                      <span>{currentDoc.content.callout.title}</span>
                    </div>
                    <p>{currentDoc.content.callout.message}</p>
                  </div>
                )}

                {/* Article Body Sections */}
                <div className="mt-10 space-y-8 border-t border-white/10 pt-8">
                  {currentDoc.content.sections.map((sec, idx) => (
                    <section key={idx} id={`section-${idx}`}>
                      <h2 className="text-xl font-bold text-white sm:text-2xl">
                        {sec.heading}
                      </h2>
                      {sec.body && (
                        <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                          {sec.body}
                        </p>
                      )}
                      {sec.bullets && (
                        <ul className="mt-4 space-y-2.5 pl-2">
                          {sec.bullets.map((b, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70"
                            >
                              <HiOutlineCheck className="mt-1 text-sm text-[var(--accent)] shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>

                {/* Article Footer Feedback */}
                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50">
                  <span>Was this article helpful to you?</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      👍 Yes, thanks
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      👎 Could be improved
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* RIGHT SIDEBAR — "ON THIS PAGE" TOC */}
            <aside className="hidden xl:col-span-3 xl:block">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-[#111827]/60 p-5 backdrop-blur-md">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40 block mb-3">
                  On this page
                </span>
                <ul className="space-y-2 text-xs">
                  {currentDoc.content.sections.map((sec, sIdx) => (
                    <li key={sIdx}>
                      <a
                        href={`#section-${sIdx}`}
                        className="text-white/60 hover:text-[var(--accent)] transition-colors block py-0.5"
                      >
                        {sec.heading}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-white/10 pt-4">
                  <span className="text-xs font-semibold text-white block mb-2">
                    Need further help?
                  </span>
                  <p className="text-[11px] text-white/50 leading-relaxed">
                    Contact the campus support desk or submit a ticket.
                  </p>
                  <Link
                    href="/Contact"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    <span>Campus Support Team</span>
                    <HiOutlineArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
