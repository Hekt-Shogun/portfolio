"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const ITEMS = [
  { label: "ORIGIN", href: "#about" },
  { label: "STATS", href: "#skills" },
  { label: "QUESTS", href: "#projects" },
  { label: "CHAPTERS", href: "#timeline" },
  { label: "CONTACT", href: "#contact" },
];

export default function GameMenu() {
  const [open, setOpen] = useState(false);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <a
          href="#hero"
          data-cursor="link"
          className="font-display text-lg tracking-widest text-white ink-outline-white md:text-xl"
        >
          D.M // 001
        </a>

        <button
          data-cursor="link"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="panel-frame-white flex items-center gap-2 bg-black px-4 py-2 font-caption text-xs uppercase tracking-[0.2em] text-white transition-transform hover:-translate-y-0.5"
        >
          <Menu size={16} />
          Menu
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-black"
          >
            <div className="speed-lines absolute inset-0 opacity-60" />

            <button
              data-cursor="link"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-6 top-5 z-10 flex items-center gap-2 border-2 border-white px-4 py-2 font-caption text-xs uppercase tracking-[0.2em] text-white md:right-12"
            >
              <X size={16} />
              Close
            </button>

            <nav className="relative z-10 flex h-full flex-col items-start justify-center gap-2 px-8 md:px-20">
              {ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  data-cursor="link"
                  onClick={() => handleNav(item.href)}
                  initial={{ x: -80, opacity: 0, rotate: -3 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ x: 24, color: "#E30613" }}
                  className="group flex items-baseline gap-4 font-display text-5xl uppercase text-white md:text-8xl"
                >
                  <span className="font-caption text-base text-blood md:text-xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <div className="absolute bottom-8 left-8 font-caption text-xs uppercase tracking-widest text-white/40 md:left-20">
              Select an option to continue
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
