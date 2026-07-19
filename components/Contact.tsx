"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import { Mail, Github, Send } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // NOTE: wire this up to your existing Formspree endpoint (or any backend)
    // before shipping — this demo just simulates the state transition.
    setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black py-28 text-white md:py-40"
    >
      <div className="speed-lines absolute inset-0 opacity-40" />
      <div className="absolute inset-0 bg-halftone bg-halftone-lg opacity-10" />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 text-center md:px-12">
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="inline-block border-2 border-yellow px-4 py-1 font-caption text-xs uppercase tracking-[0.3em] text-yellow"
        >
          Mission Available
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-display text-5xl uppercase leading-none text-white md:text-8xl"
        >
          SEND A <span className="text-blood">SIGNAL</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-body text-base text-white/60 md:text-lg"
        >
          Hiring, collaborating, or just want to talk about worldbuilding? Open a channel.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="panel-frame-white mt-10 flex flex-col gap-4 bg-panel p-6 text-left md:p-8"
        >
          <label className="font-caption text-xs uppercase tracking-widest text-white/60">
            Callsign (Name)
            <input
              required
              type="text"
              className="mt-1 w-full border-2 border-white/20 bg-black px-4 py-3 font-body text-white outline-none focus:border-cyan"
              placeholder="Your name"
            />
          </label>
          <label className="font-caption text-xs uppercase tracking-widest text-white/60">
            Frequency (Email)
            <input
              required
              type="email"
              className="mt-1 w-full border-2 border-white/20 bg-black px-4 py-3 font-body text-white outline-none focus:border-cyan"
              placeholder="you@example.com"
            />
          </label>
          <label className="font-caption text-xs uppercase tracking-widest text-white/60">
            Transmission
            <textarea
              required
              rows={4}
              className="mt-1 w-full border-2 border-white/20 bg-black px-4 py-3 font-body text-white outline-none focus:border-cyan"
              placeholder="What's the mission?"
            />
          </label>

          <motion.button
            type="submit"
            data-cursor="link"
            disabled={status !== "idle"}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96, x: 3, y: 3 }}
            className="panel-frame mt-2 flex items-center justify-center gap-3 bg-blood px-8 py-4 font-caption text-sm font-bold uppercase tracking-[0.25em] text-white disabled:opacity-70"
          >
            {status === "idle" && (
              <>
                <Send size={16} /> Transmit
              </>
            )}
            {status === "sending" && "Transmitting..."}
            {status === "sent" && "Mission Complete ✓"}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 font-caption text-sm uppercase tracking-widest text-white/60"
        >
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            className="flex items-center gap-2 transition-colors hover:text-cyan"
          >
            <Mail size={16} /> {profile.email}
          </a>
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="flex items-center gap-2 transition-colors hover:text-cyan"
            >
              <Github size={16} /> Portfolio Site
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
