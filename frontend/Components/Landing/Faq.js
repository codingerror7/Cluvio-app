"use client";

import React, { useState } from "react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import Link from "next/link";

const faqs = [
  {
    question: "Who is BroClubs designed for?",
    answer:
      "BroClubs is built for college students, technical societies, cultural clubs, sports chapters, and college administrators looking to streamline operations.",
  },
  {
    question: "What are the 3 roles supported by BroClubs?",
    answer:
      "BroClubs supports Student (open access), Club Member (requires secret key 'admin123'), and Club Head (requires secret key 'admin123' for full management powers).",
  },
  {
    question: "Who engineered BroClubs?",
    answer:
      "BroClubs is an official product engineered by BroCodes Technologies (brocodestech.in), specialized in high-performance digital platforms for higher education and enterprises.",
  },
  {
    question: "How does the Secret Key system work?",
    answer:
      "To ensure campus security, registering or signing in as a Club Member or Club Head requires the verified passcode 'admin123'. Standard student accounts do not require any key.",
  },
  {
    question: "Can multiple club heads manage the same club?",
    answer:
      "Yes. The platform allows presidential and coordinator roles with custom permissions to review applications, approve events, and manage members.",
  },
  {
    question: "Is BroClubs mobile responsive?",
    answer:
      "Yes! BroClubs is 100% responsive, optimized for smartphones, tablets, laptops, and large campus displays.",
  },
];

export default function Faq() {
  const [active, setActive] = useState(0);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 text-left">
      <div className="mx-auto w-full max-w-4xl px-2 sm:px-4">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
            Frequently Asked Questions
          </span>

          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            Everything You Need to Know.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 font-normal">
            Find answers to the most common questions about managing college clubs with BroClubs and BroCodes Technologies.
          </p>
        </div>

        {/* Accordions in Minimalist Aesthetic */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition hover:bg-slate-50/50 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {faq.question}
                  </span>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 ml-4">
                    {isOpen ? (
                      <HiOutlineMinus className="text-sm" />
                    ) : (
                      <HiOutlinePlus className="text-sm" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/30">
                    <p className="text-sm leading-relaxed text-slate-500 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 rounded-2xl border border-slate-200/70 bg-white p-8 text-center shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Still have questions?</h3>
          <p className="mt-2 text-sm text-slate-500 font-normal">
            Our engineering team at BroCodes Technologies is here to assist your institution.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
            >
              Get Started Free
            </Link>
            <a
              href="https://brocodestech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              Contact BroCodes Tech ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}