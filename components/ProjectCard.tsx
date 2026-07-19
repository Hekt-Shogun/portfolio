"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { projects } from "@/lib/content";

const COLOR_MAP: Record<string, string> = {
  cyan: "text-cyan border-cyan",
  pink: "text-pink border-pink",
  yellow: "text-yellow border-yellow",
};

type Project = (typeof projects)[number];

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  const colorClasses = COLOR_MAP[project.color] ?? COLOR_MAP.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="group"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={resetTilt}
        onClick={() => onOpen(project.id)}
        data-cursor="view"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.03 }}
        className={`relative cursor-pointer overflow-hidden border-4 bg-panel p-6 shadow-[8px_8px_0_0_rgba(0,0,0,0.6)] md:p-8 ${colorClasses}`}
      >
        <div className="halftone-overlay opacity-10" />

        {project.image && (
          <div className="-mx-6 -mt-6 mb-4 aspect-[4/3] overflow-hidden border-b-4 border-current md:-mx-8 md:-mt-8">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover object-top"
              onError={(e) => {
                (e.currentTarget.parentElement as HTMLElement).style.display = "none";
              }}
            />
          </div>
        )}

        <div className="mb-4 flex items-start justify-between">
          <span className={`font-caption text-xs uppercase tracking-[0.2em] ${colorClasses.split(" ")[0]}`}>
            {project.tag}
          </span>
          <span className="font-caption text-xs text-white/40">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="font-display text-3xl uppercase leading-none text-white md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-1 font-caption text-xs uppercase tracking-widest text-white/50">
          {project.role}
        </p>

        <p className="mt-4 font-body text-sm leading-relaxed text-white/70 md:text-base">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4">
          {Object.entries(project.stats).map(([k, v]) => (
            <span
              key={k}
              className="border border-white/20 px-2 py-1 font-caption text-[10px] uppercase tracking-widest text-white/60"
            >
              {k}: {v}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 font-caption text-xs uppercase tracking-[0.2em] text-white/80 transition-transform group-hover:translate-x-1">
          Open File <span className={colorClasses.split(" ")[0]}>→</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
