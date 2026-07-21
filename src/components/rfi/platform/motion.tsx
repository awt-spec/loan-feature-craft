import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ *
 * useInView — lightweight IntersectionObserver hook (SSR-safe).
 * Fires once, then disconnects. Falls back to "visible" when the API
 * is missing or the user prefers reduced motion.
 * ------------------------------------------------------------------ */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

/* ------------------------------------------------------------------ *
 * Reveal — fade + slide the children in as they enter the viewport.
 * `delay` staggers siblings; `as` picks the wrapper element.
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  y = 18,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  y?: number;
  once?: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  void once;
  return createElement(
    as,
    {
      ref,
      className: `reveal ${inView ? "is-visible" : ""} ${className}`.trim(),
      style: {
        transitionDelay: `${delay}ms`,
        "--reveal-y": `${y}px`,
      } as CSSProperties,
    },
    children,
  );
}

/* ------------------------------------------------------------------ *
 * SpotlightCard — cursor-following radial glow + optional tilt.
 * Writes --mx / --my (percent) and --rx / --ry (deg) as CSS vars that
 * the `.card-spotlight` utility consumes.
 * ------------------------------------------------------------------ */
export function SpotlightCard({
  children,
  className = "",
  as = "div",
  tilt = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  tilt?: boolean;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = prefersReducedMotion();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || reduce.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(px * 100).toFixed(2)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(2)}%`);
    if (tilt) {
      el.style.setProperty("--rx", `${((0.5 - py) * 6).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * 6).toFixed(2)}deg`);
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return createElement(
    as,
    {
      ref,
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      className: `card-spotlight ${tilt ? "card-tilt" : ""} ${className}`.trim(),
      ...rest,
    },
    children,
  );
}

/* ------------------------------------------------------------------ *
 * CountUp — animate a number from 0 → value once it scrolls into view.
 * ------------------------------------------------------------------ */
export function CountUp({
  value,
  duration = 1400,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion() || typeof requestAnimationFrame === "undefined") {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setDisplay(Math.round(ease(p) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("es")}
      {suffix}
    </span>
  );
}
