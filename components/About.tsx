"use client";

import { motion } from "framer-motion";
import { about, profile } from "@/lib/content";

const DIRECTIONS = [
  { x: -120, y: 0, rotate: -6 },
  { x: 0, y: 100, rotate: 4 },
  { x: 120, y: 0, rotate: -3 },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-28 text-black md:py-40"
    >
      <div className="halftone-overlay opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="h-3 w-3 rotate-45 bg-blood" />
          <h2 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            {about.heading}
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {about.paragraphs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, ...DIRECTIONS[i % DIRECTIONS.length] }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              whileHover={{ rotate: 0, y: -6 }}
              className="panel-frame relative bg-white p-6 md:p-8"
            >
              <span className="absolute -top-4 left-6 border-2 border-black bg-yellow px-2 py-0.5 font-caption text-[10px] font-bold uppercase tracking-widest">
                Panel {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-body text-base leading-relaxed md:text-lg">{p}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 border-4 border-black bg-black p-6 text-white md:p-10"
        >
          <p className="font-caption text-xs uppercase tracking-[0.3em] text-yellow">
            Design Philosophy
          </p>
          <p className="mt-3 font-display text-2xl uppercase leading-tight md:text-4xl">
            {profile.philosophy}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
