"use client";

import React, { useState } from "react";
import {
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !feedback.trim()) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");

    try {
      const feedbackEntry = {
        name: name.trim(),
        email: email.trim(),
        role,
        feedback: feedback.trim(),
        submittedAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        const existing = JSON.parse(
          localStorage.getItem("broclubs_feedback") || "[]"
        );
        existing.push(feedbackEntry);
        localStorage.setItem("broclubs_feedback", JSON.stringify(existing));
      }

      await new Promise((resolve) => setTimeout(resolve, 600));

      setStatus("success");
      setName("");
      setEmail("");
      setFeedback("");
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section id="feedback" className="relative py-20 sm:py-28 text-left w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-neutral-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300">
                04 / Community Input
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Help Us Build Better
              <br />
              <span className="text-neutral-400">Campus Communities.</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-lg mx-auto">
              Tell us what you think about your BroClubs experience. Your feedback
              directly influences features, integrations, and tools.
            </p>
          </div>

          {/* Form Container (Sleek Glassmorphic Surface) */}
          <div className="rounded-3xl border border-white/12 bg-[#0b0b0e]/85 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            {status === "success" ? (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
                  <HiOutlineCheckCircle className="text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Thank You for Your Feedback!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Your insights have been recorded. The BroCodes Technologies team
                  reviews community feedback to refine campus workflows.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-5 py-2 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    Submit Another Response
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 px-4 py-3 text-xs text-rose-300">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="feedback-name"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
                    >
                      Your Name <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      id="feedback-name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/25"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="feedback-email"
                      className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
                    >
                      Campus Email <span className="text-neutral-500">*</span>
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      placeholder="you@campus.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/25"
                    />
                  </div>
                </div>

                {/* Role Selector Tabs */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                    Your Campus Role
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl border border-white/10 bg-white/[0.02]">
                    {["Student", "Club Member", "Club President"].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`h-10 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          role === r
                            ? "bg-white text-black shadow-xs font-bold"
                            : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Textarea */}
                <div className="space-y-2">
                  <label
                    htmlFor="feedback-content"
                    className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
                  >
                    Feedback & Suggestions <span className="text-neutral-500">*</span>
                  </label>
                  <textarea
                    id="feedback-content"
                    rows={4}
                    placeholder="Tell us what you like, what is confusing, or what features your club needs..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.06] focus:ring-1 focus:ring-violet-500/25 resize-y"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm transition-all hover:bg-neutral-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      Submitting Feedback...
                    </span>
                  ) : (
                    <>
                      <span>Send Feedback</span>
                      <HiOutlinePaperAirplane className="text-xs" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
