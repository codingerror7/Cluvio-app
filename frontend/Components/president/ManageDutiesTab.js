"use client";

import React, { useState } from "react";
import {
  HiOutlineBriefcase,
  HiOutlinePlus,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineXMark,
} from "react-icons/hi2";

const DEFAULT_DUTIES = [
  {
    id: "task-1",
    title: "Draft promo campaign for Campus Hackathon sprint",
    assignee: "Neha Varma (PR & Social Media)",
    deadline: "Tomorrow, 5:00 PM",
    priority: "High",
    status: "In Progress",
  },
  {
    id: "task-2",
    title: "Test audio/projector in Main Auditorium for Guest Lecture",
    assignee: "Rohan Sharma (Operations)",
    deadline: "Oct 22, 2:00 PM",
    priority: "Urgent",
    status: "Todo",
  },
  {
    id: "task-3",
    title: "Review student applications for Web Development track",
    assignee: "Aditya Roy (Technical Lead)",
    deadline: "Oct 25, 6:00 PM",
    priority: "Normal",
    status: "Completed",
  },
];

export default function ManageDutiesTab({ activeClub, members = [] }) {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("broclubs_member_tasks");
        return stored ? JSON.parse(stored) : DEFAULT_DUTIES;
      } catch (e) {
        return DEFAULT_DUTIES;
      }
    }
    return DEFAULT_DUTIES;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    assignee: "",
    deadline: "Friday, 5:00 PM",
    priority: "Normal",
  });

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    try {
      localStorage.setItem("broclubs_member_tasks", JSON.stringify(newTasks));
    } catch (e) {}
  };

  const handleCreateDuty = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: form.title.trim(),
      clubName: activeClub?.name || "Campus Club",
      assignee: form.assignee || "Assigned Member",
      deadline: form.deadline,
      priority: form.priority,
      status: "Todo",
    };

    saveTasks([newTask, ...tasks]);
    setIsModalOpen(false);
    setForm({
      title: "",
      assignee: "",
      deadline: "Friday, 5:00 PM",
      priority: "Normal",
    });
  };

  const handleDeleteDuty = (id) => {
    saveTasks(tasks.filter((t) => t.id !== id));
  };

  const handleToggleStatus = (id) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const next =
          t.status === "Todo"
            ? "In Progress"
            : t.status === "In Progress"
            ? "Completed"
            : "Todo";
        return { ...t, status: next };
      }
      return t;
    });
    saveTasks(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <HiOutlineBriefcase className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  Member Duties & Tasks Delegation
                </h2>
                <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  {tasks.length} Active Assignments
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign tasks to club members. Tasks appear directly in members' dedicated Member Desk.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            <HiOutlinePlus className="text-sm" />
            <span>Assign New Duty</span>
          </button>
        </div>
      </div>

      {/* Duties List */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Assigned Committee Work ({tasks.length})
          </h3>
          <span className="text-[11px] text-slate-400">
            Click status to cycle between Todo / In Progress / Completed
          </span>
        </div>

        {tasks.length === 0 ? (
          <p className="py-8 text-center text-xs text-slate-400">
            No duties currently delegated. Click "Assign New Duty" to create one.
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`
                flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border p-4 transition-all
                ${
                  task.status === "Completed"
                    ? "border-slate-200/60 bg-slate-50/40 opacity-70"
                    : "border-slate-200 bg-white shadow-2xs hover:border-slate-300"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(task.id)}
                  className={`mt-0.5 h-4 w-4 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                    task.status === "Completed"
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-300 hover:border-slate-500"
                  }`}
                >
                  {task.status === "Completed" && (
                    <HiOutlineCheckCircle className="text-xs" />
                  )}
                </button>

                <div>
                  <h4
                    className={`text-xs sm:text-sm font-bold ${
                      task.status === "Completed"
                        ? "line-through text-slate-400"
                        : "text-slate-900"
                    }`}
                  >
                    {task.title}
                  </h4>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <HiOutlineUser className="text-slate-400" />
                      {task.assignee || "General Members"}
                    </span>
                    <span>•</span>
                    <span>Due: {task.deadline}</span>
                    <span>•</span>
                    <span
                      className={`font-semibold ${
                        task.priority === "Urgent"
                          ? "text-rose-600"
                          : task.priority === "High"
                          ? "text-amber-600"
                          : "text-blue-600"
                      }`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(task.id)}
                  className={`
                    rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase transition-all cursor-pointer
                    ${
                      task.status === "Completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : task.status === "In Progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-700"
                    }
                  `}
                >
                  {task.status}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteDuty(task.id)}
                  className="text-slate-300 hover:text-rose-600 p-1"
                  title="Delete duty"
                >
                  <HiOutlineTrash className="text-sm" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Assign New Duty Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Delegation Desk
                </span>
                <h2 className="text-lg font-black text-slate-900">
                  Assign Duty to Member
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <HiOutlineXMark className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleCreateDuty} className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Duty / Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design badges and social media promo assets"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Assign To (Member Name / Domain)
                </label>
                {members.length > 0 ? (
                  <select
                    value={form.assignee}
                    onChange={(e) =>
                      setForm({ ...form, assignee: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-2.5 outline-none focus:border-slate-900 bg-white"
                  >
                    <option value="">Select Member from Roster</option>
                    {members.map((m, i) => (
                      <option
                        key={m._id || i}
                        value={`${m.student?.name || "Member"} (${m.role || "Core"})`}
                      >
                        {m.student?.name || "Member"} - {m.role || "Core"}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder="Member Name (e.g. Neha Varma - Design)"
                    value={form.assignee}
                    onChange={(e) =>
                      setForm({ ...form, assignee: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Deadline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Friday, 5:00 PM"
                    value={form.deadline}
                    onChange={(e) =>
                      setForm({ ...form, deadline: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-slate-200 px-2.5 outline-none focus:border-slate-900 bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-2 font-bold text-white hover:bg-slate-800"
                >
                  Delegate Duty →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
