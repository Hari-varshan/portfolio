"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[4px] origin-left z-50 pointer-events-none"
      style={{
        scaleX,
        background: "var(--color-accent)",
        boxShadow: "0 0 12px 2px var(--color-accent)",
      }}
      aria-hidden="true"
    />
  );
}
