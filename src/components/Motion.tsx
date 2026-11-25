"use client";

import { useEffect } from "react";

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

    requestAnimationFrame(() => document.documentElement.classList.add("motion-ready"));

    return () => {
      window.clearTimeout(revealFallback);
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready", "has-reveal");
    };
  }, []);

  return null;
}
