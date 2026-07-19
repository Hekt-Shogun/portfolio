"use client";

import { motion } from "framer-motion";
import { timeline } from "@/lib/content";

export default function Timeline() {
  return (
    <section id="timeline" className="relative overflow-hidden bg-white py-28 text-black md:py-40">
      <div className="halftone-overlay opacity-20" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-20 font-display text-5xl uppercase tracking-tight md:text-7xl"
        >
          STORY SO FAR
        </motion.h2>

        <div className="relative border-l-4 border-black pl-8 md:pl-12">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.chapter}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-16 last:mb-0"
            >
              <span className="absolute -left-[3.1rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border-4 border-black bg-blood md:-left-[3.6rem]" />

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="border-2 border-black bg-yellow px-2 py-0.5 font-caption text-xs font-bold uppercase tracking-widest">
                  {entry.chapter}
                </span>
                <span className="font-caption text-xs uppercase tracking-widest text-black/50">
                  {entry.period}
                </span>
              </div>

              <h3 className="mt-3 font-display text-3xl uppercase leading-tight md:text-4xl">
                {entry.title}
              </h3>
              <p className="mt-2 max-w-lg font-body text-base text-black/70 md:text-lg">
                {entry.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
