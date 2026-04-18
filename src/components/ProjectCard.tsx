"use client";

import { motion, useSpring } from "framer-motion";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.45,
      ease: "easeOut" as const,
    },
  }),
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  /* ── 3D tilt via spring motion values ── */
  const rotateX = useSpring(0, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -4);
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 4);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const inner = (
    <>
      {/* Category badge */}
      <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-grey">
        {project.category === "work" ? "Professional" : "Personal Project"}
      </span>

      {/* Title */}
      <h3 className="font-[family-name:var(--font-syne)] text-xl md:text-2xl font-semibold text-navy leading-snug">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base leading-relaxed text-grey">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-navy select-none"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <motion.div
      className="group flex flex-col justify-between gap-5 rounded-2xl bg-highlight/60 p-6 md:p-8
        shadow-sm shadow-navy/[0.04] cursor-default"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      aria-label={`Project: ${project.title}`}
    >
      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-5 h-full"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.div>
  );
}
