"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/Components/common/Navbar";
import Footer from "@/Components/Landing/Footer";
import {
  HiOutlineSparkles,
  HiOutlineEnvelope,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineUserGroup,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlinePaperAirplane,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineCheck,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineArrowRight,
} from "react-icons/hi2";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Non-functional mock submit (purely UI feedback demonstration)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      q: "How do I create a Cluvio account?",
      a: "Click on 'Get Started' or 'Sign In' at the top of the page. You will be prompted to register as either a Student or Club President using your official college enrollment number and campus email.",
    },
    {
      q: "How do I join a campus club?",
      a: "Browse the clubs directory from the homepage or student dashboard. For open clubs, click 'Join' to instantly become a member. For competitive or technical societies, submit the short recruitment application.",
    },
    {
      q: "Can I register my own club on Cluvio?",
      a: "Yes! If you are a campus group founder or elected club president, sign up as a 'Club President'. Once verified by platform administrators against your college charter, your club dashboard will be activated.",
    },
    {
      q: "How do I become a verified club president?",
      a: "Select the 'Club President' option on the registration page with your enrollment number and official student leadership credentials. Our platform administrators will verify your appointment with the student activities dean.",
    },
    {
      q: "How do event QR passes work?",
      a: "When you RSVP for any campus club workshop or hackathon, a digital ticket with a unique QR code is placed in your dashboard. Show this on your phone at the auditorium entrance to have your attendance recorded.",
    },
    {
      q: "How can I report a problem or suggest a new feature?",
      a: "You can submit the contact form on this page or email support@cluvio.com. Our campus technical development team reviews student suggestions weekly.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070B13] text-white selection:bg-[var(--accent)] selection:text-black">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[600px] rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="pointer-events-none absolute right-10 top-[600px] h-[400px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

        {/* 1. HERO */}
        <section className="relative px-4 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-[var(--accent)] backdrop-blur-md">
              <HiOutlineSparkles className="text-sm" />
              <span>GET IN TOUCH</span>
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
              Let&apos;s talk.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-xl">
              Have a question, need help with your student organization, or want to bring Cluvio to your campus? We&apos;re here to help.
            </p>
          </div>
        </section>

        {/* 2. CONTACT LAYOUT (2 COLUMNS) */}
        <section className="relative border-t border-white/10 bg-[#0B1120]/40 py-16 px-4 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* LEFT COLUMN: CONTACT CHANNELS */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Reach out to the Cluvio team.
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                    Our campus response desk is staffed by student leads and platform administrators.
                  </p>
                </div>

                {/* Channel Cards */}
                <div className="space-y-4 pt-2">
                  {/* General Questions */}
                  <div className="rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:border-[var(--accent)]/30">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-[var(--accent)]">
                        <HiOutlineEnvelope className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">
                          General Support
                        </h3>
                        <p className="mt-1 text-xs text-white/50">
                          Questions about accounts, login, or general inquiries.
                        </p>
                        <a
                          href="mailto:support@cluvio.com"
                          className="mt-2.5 inline-block text-xs font-semibold text-[var(--accent)] hover:underline"
                        >
                          support@cluvio.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Club Presidents Support */}
                  <div className="rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:border-[var(--accent)]/30">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                        <HiOutlineShieldCheck className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">
                          Club Leadership Desk
                        </h3>
                        <p className="mt-1 text-xs text-white/50">
                          Dedicated help for verified presidents, rosters & event approvals.
                        </p>
                        <a
                          href="mailto:presidents@cluvio.com"
                          className="mt-2.5 inline-block text-xs font-semibold text-violet-400 hover:underline"
                        >
                          presidents@cluvio.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Campus Office Location */}
                  <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/70">
                        <HiOutlineMapPin className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm">
                          Campus Operations Office
                        </h3>
                        <p className="mt-1 text-xs text-white/50">
                          Student Activities Center, Wing B, Room 304
                        </p>
                        <p className="mt-1 text-[11px] text-white/40">
                          Open Mon–Fri: 10:00 AM – 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Speed Badge */}
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs text-white/60">
                  <HiOutlineClock className="text-lg text-emerald-400 shrink-0" />
                  <span>
                    Average campus response time:{" "}
                    <strong className="text-white">under 24 hours</strong> during the active academic semester.
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: CONTACT FORM */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl border border-white/10 bg-[#111827] p-7 sm:p-10 shadow-2xl">
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Send us a message
                  </h3>
                  <p className="mt-1 text-xs text-white/50">
                    Fill out the form below and our campus team will get back to you promptly.
                  </p>

                  {/* Mock submitted alert */}
                  {submitted && (
                    <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HiOutlineCheck className="text-base font-bold" />
                        <span>
                          Thank you! Your message was simulated successfully (UI/UX demo).
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-white/60 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-2">
                        Your Full Name <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Sujal Patel"
                        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/20"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-2">
                        Email Address <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. sujal@campus.edu"
                        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/20"
                      />
                    </div>

                    {/* Role Radio Pills */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-2">
                        I am a:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: "student", label: "Student" },
                          { id: "president", label: "Club President" },
                          { id: "faculty", label: "Faculty / Staff" },
                          { id: "other", label: "Other" },
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, role: item.id })
                            }
                            className={`
                              rounded-xl border py-2.5 px-3 text-xs font-medium transition text-center
                              ${
                                formData.role === item.id
                                  ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] font-semibold"
                                  : "border-white/10 bg-white/[0.02] text-white/60 hover:bg-white/5 hover:text-white"
                              }
                            `}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-2">
                        Subject <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        placeholder="What can we help you with?"
                        className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/20"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-semibold text-white/80">
                          Message <span className="text-[var(--accent)]">*</span>
                        </label>
                        <span className="text-[11px] text-white/40">
                          {formData.message.length}/1000 characters
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        required
                        maxLength={1000}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your inquiry, club issue, or suggestion..."
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--accent)] focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/20 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="
                        flex h-12 w-full items-center justify-center gap-2 rounded-xl
                        bg-[var(--accent)] font-semibold text-black transition-all duration-200
                        hover:brightness-110 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]
                        active:scale-[0.99] cursor-pointer
                      "
                    >
                      <HiOutlinePaperAirplane className="text-base" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FAQ SECTION */}
        <section className="relative py-20 px-4 sm:px-6 sm:py-28 lg:px-8 border-t border-white/10">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Frequently Asked Questions
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Quick answers to common questions
              </h2>
              <p className="mt-3 text-sm text-white/60">
                Find fast answers regarding student membership, club registration, and event ticketing.
              </p>
            </div>

            {/* Accordion List */}
            <div className="mt-12 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-[#111827] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white transition hover:bg-white/[0.02]"
                    >
                      <span>{faq.q}</span>
                      <span className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-white/60">
                        {isOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-white/60 border-t border-white/5 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. FINAL CTA */}
        <section className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-8 border-t border-white/10">
          <div className="mx-auto max-w-4xl text-center rounded-3xl border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B1120] p-10 sm:p-14 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
              Check our comprehensive documentation or reach out directly to the campus support desk.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/Documentation"
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-black transition hover:brightness-110 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
              >
                <span>Read Documentation</span>
                <HiOutlineArrowRight className="text-xs" />
              </Link>
              <a
                href="mailto:support@cluvio.com"
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Email Support Directly
              </a>
            </div>
          </div>
        </section>
      </main>

      <div className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}
