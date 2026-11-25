"use client";

import { useEffect } from "react";

type Probe = {
  state: () => { scrollY: number; velocity: number; skew: number; progress: number };
};

declare global {
  interface Window { __scrollMotion?: Probe }
}

const MAX_SKEW = 4.5;
const GAIN = 0.055;
const DECAY = 0.9;
const FOLLOW = 0.14;

export default function ScrollMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const progress = document.querySelector<HTMLElement>(".scroll-progress");
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-skew]"));

    let lastY = window.scrollY;
    let velocity = 0;
    let skew = 0;
    let raf = 0;
    let active = false;

    const updateProgress = () => {
      if (!progress) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progress.style.setProperty("--progress", Math.min(1, Math.max(0, p)).toFixed(4));
    };

    const setSkew = (v: number) => {
      const s = v.toFixed(3);
      targets.forEach((el) => {
        el.style.transform = `skewY(${s}deg)`;
        el.style.setProperty("--skew-abs", Math.abs(v).toFixed(3));
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      updateProgress();
      if (reduced) return;
      velocity += (y - lastY) * GAIN;
      lastY = y;
      if (!active) {
        active = true;
        raf = requestAnimationFrame(tick);
      }
    };

    function tick() {
      velocity *= DECAY;
      if (Math.abs(velocity) < 0.001) velocity = 0;

      const target = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, velocity));
      skew += (target - skew) * FOLLOW;
      if (Math.abs(skew) < 0.004 && velocity === 0) skew = 0;

      setSkew(skew);
      targets.forEach((el) => {
        el.style.willChange = Math.abs(skew) > 0.05 ? "transform" : "auto";
      });

      if (skew !== 0 || velocity !== 0) {
        raf = requestAnimationFrame(tick);
      } else {
        active = false;
        setSkew(0);
        targets.forEach((el) => { el.style.willChange = "auto"; });
      }
    }

    window.__scrollMotion = {
      state: () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        return {
          scrollY: window.scrollY,
          velocity,
          skew,
          progress: max > 0 ? window.scrollY / max : 0,
        };
      },
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      delete window.__scrollMotion;
      targets.forEach((el) => {
        el.style.transform = "";
        el.style.willChange = "";
        el.style.removeProperty("--skew-abs");
      });
    };
  }, []);

  return null;
}
