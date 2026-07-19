"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "@/lib/content";

const NAME_LINES = ["DEVA", "MITHRAN"];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const rotateBg = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const parallax1 = useTransform(sx, [-0.5, 0.5], [-24, 24]);
  const parallax2 = useTransform(sy, [-0.5, 0.5], [-16, 16]);

  useEffect(() => {
    // splash beat before the menu / hero "assembles"
    const t = setTimeout(() => setBooted(true), 200);

    const handleMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mx, my]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Moving background: rotated halftone + speed lines */}
      <motion.div
        style={{ rotate: rotateBg }}
        className="absolute -inset-x-20 -inset-y-20 bg-halftone bg-halftone-lg opacity-25"
      />
      <div className="speed-lines absolute inset-0 opacity-70" />

      {/* Floating comic shapes */}
      <motion.div
        style={{ x: parallax1, y: parallax2 }}
        className="absolute left-[8%] top-[18%] h-24 w-24 rotate-12 border-4 border-blood md:h-36 md:w-36"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: parallax2, y: parallax1 }}
        className="absolute bottom-[15%] right-[10%] h-16 w-16 rotate-45 bg-yellow md:h-24 md:w-24"
        aria-hidden="true"
      />
      <motion.div
        style={{ x: useTransform(sx, [-0.5, 0.5], [16, -16]) }}
        className="absolute right-[18%] top-[30%] font-display text-6xl text-cyan/20 md:text-8xl"
        aria-hidden="true"
      >
        !
      </motion.div>

      {/* Floating label sticker */}
      {booted && (
        <motion.div
          initial={{ opacity: 0, y: -30, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute left-1/2 top-[14%] -translate-x-1/2 border-2 border-black bg-yellow px-4 py-1 font-caption text-xs font-bold uppercase tracking-widest text-black shadow-[4px_4px_0_#000] md:top-[16%]"
        >
          Now Loading: Portfolio.exe
        </motion.div>
      )}

      {/* Kinetic name */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <div className="overflow-hidden">
          {NAME_LINES.map((line, li) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%", rotate: li === 0 ? -4 : 4 }}
                animate={booted ? { y: "0%", rotate: 0 } : {}}
                transition={{
                  delay: 0.15 + li * 0.12,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-display text-[16vw] leading-[0.85] tracking-tight text-white ink-outline md:text-[10vw]"
              >
                {line.split("").map((ch, i) => (
                  <span
                    key={i}
                    className={li === 1 ? "text-blood" : ""}
                    style={{ display: "inline-block" }}
                  >
                    {ch}
                  </span>
                ))}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 max-w-xl font-caption text-sm uppercase tracking-[0.25em] text-white/70 md:text-base"
        >
          {profile.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={booted ? { opacity: 1 } : {}}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-4 max-w-lg font-body text-base text-white/50 md:text-lg"
        >
          &ldquo;{profile.tagline}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={booted ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.25, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            data-cursor="link"
            className="panel-frame group relative bg-blood px-8 py-4 font-caption text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Start Quest
          </a>
          <a
            href="#contact"
            data-cursor="link"
            className="panel-frame-white bg-transparent px-8 py-4 font-caption text-sm font-bold uppercase tracking-[0.2em] text-white transition-transform active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
          >
            Save File
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, 8, 8, 0] }}
        transition={{ delay: 2, duration: 2.2, repeat: Infinity }}
        className="absolute bottom-8 font-caption text-[10px] uppercase tracking-[0.3em] text-white/40"
      >
        Scroll to continue ▼
      </motion.div>
    </section>
  );
}
