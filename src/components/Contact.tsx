"use client";

import { motion } from "framer-motion";
import type { ContactData } from "@/types/portfolio";
import contactData from "@/data/contact.json";

const data: ContactData = contactData;

/* ── Framer Motion variant sets ── */
const entranceStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } as const },
};

const entranceFadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" as const } },
};

/* Card: bounces up + grows shadow */
const cardVariants = {
  rest:  { y: 0, scale: 1, boxShadow: "0 1px 4px rgba(10,54,79,0.04)" },
  hover: {
    y: -16,
    scale: 1.05,
    boxShadow: "0 24px 48px rgba(112,219,207,0.22)",
    transition: { type: "spring" as const, stiffness: 380, damping: 10 },
  },
};

/* Icon: spins + scales up */
const iconVariants = {
  rest:  { scale: 1, rotate: 0 },
  hover: {
    scale: 1.45,
    rotate: -15,
    transition: { type: "spring" as const, stiffness: 500, damping: 10 },
  },
};

/* Value text: follows CSS color token — works in both modes */
const valueVariants = {
  rest:  { scale: 1,   color: "var(--color-navy)" },
  hover: {
    scale: 1.1,
    color: "var(--color-accent)",
    transition: { type: "spring" as const, stiffness: 400, damping: 14 },
  },
};

/* ── Icons ── */
function EmailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon />,
  LinkedIn: <LinkedInIcon />,
};

interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

function ContactCard({ icon, label, value, href, external }: ContactCardProps) {
  return (
    <motion.a
      variants={entranceFadeUp}   /* entrance animation from parent stagger */
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="contact-card flex items-center gap-4 rounded-2xl bg-highlight/50 p-5 flex-1 min-w-0 cursor-pointer"
      aria-label={`${label}: ${value}`}
      style={{ willChange: "transform" }}
    >
      {/* Animated variants from parent whileHover="hover" propagate to children */}
      <motion.div
        variants={iconVariants}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-navy"
      >
        {icon}
      </motion.div>

      <div className="min-w-0">
        <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-grey">{label}</p>
        <motion.p
          variants={valueVariants}
          className="mt-0.5 text-sm font-medium truncate"
        >
          {value}
        </motion.p>
      </div>
    </motion.a>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-8 py-12 md:py-16"
      aria-label="Contact section"
    >
      <motion.div
        className="mx-auto max-w-5xl"
        variants={entranceStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Row 1: email + phone */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-3 md:mb-4">
          <ContactCard icon={<EmailIcon />} label="Email" value={data.email} href={`mailto:${data.email}`} />
          <ContactCard icon={<PhoneIcon />} label="Phone" value={`+91 ${data.phone}`} href={`tel:+91${data.phone}`} />
        </div>

        {/* Row 2: GitHub + LinkedIn */}
        {data.links.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {data.links.map((link) => (
              <ContactCard
                key={link.label}
                icon={iconMap[link.label] ?? <GitHubIcon />}
                label={link.label}
                value={link.href.replace("https://", "").replace(/\/$/, "")}
                href={link.href}
                external
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
