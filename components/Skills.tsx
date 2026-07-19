"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/content";

const SIZE = 340;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 40;

// Rounded to a fixed precision so server- and client-rendered SVG coordinates
// serialize identically — raw Math.cos/Math.sin output can differ in the last
// decimal place between Node's and the browser's JS engine, which React sees
// as a real mismatch and flags as a hydration error.
function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

function pointFor(index: number, total: number, value: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = (value / 100) * RADIUS;
  return {
    x: round(CENTER + r * Math.cos(angle)),
    y: round(CENTER + r * Math.sin(angle)),
  };
}

function labelPointFor(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const r = RADIUS + 26;
  return {
    x: round(CENTER + r * Math.cos(angle)),
    y: round(CENTER + r * Math.sin(angle)),
  };
}

export default function Skills() {
  const total = skills.length;
  const polygonPoints = skills
    .map((s, i) => {
      const { x, y } = pointFor(i, total, s.level);
      return `${x},${y}`;
    })
    .join(" ");

  const rings = [25, 50, 75, 100];

  return (
    <section id="skills" className="relative bg-black py-28 text-white md:py-40">
      <div className="speed-lines absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 font-display text-5xl uppercase tracking-tight text-cyan md:text-7xl"
        >
          STAT SCREEN
        </motion.h2>

        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto"
          >
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              width={SIZE}
              height={SIZE}
              className="max-w-full overflow-visible"
            >
              {/* rings */}
              {rings.map((r) => (
                <polygon
                  key={r}
                  points={skills
                    .map((_, i) => {
                      const { x, y } = pointFor(i, total, r);
                      return `${x},${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={1}
                />
              ))}

              {/* spokes */}
              {skills.map((_, i) => {
                const outer = pointFor(i, total, 100);
                return (
                  <line
                    key={i}
                    x1={CENTER}
                    y1={CENTER}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth={1}
                  />
                );
              })}

              {/* data polygon */}
              <motion.polygon
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
                points={polygonPoints}
                fill="rgba(227,6,19,0.35)"
                stroke="#E30613"
                strokeWidth={2}
              />

              {skills.map((s, i) => {
                const { x, y } = pointFor(i, total, s.level);
                return (
                  <motion.circle
                    key={s.name}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                    cx={x}
                    cy={y}
                    r={4}
                    fill="#F4FF3D"
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Tag list */}
          <div className="flex flex-wrap gap-3">
            {skills.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20, rotate: i % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{
                  scale: 1.08,
                  rotate: [0, -4, 4, 0],
                  transition: { duration: 0.4 },
                }}
                data-cursor="link"
                className="group relative border-2 border-white/30 bg-smoke px-4 py-2 font-caption text-xs uppercase tracking-widest transition-colors hover:border-blood hover:bg-blood/10"
              >
                {s.name}
                <span className="ml-2 text-cyan">{s.level}</span>
                {/* hover explosion */}
                <motion.span
                  initial={false}
                  className="pointer-events-none absolute -right-1 -top-1 h-2 w-2 rounded-full bg-yellow opacity-0 group-hover:animate-ping group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
