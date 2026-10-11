import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BASE = "/media/slideshow";

const slides = [
  { src: `${BASE}/00-cover.webp`, label: "Okładka" },
  { src: `${BASE}/01-styczen.webp`, label: "Styczeń" },
  { src: `${BASE}/02-luty.webp`, label: "Luty" },
  { src: `${BASE}/03-marzec.webp`, label: "Marzec" },
  { src: `${BASE}/04-kwiecien.webp`, label: "Kwiecień" },
  { src: `${BASE}/05-maj.webp`, label: "Maj" },
  { src: `${BASE}/06-czerwiec.webp`, label: "Czerwiec" },
  { src: `${BASE}/07-lipiec.webp`, label: "Lipiec" },
  { src: `${BASE}/08-sierpien.webp`, label: "Sierpień" },
  { src: `${BASE}/09-wrzesien.webp`, label: "Wrzesień" },
  { src: `${BASE}/10-pazdziernik.webp`, label: "Październik" },
  { src: `${BASE}/11-listopad.webp`, label: "Listopad" },
  { src: `${BASE}/12-grudzien.webp`, label: "Grudzień" },
] as const;

const INTERVAL_MS = 4500;
const SWIPE_THRESHOLD_PX = 40;

export function MonthSlideshow() {
  const [index, setIndex] = useState(0);
  // Only mount images that have been (or are about to be) shown — avoids pulling ~8 MB up front.
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1]));
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((next: number) => {
    const i = (next + slides.length) % slides.length;
    setIndex(i);
    setMounted((prev) => {
      const n = (i + 1) % slides.length;
      if (prev.has(i) && prev.has(n)) return prev;
      return new Set(prev).add(i).add(n);
    });
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      if (!document.hidden) go(index + 1);
    }, INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, inView, go]);

  const current = slides[index];

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Podgląd 12 kart kalendarza"
      className="relative max-w-md mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        setPaused(false);
        if (start === null) return;
        const dx = e.changedTouches[0].clientX - start;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) go(dx < 0 ? index + 1 : index - 1);
      }}
    >
      <div className="relative aspect-[984/1342] overflow-hidden border border-border shadow-editorial bg-[#9b9b9d]">
        {slides.map((slide, i) =>
          mounted.has(i) ? (
            <img
              key={slide.src}
              src={slide.src}
              alt={`Kalendarz Infatuation 2027 — ${slide.label}`}
              aria-hidden={i !== index}
              decoding="async"
              draggable={false}
              className="slide absolute inset-0 w-full h-full object-contain"
              data-active={i === index || undefined}
            />
          ) : null,
        )}
        {/* Transparent shield — right-click / long-press hits this instead of the image */}
        <div aria-hidden data-protect className="absolute inset-0" />

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Poprzednia karta"
          className="press absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-background/70 backdrop-blur-sm border border-border/60 text-gold hover:bg-background/90 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Następna karta"
          className="press absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-background/70 backdrop-blur-sm border border-border/60 text-gold hover:bg-background/90 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div
          aria-live={paused ? "polite" : "off"}
          className="text-[11px] tracking-luxury uppercase"
        >
          <span className="text-gold">{current.label}</span>
          <span className="text-muted-foreground"> · {String(index).padStart(2, "0")} / 12</span>
        </div>
        <div className="flex gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i)}
              aria-label={slide.label}
              aria-current={i === index}
              className={`h-1 w-3 sm:w-4 cursor-pointer transition-colors duration-200 ${
                i === index ? "bg-gold" : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
