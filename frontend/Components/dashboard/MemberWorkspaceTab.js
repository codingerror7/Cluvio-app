"use client";

import React, { useState } from "react";
import {
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlinePlus,
  HiOutlineCalendarDays,
  HiOutlineVideoCamera,
  HiOutlineLink,
  HiOutlineTrash,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi2";

const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Draft promo campaign for Campus Hackathon sprint",
    clubName: "Coding & Innovation Society",
    deadline: "Tomorrow, 5:00 PM",
    priority: "High",
    status: "In Progress", // 'Todo' | 'In Progress' | 'Completed'
  },
  {
    id: "task-2",
    title: "Test audio/projector in Main Auditorium for Guest Lecture",
    clubName: "Coding & Innovation Society",
    deadline: "Oct 22, 2:00 PM",
    priority: "Urgent",
    status: "Todo",
  },
  {
    id: "task-3",
    title: "Review student applications for Web Development track",
    clubName: "Coding & Innovation Society",
    deadline: "Oct 25, 6:00 PM",
    priority: "Normal",
    status: "Completed",
  },
];

const UPCOMING_MEETINGS = [
  {
    id: "meet-1",
    title: "Weekly Core Executive Committee Standup",
    clubName: "Coding & Innovation Society",
    date: "Every Wednesday",
    time: "5:00 PM - 5:45 PM",
    venue: "Lab 304 / Google Meet",
    link: "https://meet.google.com/campus-core-sync",
    agenda: "Review upcoming hackathon sponsorship, domain deliverables, and lab schedule.",
  },
  {
    id: "meet-2",
    title: "Hackathon Logistics & Hardware Pre-check",
    clubName: "Coding & Innovation Society",
    date: "Saturday, Oct 26",
    time: "3:00 PM - 4:00 PM",
    venue: "Innovation Hub Floor 2",
    link: "https://meet.google.com/hack-logistics-check",
    agenda: "Distribute volunteer badges, test high-speed Wi-Fi router setup, and verify mentor room.",
  },
];

export default function MemberWorkspaceTab({ user, joinedClubs = [] }) {
  const [tasks, setTasks] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("broclubs_member_tasks");
        return stored ? JSON.parse(stored) : INITIAL_TASKS;
      } catch (e) {
        return INITIAL_TASKS;
      }
    }
    return INITIAL_TASKS;
  });

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Normal");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    try {
      localStorage.setItem("broclubs_member_tasks", JSON.stringify(newTasks));
    } catch (e) {}
  };

  const handleToggleStatus = (taskId) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        const nextStatus =
          t.status === "Todo"
            ? "In Progress"
            : t.status === "In Progress"
            ? "Completed"
            : "Todo";
        return { ...t, status: nextStatus };
      }
      return t;
    });
    saveTasks(updated);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      clubName: joinedClubs[0]?.name || "Campus Club",
      deadline: "Due This Week",
      priority: newTaskPriority,
      status: "Todo",
    };

    saveTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setIsAddingTask(false);
  };

  const handleDeleteTask = (taskId) => {
    saveTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Member Desk */}
      <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50/70 via-white to-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <HiOutlineBriefcase className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  Member Desk & Committee Duties
                </h2>
                <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Internal coordination tools for student leaders and active society organizers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="rounded-2xl border border-emerald-200 bg-white p-3 text-right shadow-2xs">
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Active Duties
              </p>
              <p className="text-base font-bold text-emerald-800">
                {tasks.filter((t) => t.status !== "Completed").length} Incomplete
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Tasks & Upcoming Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Assigned Tasks */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Club Duties & Assigned Tasks
                </h3>
                <p className="text-xs text-slate-500">
                  Click status pill to cycle between Todo, In Progress, and Completed.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 shadow-xs cursor-pointer"
              >
                <HiOutlinePlus className="text-xs" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Quick Add Form */}
            {isAddingTask && (
              <form
                onSubmit={handleAddTask}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2.5 animate-in fade-in"
              >
                <input
                  type="text"
                  required
                  placeholder="Task title (e.g., Finalize mentor certificates)"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="h-9 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none focus:border-slate-900"
                />
                <div className="flex items-center justify-between">
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs outline-none"
                  >
                    <option value="Normal">Normal Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Urgent">Urgent Priority</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingTask(false)}
                      className="rounded-lg px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Tasks List */}
            <div className="space-y-2.5 pt-1">
              {tasks.length === 0 ? (
                <p className="py-6 text-center text-xs text-slate-400">
                  No active duties assigned. Great job!
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`
                      flex items-start justify-between gap-3 rounded-2xl border p-3.5 transition-all
                      ${
                        task.status === "Completed"
                          ? "border-slate-200/70 bg-slate-50/50 opacity-70"
                          : "border-slate-200 bg-white shadow-2xs hover:border-slate-300"
                      }
                    `}
                  >
                    <div className="flex items-start gap-2.5">
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
                        <p
                          className={`text-xs font-bold ${
                            task.status === "Completed"
                              ? "line-through text-slate-400"
                              : "text-slate-900"
                          }`}
                        >
                          {task.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                          <span>{task.clubName}</span>
                          <span>•</span>
                          <span>{task.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(task.id)}
                        className={`
                          rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase transition-all cursor-pointer
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
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-slate-300 hover:text-rose-600 p-1"
                        title="Delete task"
                      >
                        <HiOutlineTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Committee Standups & Meetings */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Executive Meetings & Syncs
              </h3>
              <p className="text-xs text-slate-500">
                Regular club committee standups and planning calls.
              </p>
            </div>

            <div className="space-y-3">
              {UPCOMING_MEETINGS.map((meet) => (
                <div
                  key={meet.id}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900">
                      {meet.title}
                    </h4>
                    <span className="rounded bg-blue-100 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-800 shrink-0">
                      Sync Call
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {meet.agenda}
                  </p>

                  <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-200/60">
                    <div className="flex items-center gap-1.5">
                      <HiOutlineCalendarDays className="text-slate-400 text-xs" />
                      <span>{meet.date} ({meet.time})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <HiOutlineVideoCamera className="text-slate-400 text-xs" />
                      <span className="truncate">{meet.venue}</span>
                    </div>
                  </div>

                  <a
                    href={meet.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2 shadow-xs transition-colors"
                  >
                    <span>Join Standup Room</span>
                    <HiOutlineLink className="text-xs" />
                  </a>
                </div>
              ))}
            </div>

            {/* Committee Quick Links */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Shared Club Assets
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Opened shared Google Drive repository.");
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <HiOutlineDocumentDuplicate className="text-slate-400" />
                  <span className="truncate text-[11px]">Design Assets ↗</span>
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Opened event templates and budgeting sheet.");
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  <HiOutlineSparkles className="text-slate-400" />
                  <span className="truncate text-[11px]">Event Sheet ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
