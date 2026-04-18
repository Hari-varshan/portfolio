// ──────────────────────────────────────────────
// @data-architect — TypeScript interfaces for the portfolio
// ──────────────────────────────────────────────

export interface HeroData {
  name: string;
  role: string;
  tagline: string;
  ps: string;
  photo: string;
  cta: {
    label: string;
    href: string;
  };
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  category: "work" | "personal";
  tech: string[];
  description: string;
  href?: string;
}

export interface ProjectsData {
  sectionTitle: string;
  items: Project[];
}

export interface ExperienceProject {
  id: string;
  title: string;
  tech: string[];
  description: string;
}

export interface ExperienceCompany {
  id: string;
  company: string;
  role: string;
  period: string;
  projects: ExperienceProject[];
}

export interface ExperienceData {
  sectionTitle: string;
  companies: ExperienceCompany[];
}

export interface ContactData {
  sectionTitle: string;
  headline: string;
  email: string;
  phone: string;
  links: {
    label: string;
    href: string;
  }[];
}
