"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Inertial page scrolling. Touch keeps the native feel; wheel and anchor jumps glide.
 * Off entirely for people who ask for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      // Higher lerp = the page catches up to the wheel sooner; 0.09 and 0.16 still felt laggy.
      lerp: 0.5,
      // Anchor links glide too; targets keep clear of the sticky header via their scroll-mt.
      anchors: true,
      // Scrollable lists (the country combobox) keep their own native scroll.
      allowNestedScroll: true,
      prevent: (node) => !!node.closest?.("[data-radix-popper-content-wrapper]"),
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
