"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { api, getStoredUser } from "@/lib/api";
import Link from "next/link";

export default function ClubsGrid() {
  const router = useRouter();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null);
  const [joiningId, setJoiningId] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
    const fetchClubs = async () => {
      try {
        const res = await api.clubs.getAll();
        if (res.success && Array.isArray(res.clubs) && res.clubs.length > 0) {
          setClubs(res.clubs);
        } else {
          // Fallback initial demo clubs
          setClubs([
            {
              id: "c1",
              name: "Coding & Tech Club",
              category: "Technical",
              description: "Open-source development, competitive programming, and web technologies.",
              logo: "💻",
              membersCount: 128,
              president: { name: "Rahul Sharma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
            },
            {
              id: "c2",
              name: "Robotics & Hardware Labs",
              category: "Engineering",
              description: "Autonomous rovers, drone design, IoT electronics and hardware hackathons.",
              logo: "🤖",
              membersCount: 94,
              president: { name: "Priya Patel", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
            },
            {
              id: "c3",
              name: "Design & Visual Arts",
              category: "Creative",
              description: "UI/UX design systems, branding, photography, video production and 3D modeling.",
              logo: "🎨",
              membersCount: 82,
              president: { name: "Ananya Verma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
            },
          ]);
        }
      } catch (err) {
        console.warn("Failed to fetch clubs for landing:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClubs();
  }, []);

  const handleJoin = async (club) => {
    const currentUser = getStoredUser();
    if (!currentUser) {
      router.push("/Login");
      return;
    }

    if (currentUser.role !== "student" && currentUser.role !== "club member") {
      router.push("/president/dashboard");
      return;
    }

    setJoiningId(club.id || club._id);
    setStatusMsg(null);

    try {
      await api.requests.submit(club.id || club._id, "Joined via Featured Clubs showcase.");
      setStatusMsg({ type: "success", text: `Join request submitted for ${club.name}!` });
      const res = await api.clubs.getAll();
      if (res.success && Array.isArray(res.clubs)) {
        setClubs(res.clubs);
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: err.message || "Failed to submit request." });
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <section id="clubs" className="py-16 text-left">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <HiOutlineSparkles className="text-sm" />
            Live Database Sync
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            Discover Active Communities Ready to Grow.
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Real-time college clubs powered by live database persistence. Explore charters, meet presidents, and join with a single click.
          </p>
        </div>

        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 cursor-pointer shadow-xs"
        >
          <span>Explore All 50+ Clubs</span>
          <HiOutlineArrowRight className="text-xs" />
        </Link>
      </div>

      {statusMsg && (
        <div
          className={`mt-6 rounded-2xl p-4 text-xs flex items-center justify-between border ${
            statusMsg.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <span className="font-semibold">{statusMsg.text}</span>
          <button
            type="button"
            onClick={() => setStatusMsg(null)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Clubs Grid in Clean Light SaaS Theme */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clubs.slice(0, 6).map((club, idx) => {
          const isMember = club.isMember;
          const isPending = club.membershipStatus === "Pending";

          return (
            <div
              key={club.id || club._id || idx}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    {club.category}
                  </span>
                  <span className="text-2xl p-2 rounded-2xl bg-slate-50 border border-slate-100 shadow-2xs">
                    {club.logo || "💻"}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 tracking-tight">
                  {club.name}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {club.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={
                        club.president?.avatar ||
                        `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`
                      }
                      alt={club.president?.name || "President"}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                    />

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {club.president?.name || "Club President"}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <HiOutlineUserGroup />
                        <span>{club.membersCount || 1} members</span>
                      </div>
                    </div>
                  </div>

                  {isMember ? (
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <HiOutlineCheckCircle />
                      <span>Joined</span>
                    </span>
                  ) : isPending ? (
                    <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-bold text-amber-700 flex items-center gap-1">
                      <HiOutlineClock />
                      <span>Pending</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={joiningId === (club.id || club._id)}
                      onClick={() => handleJoin(club)}
                      className="rounded-full bg-[#2563EB] px-4.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8] transition-all cursor-pointer disabled:opacity-50"
                    >
                      {joiningId === (club.id || club._id) ? "Joining..." : "Join Club"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}