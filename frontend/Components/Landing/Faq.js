"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import SectionHeading from "../UI/SectionHeading";

const faqs = [
  {
    question: "Who is Cluvio designed for?",
    answer:
      "Cluvio is built for student clubs, societies, chapters, communities, and campus organizations that want to manage operations more efficiently.",
  },
  {
    question: "Can multiple administrators manage a club?",
    answer:
      "Yes. Clubs can assign different roles and permissions to presidents, coordinators, committee leads, and administrators.",
  },
  {
    question: "Does Cluvio support event registrations?",
    answer:
      "Yes. Members can register for events, and organizers can track registrations, participation, and attendance from one dashboard.",
  },
  {
    question: "Can we send announcements to members?",
    answer:
      "Absolutely. Cluvio includes a centralized announcement system to keep members informed about updates, events, and activities.",
  },
  {
    question: "Is Cluvio mobile-friendly?",
    answer:
      "Yes. The platform is fully responsive and designed to work seamlessly across phones, tablets, and desktops.",
  },
  {
    question: "How quickly can a club get started?",
    answer:
      "Most clubs can create their workspace, invite members, and begin managing activities within minutes.",
  },
];

const Faq = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="section-panel">
      <div className="relative z-10 mx-auto w-[min(100%-2rem,880px)]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title="Everything You Need"
            accent="To Know About Cluvio"
          >
            Quick answers to the most common questions about managing clubs with Cluvio.
          </SectionHeading>
        </motion.div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = active === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Card interactive={false} className="overflow-hidden">
                  <button
                    onClick={() => setActive(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition hover:bg-white/[0.035] sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      {isOpen ? (
                        <Minus size={18} className="text-[var(--accent)]" />
                      ) : (
                        <Plus size={18} className="text-white/55" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                      >
                        <div className="px-5 pb-6 leading-relaxed text-white/62 sm:px-6">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card interactive={false} className="mt-10 p-8 text-center">
            <h3 className="text-xl font-semibold text-white">Still have questions?</h3>
            <p className="mx-auto mt-3 max-w-xl text-white/62">
              We're happy to help you understand how Cluvio can support your club and community.
            </p>
            <Button className="mt-6 sm:w-auto">Contact Us</Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;
