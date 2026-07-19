"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import { X } from "lucide-react";

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="relative bg-smoke py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-2"
        >
          <span className="font-caption text-xs uppercase tracking-[0.3em] text-blood">
            Inventory
          </span>
          <h2 className="font-display text-5xl uppercase tracking-tight text-white md:text-7xl">
            QUEST LOG
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setOpenId}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen project transition */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(100% 0% 0% 0%)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-black text-white"
          >
            <div className="speed-lines absolute inset-0 opacity-30" />
            <button
              data-cursor="link"
              onClick={() => setOpenId(null)}
              className="fixed right-6 top-5 z-10 flex items-center gap-2 border-2 border-white bg-black px-4 py-2 font-caption text-xs uppercase tracking-[0.2em] md:right-12"
            >
              <X size={16} /> Close File
            </button>

            <div className="relative z-10 mx-auto max-w-4xl px-6 py-28 md:px-12 md:py-36">
              <span className="font-caption text-sm uppercase tracking-[0.3em] text-blood">
                {active.tag}
              </span>
              <h3 className="mt-4 font-display text-6xl uppercase leading-none md:text-9xl">
                {active.title}
              </h3>
              <p className="mt-3 font-caption text-sm uppercase tracking-widest text-white/50">
                {active.role}
              </p>
              {active.image && (
                <div className="panel-frame-white mt-8 max-w-2xl overflow-hidden bg-black">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              )}
              <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-white/80 md:text-xl">
                {active.description}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                {Object.entries(active.stats).map(([k, v]) => (
                  <div
                    key={k}
                    className="panel-frame-white bg-black px-5 py-3 text-center"
                  >
                    <div className="font-caption text-[10px] uppercase tracking-widest text-white/50">
                      {k}
                    </div>
                    <div className="font-display text-xl uppercase">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
