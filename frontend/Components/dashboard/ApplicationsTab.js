"use client";

import React from "react";
import {
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineCalendarDays,
  HiOutlineVideoCamera,
  HiOutlineMapPin,
  HiOutlineTrash,
} from "react-icons/hi2";

export default function ApplicationsTab({
  requests = [],
  onCancelRequest,
  onExploreClubs,
}) {
  const pendingCount = requests.filter(
    (r) => r.status === "Pending" || r.status === "Interview Scheduled"
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <HiOutlineDocumentText className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900">
                  My Applications Tracker
                </h2>
                {pendingCount > 0 && (
                  <span className="rounded-full bg-blue-100 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                    {pendingCount} Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time review status of your student club membership submissions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExploreClubs}
            className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold transition-all shadow-xs"
          >
            Explore More Clubs →
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <HiOutlineDocumentText className="mx-auto text-3xl text-slate-300 mb-2" />
            <h3 className="text-sm font-bold text-slate-800">
              No applications submitted yet
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              You haven't submitted any club membership applications. Explore active campus clubs and register to join.
            </p>
            <button
              type="button"
              onClick={onExploreClubs}
              className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
            >
              Browse Campus Clubs
            </button>
          </div>
        ) : (
          requests.map((req, idx) => {
            const reqId = req.requestId || req._id || `req-${idx}`;

            return (
              <div
                key={reqId}
                className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4"
              >
                {/* Header: Club Info & Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl border border-slate-200/70">
                      {req.logo || "📌"}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900">
                          {req.clubName || "Campus Club"}
                        </h3>
                        <span className="rounded bg-slate-100 border border-slate-200/80 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          {req.category || "General"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Applied domain:{" "}
                        <span className="font-semibold text-slate-700">
                          {req.preferredDomain || "General Member"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {req.status === "Interview Scheduled" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-800">
                        <HiOutlineCalendarDays className="text-sm" />
                        <span>Interview Scheduled</span>
                      </span>
                    ) : req.status === "Approved" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                        <HiOutlineCheckCircle className="text-sm" />
                        <span>Approved & Enrolled</span>
                      </span>
                    ) : req.status === "Rejected" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-800">
                        <HiOutlineXCircle className="text-sm" />
                        <span>Not Selected</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-bold text-amber-800">
                        <HiOutlineClock className="text-sm" />
                        <span>Pending Review</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Interview Detail Callout if Scheduled */}
                {req.status === "Interview Scheduled" && req.interviewDetails && (
                  <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 space-y-2">
                    <p className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <HiOutlineCalendarDays className="text-blue-600" />
                      <span>Interview Appointment Confirmed</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-950 pt-1">
                      <div>
                        <span className="text-[10px] text-blue-600 font-semibold block">
                          DATE & TIME
                        </span>
                        <span className="font-bold">
                          {req.interviewDetails.date || "Scheduled Soon"} at{" "}
                          {req.interviewDetails.time || "TBA"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-blue-600 font-semibold block">
                          VENUE / VIRTUAL LINK
                        </span>
                        <span className="font-bold">
                          {req.interviewDetails.venueOrLink || "Campus Center"}
                        </span>
                      </div>
                    </div>
                    {req.interviewDetails.instructions && (
                      <p className="text-[11px] text-blue-800/90 pt-1 border-t border-blue-200/60">
                        Instructions: {req.interviewDetails.instructions}
                      </p>
                    )}
                  </div>
                )}

                {/* Rejection Reason if Rejected */}
                {req.status === "Rejected" && req.rejectionReason && (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 text-xs text-rose-900 space-y-1">
                    <p className="font-bold">Feedback from Club Leadership:</p>
                    <p className="text-rose-800/90">{req.rejectionReason}</p>
                  </div>
                )}

                {/* Candidate Info Summary */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span>
                      Availability:{" "}
                      <strong>{req.availabilityHours || "3-5 hrs/week"}</strong>
                    </span>
                    {req.skills && req.skills.length > 0 && (
                      <div className="flex items-center gap-1">
                        <span>Skills:</span>
                        <div className="flex flex-wrap gap-1">
                          {req.skills.slice(0, 3).map((s, i) => (
                            <span
                              key={i}
                              className="rounded bg-white border border-slate-200 px-1.5 py-0.2 text-[10px] font-semibold"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {req.status === "Pending" && (
                    <button
                      type="button"
                      onClick={() => onCancelRequest(reqId)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
                    >
                      <HiOutlineTrash className="text-xs" />
                      <span>Withdraw Application</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
