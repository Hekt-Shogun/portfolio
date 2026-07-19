"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks the pointer and exposes a ref to the cursor element.
 * The cursor itself morphs shape via data-attributes toggled by
 * elements with [data-cursor="link"|"drag"|"view"].
 */
export function useMagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return; // skip on touch devices

    let raf = 0;

    const move = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      // simple lerp for a trailing "magnetic" feel
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (el && cursorRef.current) {
        cursorRef.current.dataset.state = el.getAttribute("data-cursor") || "";
      }
    };
    const onOut = (e: Event) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (el && cursorRef.current) {
        cursorRef.current.dataset.state = "";
      }
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return cursorRef;
}
