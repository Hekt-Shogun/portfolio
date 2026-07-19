"use client";

import { useMagneticCursor } from "@/hooks/useMagneticCursor";

export default function CustomCursor() {
  const cursorRef = useMagneticCursor();

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[1000] hidden md:block"
      style={{ willChange: "transform" }}
    >
      <div
        className="
          -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white
          transition-[width,height,background-color,border-radius] duration-200 ease-out
          data-[state=link]:w-16 data-[state=link]:h-16 data-[state=link]:bg-blood/80 data-[state=link]:border-transparent
          data-[state=view]:w-24 data-[state=view]:h-24 data-[state=view]:bg-white/90 data-[state=view]:border-transparent
          data-[state=drag]:w-10 data-[state=drag]:h-10 data-[state=drag]:rotate-45 data-[state=drag]:rounded-none data-[state=drag]:bg-yellow
        "
        style={{ width: 18, height: 18 }}
      />
      <div className="absolute left-0 top-0 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center font-caption text-[10px] font-bold uppercase tracking-wider text-black opacity-0 [div[data-state=view]+&]:opacity-100">
        View
      </div>
    </div>
  );
}
