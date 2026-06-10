"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
} from "lucide-react";

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

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            left-1/2
            top-20
            -translate-x-1/2
            h-[350px]
            w-[650px]
            bg-violet-600/10
            blur-[140px]
          "
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span
            className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              border
              border-violet-500/20
              bg-violet-500/10
              text-violet-300
              text-sm
            "
          >
            Frequently Asked Questions
          </span>

          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Everything You Need
            <span className="block text-violet-400">
              To Know About Cluvio
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-white/60
            "
          >
            Quick answers to the most common questions
            about managing clubs with Cluvio.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="mt-16 space-y-4">

          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <motion.div
                key={faq.question}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  overflow-hidden
                "
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-6
                    px-6
                    py-5
                    text-left
                  "
                >
                  <span
                    className="
                      text-white
                      font-medium
                      text-base
                    "
                  >
                    {faq.question}
                  </span>

                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    {isOpen ? (
                      <Minus
                        size={18}
                        className="text-violet-400"
                      />
                    ) : (
                      <Plus
                        size={18}
                        className="text-white/50"
                      />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <div
                        className="
                          px-6
                          pb-6
                          text-white/60
                          leading-relaxed
                        "
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

        </div>

        {/* Bottom Help Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
          }}
          className="
            mt-12
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-b
            from-white/[0.05]
            to-transparent
            p-8
            text-center
          "
        >
          <h3
            className="
              text-xl
              font-semibold
              text-white
            "
          >
            Still have questions?
          </h3>

          <p
            className="
              mt-3
              text-white/60
            "
          >
            We're happy to help you understand how Cluvio
            can support your club and community.
          </p>

          <button
            className="
              mt-6
              px-6
              py-3
              rounded-xl
              bg-violet-600
              hover:bg-violet-500
              text-white
              font-medium
              transition-all
            "
          >
            Contact Us
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Faq;