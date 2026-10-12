"use client";

import React, { useState } from "react";
import {
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineUserGroup,
  HiOutlineMagnifyingGlass,
  HiOutlineBookmark,
} from "react-icons/hi2";

const DEFAULT_CAMPUS_EVENTS = [
  {
    id: "evt-1",
    title: "Full-Stack Next.js 15 & Server Actions Masterclass",
    clubName: "Coding & Innovation Society",
    clubLogo: "💻",
    category: "Workshop",
    date: "Oct 24, 2026",
    time: "4:00 PM - 6:30 PM",
    venue: "Main Campus Auditorium - Lab 3",
    mode: "In-Person Hands-on",
    speaker: "Lead Campus Software Architect",
    attendeesCount: 84,
    maxSeats: 120,
    description:
      "Deep dive into Next.js 15 App Router architecture, server components, streaming SSR, and scalable MongoDB aggregations.",
  },
  {
    id: "evt-2",
    title: "Building LLM Autonomous Agents with LangChain",
    clubName: "Data Science & AI Club",
    clubLogo: "🤖",
    category: "Tech Talk",
    date: "Oct 29, 2026",
    time: "5:00 PM - 7:00 PM",
    venue: "Google Meet Virtual Hall",
    mode: "Virtual Session",
    speaker: "AI Research Fellow",
    attendeesCount: 142,
    maxSeats: 250,
    description:
      "Hands-on demonstration constructing multi-agent architectures, function calling, tool use, and evaluation benchmarks.",
  },
  {
    id: "evt-3",
    title: "UI/UX Figma Components & Micro-interactions Jam",
    clubName: "Design & Creative Guild",
    clubLogo: "🎨",
    category: "Workshop",
    date: "Nov 04, 2026",
    time: "3:30 PM - 5:30 PM",
    venue: "Design Media Studio, Block B",
    mode: "In-Person Workshop",
    speaker: "Senior Product Designer",
    attendeesCount: 45,
    maxSeats: 60,
    description:
      "Interactive workshop crafting state machines, smart animate interactions, and scalable token systems in Figma.",
  },
  {
    id: "evt-4",
    title: "Robotics & Microcontroller IoT Hack Sprint Prep",
    clubName: "Engineering & Social Impact Guild",
    clubLogo: "🌱",
    category: "Hands-on",
    date: "Nov 08, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Robotics Mechatronics Lab",
    mode: "Hardware Lab Session",
    speaker: "Faculty Club Advisor",
    attendeesCount: 38,
    maxSeats: 50,
    description:
      "Hands-on sensor calibration, ESP32 Wi-Fi telemetry, MQTT message brokers, and rapid hardware assembly.",
  },
];

export default function EventsTab({ clubs = [] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All"); // 'All' | 'Workshops' | 'Tech Talks' | 'My RSVPs'
  const [rsvps, setRsvps] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("broclubs_event_rsvps");
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  const toggleRsvp = (eventId) => {
    let updated;
    if (rsvps.includes(eventId)) {
      updated = rsvps.filter((id) => id !== eventId);
    } else {
      updated = [...rsvps, eventId];
    }
    setRsvps(updated);
    try {
      localStorage.setItem("broclubs_event_rsvps", JSON.stringify(updated));
    } catch (e) {}
  };

  // Combine default campus events with any events created inside clubs
  const clubEvents = clubs.flatMap((c) =>
    (c.recentEvents || []).map((ev, i) => ({
      id: ev._id || `club-ev-${c._id || c.id}-${i}`,
      title: ev.title,
      clubName: c.name,
      clubLogo: c.logo || "📌",
      category: "Club Session",
      date: ev.date || "Upcoming",
      time: "5:00 PM",
      venue: ev.location || "Campus Center",
      mode: "Campus Activity",
      description: ev.description || "Official club activity meetup.",
      attendeesCount: 25,
      maxSeats: 100,
    }))
  );

  const allEvents = [...DEFAULT_CAMPUS_EVENTS, ...clubEvents];

  const filteredEvents = allEvents.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.clubName.toLowerCase().includes(search.toLowerCase()) ||
      ev.venue.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === "My RSVPs") {
      return rsvps.includes(ev.id);
    }
    if (filter === "Workshops") {
      return ev.category === "Workshop";
    }
    if (filter === "Tech Talks") {
      return ev.category === "Tech Talk";
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <HiOutlineCalendarDays className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  Campus Events & Workshops
                </h2>
                <span className="rounded-full bg-blue-100 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                  {allEvents.length} Sessions
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Technical bootcamps, masterclasses, and committee meetups.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
              My RSVPs: {rsvps.length}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {["All", "Workshops", "Tech Talks", "My RSVPs"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`
                  rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap
                  ${
                    filter === f
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              placeholder="Search events, topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-8 pr-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <HiOutlineCalendarDays className="mx-auto text-3xl text-slate-300 mb-2" />
            <h3 className="text-sm font-bold text-slate-800">
              No campus events found
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search criteria or switch to 'All' events.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const hasRsvp = rsvps.includes(event.id);

            return (
              <div
                key={event.id}
                className={`
                  rounded-3xl border bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-200 hover:shadow-md
                  ${
                    hasRsvp
                      ? "border-blue-300 ring-1 ring-blue-500/20 bg-gradient-to-b from-blue-50/15 via-white to-white"
                      : "border-slate-200/90 hover:border-slate-300"
                  }
                `}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl border border-slate-200/70">
                        {event.clubLogo}
                      </span>
                      <div>
                        <span className="text-[11px] font-bold text-slate-500">
                          {event.clubName}
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-slate-900 mt-0.5 leading-snug">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 shrink-0 border border-slate-200/60">
                      {event.category}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-600 border-y border-slate-100 py-3">
                    <div className="flex items-center gap-1.5">
                      <HiOutlineCalendarDays className="text-slate-400 text-sm shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HiOutlineClock className="text-slate-400 text-sm shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <HiOutlineMapPin className="text-slate-400 text-sm shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <HiOutlineUserGroup className="text-slate-400" />
                    <span>
                      {event.attendeesCount + (hasRsvp ? 1 : 0)} Attending
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleRsvp(event.id)}
                    className={`
                      rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-xs
                      ${
                        hasRsvp
                          ? "bg-blue-50 border border-blue-200 text-blue-700 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700"
                          : "bg-slate-900 text-white hover:bg-slate-800"
                      }
                    `}
                  >
                    {hasRsvp ? "✓ RSVP Confirmed" : "RSVP / Attend"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
