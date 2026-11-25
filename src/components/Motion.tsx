"use client";

import { useEffect } from "react";

type CountTarget = { el: HTMLElement; final: number; prefix: string; suffix: string; decimals: number };

function parseCount(raw: string): CountTarget | null {
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    el: null as unknown as HTMLElement,
    final: parseFloat(digits),
    prefix,
    suffix,
    decimals: (digits.split(".")[1] || "").length,
  };
}

export default function Motion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".nav-link[href^='#']")
    );
    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href") as string))
      .filter((el): el is Element => Boolean(el));

    if (sections.length) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = `#${entry.target.id}`;
              links.forEach((link) =>
                link.classList.toggle("active", link.getAttribute("href") === id)
              );
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach((section) => navObserver.observe(section));
    }

    if (reduced) {
      revealItems.forEach((el) => el.classList.add("is-visible"));
      document.documentElement.classList.add("motion-ready");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" }
    );
    revealItems.forEach((el) => observer.observe(el));
    document.documentElement.classList.add("has-reveal");

    const revealFallback = window.setTimeout(() => {
      revealItems.forEach((el) => el.classList.add("is-visible"));
    }, 1600);

    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"))
      .map((el) => {
        const parsed = parseCount(el.dataset.count || "");
        if (!parsed) return null;
        return { ...parsed, el };
      })
      .filter((x): x is CountTarget => Boolean(x));

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = counters.find((c) => c.el === el);
          if (target) runCount(target);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => countObserver.observe(c.el));

    let raf = 0;
    const running = new Set<{ target: CountTarget; t0: number }>();
    const DUR = 900;

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function runCount(target: CountTarget) {
      running.add({ target, t0: performance.now() });
      if (!raf) raf = requestAnimationFrame(countTick);
    }

    function countTick(now: number) {
      running.forEach((job) => {
        const p = Math.min(1, (now - job.t0) / DUR);
        const value = job.target.final * easeOutExpo(p);
        job.target.el.textContent =
          job.target.prefix + value.toFixed(job.target.decimals) + job.target.suffix;
        if (p === 1) running.delete(job);
      });
      raf = running.size ? requestAnimationFrame(countTick) : 0;
    }

    requestAnimationFrame(() => document.documentElement.classList.add("motion-ready"));

    return () => {
      window.clearTimeout(revealFallback);
      observer.disconnect();
      countObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("motion-ready", "has-reveal");
    };
  }, []);

  return null;
}
