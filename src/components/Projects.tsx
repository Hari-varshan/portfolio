"use client";

import { motion } from "framer-motion";
import type { ProjectsData } from "@/types/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

const data = projectsData as unknown as ProjectsData;

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Projects() {
  return (
    <section
      id="projects"
      className="px-6 md:px-8 py-12 md:py-16"
      aria-label="Projects section"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.h2
          className="font-[family-name:var(--font-geist-sans)] text-3xl md:text-4xl font-bold text-navy mb-8 md:mb-10"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {data.sectionTitle}
          <span className="text-accent">.</span>
        </motion.h2>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.items.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
