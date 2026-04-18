export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-cream/80 border-b border-highlight/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-5xl flex items-center px-6 py-4 md:px-8">
        <a
          href="/"
          className="font-[family-name:var(--font-geist-sans)] text-lg font-bold tracking-tight text-navy"
          aria-label="Home"
        >
          HV<span className="text-accent">.</span>
        </a>
      </div>
    </nav>
  );
}
