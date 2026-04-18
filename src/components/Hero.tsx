"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { HeroData } from "@/types/portfolio";
import heroData from "@/data/hero.json";

const data: HeroData = heroData;

/* ── Wave letter for the name ── */
function WaveLetter({
  char,
  idx,
  hoveredIdx,
  totalLetters,
  onHover,
  onLeave,
  isHighlight,
}: {
  char: string;
  idx: number;
  hoveredIdx: number | null;
  totalLetters: number;
  onHover: (i: number) => void;
  onLeave: () => void;
  isHighlight?: boolean;
}) {
  if (char === " ") {
    return <span className="inline-block w-[0.22em]" aria-hidden />;
  }

  /* Wave amplitude: peaks at hovered letter, falls off with distance */
  const dist = hoveredIdx !== null ? Math.abs(idx - hoveredIdx) : null;
  const waveY = dist !== null ? Math.max(0, 20 - dist * 6) * -1 : 0;

  return (
    <motion.span
      className="inline-block cursor-default select-none origin-bottom"
      data-highlight={isHighlight ? "true" : undefined}
      style={isHighlight ? { color: "var(--color-highlight-letter)" } : undefined}
      /* ── Load animation: elastic bounce-in, staggered ── */
      initial={{ y: -80, opacity: 0, rotate: -8 }}
      animate={{ y: waveY, opacity: 1, rotate: 0 }}
      transition={
        hoveredIdx !== null
          ? /* Wave response — snappy spring */
            { type: "spring", stiffness: 500, damping: 16 }
          : /* Load bounce-in — overshoot spring with delay */
            {
              type: "spring",
              stiffness: 220,
              damping: 16,
              delay: 0.04 + idx * 0.055,
            }
      }
      onHoverStart={() => onHover(idx)}
      onHoverEnd={onLeave}
    >
      {char}
    </motion.span>
  );
}

/* ── Page entrance for non-name elements ── */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.6 } as const,
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: 0.1 },
  },
};

export function Hero() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* Flatten name to array, giving each non-space letter a sequential index */
  let letterIdx = -1;
  const nameChars = data.name.split("").map((char) => {
    if (char !== " ") letterIdx++;
    return { char, idx: char === " " ? -1 : letterIdx };
  });
  const totalLetters = letterIdx + 1;

  /* Re-group back into words for block-level rendering */
  const words = data.name.split(" ");
  let charCursor = 0;

  return (
    <section
      id="hero"
      className="relative px-6 md:px-8 pt-12 pb-12 md:pt-16 md:pb-16"
      aria-label="Hero section"
    >
      <div className="mx-auto max-w-5xl w-full flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-16">

        {/* ── Left: text ── */}
        <div className="flex-1 flex flex-col items-start gap-5">
          {/* Role chip */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55, ease: "easeOut" }}
          >
            <span className="role-chip inline-block rounded-full bg-highlight px-4 py-1.5 text-xs font-medium tracking-widest text-navy/60 uppercase">
              {data.role} · 1.5 YOE
            </span>
          </motion.div>

          {/* ── Name in Fraunces italic — wave + bounce-in ── */}
          <h1
            className="font-[family-name:var(--font-fraunces)] text-6xl md:text-7xl lg:text-8xl font-black italic leading-[0.95] tracking-tight text-navy"
            aria-label={data.name}
          >
            {words.map((word, wi) => {
              const wordEl = (
                <span key={wi} className="block overflow-visible">
                  {word.split("").map((char, ci) => {
                    const entry = nameChars[charCursor];
                    charCursor++;
                    return (
                      <WaveLetter
                        key={`${wi}-${entry.idx}`}
                        char={char}
                        idx={entry.idx}
                        hoveredIdx={hoveredIdx}
                        totalLetters={totalLetters}
                        onHover={setHoveredIdx}
                        onLeave={() => setHoveredIdx(null)}
                        isHighlight={ci === 0}
                      />
                    );
                  })}
                </span>
              );
              /* Skip the space in nameChars */
              if (wi < words.length - 1) charCursor++;
              return wordEl;
            })}
          </h1>

          {/* Rest fades in after the name finishes bouncing */}
          <motion.div
            className="flex flex-col items-start gap-5"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-base md:text-[1.05rem] leading-relaxed text-grey"
            >
              {data.tagline}
            </motion.p>

            {/* P.S. */}
            <motion.p variants={fadeUp} className="max-w-lg text-sm leading-relaxed text-navy/50">
              <span className="font-[family-name:var(--font-syne)] font-bold text-accent mr-1.5">
                ✦ P.S.
              </span>
              {data.ps.replace(/^P\.S\.\s*/, "")}
            </motion.p>

            {/* Skill tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="rounded-full bg-mint px-3.5 py-1.5 text-xs font-medium text-navy select-none cursor-default"
                  whileHover={{
                    scale: 1.08,
                    transition: { type: "spring", stiffness: 400, damping: 12 },
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right: photo ── */}
        <motion.div
          className="shrink-0 flex justify-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="hero-photo relative h-52 w-52 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-3xl overflow-hidden"
            style={{ boxShadow: [
              "0 0 0 1px rgba(112, 219, 207, 0.3)",   /* thin inner edge hint */
              "0 0 12px 5px rgba(112, 219, 207, 0.18)", /* inner soft glow */
              "0 0 28px 12px rgba(112, 219, 207, 0.07)", /* outer diffuse fade */
              "0 4px 8px -2px rgba(10, 54, 79, 0.06)",   /* subtle drop shadow */
            ].join(", ") }}
            whileHover={{
              scale: 1.03,
              transition: { type: "spring", stiffness: 300, damping: 18 },
            }}
          >
            <Image
              src={data.photo}
              alt={`Photo of ${data.name}`}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 208px, (max-width: 1024px) 256px, 288px"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
