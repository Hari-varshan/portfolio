"use client";

import { motion, useSpring } from "framer-motion";
import type { ExperienceData } from "@/types/portfolio";
import experienceData from "@/data/experience.json";

const data = experienceData as unknown as ExperienceData;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 } as const,
  },
};

/* ── Tilting project card ── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const rotateX = useSpring(0, { stiffness: 200, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateX.set(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4);
    rotateY.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className="tilt-card rounded-xl bg-highlight/50 px-5 py-4 shadow-sm shadow-navy/[0.03]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      className="px-6 md:px-8 py-12 md:py-16"
      aria-label="Experience section"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.h2
          className="font-[family-name:var(--font-geist-sans)] text-3xl md:text-4xl font-bold text-navy mb-8 md:mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {data.sectionTitle}
          <span className="text-accent">.</span>
        </motion.h2>

        {/* One block per company */}
        <div className="flex flex-col gap-10">
          {data.companies.map((company) => (
            <motion.div
              key={company.id}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Company header */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-5 gap-1"
              >
                <h3 className="font-[family-name:var(--font-geist-sans)] text-lg font-semibold text-navy">
                  {company.role}
                  <span className="text-grey font-normal"> @ {company.company}</span>
                </h3>
                <span className="text-xs font-medium uppercase tracking-widest text-grey shrink-0">
                  {company.period}
                </span>
              </motion.div>

              {/* Projects timeline */}
              <div className="exp-timeline relative flex flex-col gap-4 pl-5 border-l-2 border-highlight">
                {company.projects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={fadeUp}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="exp-dot absolute -left-[1.45rem] top-[0.35rem] h-3 w-3 rounded-full border-2 border-accent bg-cream" />

                    {/* Tilting project card */}
                    <TiltCard>
                      <p className="font-[family-name:var(--font-geist-sans)] text-base font-semibold text-navy">
                        {project.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-grey">
                        {project.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-mint px-3 py-1 text-xs font-medium text-navy select-none"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
