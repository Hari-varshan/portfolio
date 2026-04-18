import type { Metadata } from "next";
import { Geist, DM_Sans, Fraunces } from "next/font/google";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

/* Name: Fraunces — expressive, wonky serif */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["italic"],
  axes: ["WONK"],
});

/* Section headings: Geist — crisp, technical */
const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Body: DM Sans — warm, readable */
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Hari Varshan — AI Engineer",
  description:
    "Personal portfolio of Hari Varshan — AI Engineer specializing in multi-agent systems, RAG pipelines, and production AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        {/* Runs synchronously before paint — prevents flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        <ThemeToggle />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
