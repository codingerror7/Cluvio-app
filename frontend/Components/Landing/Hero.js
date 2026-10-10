"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineUserGroup, HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import { api, getStoredUser } from "@/lib/api";

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
        if (res.success && Array.isArray(res.clubs)) {
          setClubs(res.clubs);
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

    if (currentUser.role !== "student") {
      router.push("/president/dashboard");
      return;
    }

    setJoiningId(club.id || club._id);
    setStatusMsg(null);

    try {
      await api.requests.submit(club.id || club._id, "Joined via Featured Clubs showcase.");
      setStatusMsg({ type: "success", text: `Join request submitted for ${club.name}!` });
      // Refresh clubs to get updated status
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

  const colors = [
    "from-cyan-500/20 to-blue-600/5",
    "from-pink-500/20 to-purple-600/5",
    "from-violet-500/20 to-indigo-600/5",
    "from-orange-500/20 to-red-500/5",
    "from-emerald-500/20 to-green-600/5",
    "from-sky-500/20 to-cyan-600/5",
  ];

  return (
    <section className="rounded-[32px] bg-transparent p-6 shadow-[0_20px_80px_rgba(2,8,23,0.25)] sm:p-8 lg:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-[var(--accent)]">
            Featured Clubs
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Discover active communities ready to grow.
          </h2>
          <p className="mt-3 text-base leading-7 text-white/60">
            Real-time college clubs powered by live database persistence. Explore charters, meet presidents, and join with a single click.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            const currentUser = getStoredUser();
            if (currentUser?.role === "president") router.push("/president/dashboard");
            else if (currentUser) router.push("/dashboard");
            else router.push("/Login");
          }}
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          Explore All Clubs
        </button>
      </div>

      {statusMsg && (
        <div
          className={`mt-6 rounded-2xl p-4 text-xs flex items-center justify-between border ${
            statusMsg.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border-rose-500/30 text-rose-300"
          }`}
        >
          <span>{statusMsg.text}</span>
          <button type="button" onClick={() => setStatusMsg(null)} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {clubs.map((club, idx) => {
          const colorGradient = colors[idx % colors.length];
          const isMember = club.isMember;
          const isPending = club.membershipStatus === "Pending";

          return (
            <div
              key={club.id || club._id || idx}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111827] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} opacity-100`} />

              <div className="relative flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                    {club.category}
                  </span>
                  <span className="text-2xl p-1.5 rounded-xl bg-white/5 border border-white/10">
                    {club.logo || "💻"}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold text-white">{club.name}</h3>
                <p className="mt-3 flex-1 leading-7 text-white/60 line-clamp-3">{club.description}</p>

                <div className="my-6 h-px bg-white/10" />

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        club.president?.avatar ||
                        `https://i.pravatar.cc/150?img=${(idx % 50) + 10}`
                      }
                      alt={club.president?.name || "President"}
                      className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/10"
                    />

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {club.president?.name || "President"}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-white/45">
                        <HiOutlineUserGroup />
                        <span>{club.membersCount || 1} members</span>
                      </div>
                    </div>
                  </div>

                  {isMember ? (
                    <span className="rounded-2xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-300 flex items-center gap-1">
                      <HiOutlineCheckCircle />
                      <span>Joined</span>
                    </span>
                  ) : isPending ? (
                    <span className="rounded-2xl bg-amber-500/20 border border-amber-500/40 px-3.5 py-2 text-xs font-bold text-amber-300 flex items-center gap-1">
                      <HiOutlineClock />
                      <span>Pending</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={joiningId === (club.id || club._id)}
                      onClick={() => handleJoin(club)}
                      className="rounded-2xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105 cursor-pointer disabled:opacity-50"
                    >
                      {joiningId === (club.id || club._id) ? "Joining..." : "Join"}
                    </button>
                  )}
                </div>
              </div>

              <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          );
        })}
      </div>
    </section>
  );
}