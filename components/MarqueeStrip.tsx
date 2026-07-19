const WORDS = ["NARRATIVE DESIGN", "★", "LEVEL DESIGN", "★", "SYSTEMS DESIGN", "★", "WORLDBUILDING", "★"];

export default function MarqueeStrip() {
  return (
    <div className="overflow-hidden border-y-4 border-black bg-blood py-3" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-6 whitespace-nowrap">
        {[...WORDS, ...WORDS].map((w, i) => (
          <span key={i} className="font-display text-2xl uppercase tracking-tight text-black">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
