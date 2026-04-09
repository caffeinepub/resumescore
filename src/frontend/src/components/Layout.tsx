import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, Github, History, Home, Twitter, Zap } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/analyze", label: "Analyze", icon: Zap },
  { to: "/history", label: "History", icon: History },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-smooth">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-semibold text-lg text-foreground">
                Resume<span className="text-primary">Score</span>
              </span>
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-1">
              {navLinks.map(({ to, label }) => {
                const isActive = currentPath === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    data-ocid={`nav-${label.toLowerCase()}`}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <Link
                to="/analyze"
                data-ocid="nav-cta"
                className="ml-3 px-4 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-smooth shadow-elevated"
              >
                Analyze Resume
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Branding */}
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-display font-semibold text-foreground">
                ResumeScore
              </span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">
                Web Dev Summit 2026
              </span>
            </div>

            {/* Event info */}
            <div className="text-center text-sm text-muted-foreground">
              <span className="text-foreground font-medium">
                Resume Scoring System
              </span>
              {" · "}AI-powered analysis &amp; improvement tips
            </div>

            {/* Social + caffeine */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <span className="text-muted-foreground text-sm">
                © {new Date().getFullYear()}.{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                    typeof window !== "undefined"
                      ? window.location.hostname
                      : "",
                  )}`}
                  className="hover:text-primary transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Built with love using caffeine.ai
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
