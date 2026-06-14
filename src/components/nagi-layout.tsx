import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";
import { useCity } from "@/lib/city-store";
import { cities } from "@/lib/nagi-data";
import { Moon, Sun, ChevronDown, Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/map", label: "Calm Map" },
  { to: "/transit", label: "Transit" },
  { to: "/spaces", label: "Spaces" },
  { to: "/insights", label: "Insights" },
  { to: "/community", label: "Community" },
  { to: "/profile", label: "Profile" },
] as const;

export function NagiLayout({ children }: { children: ReactNode }) {
  const { city, setCity, dark, toggleDark } = useCity();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [cityOpen, setCityOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-full gradient-red shadow-red flex items-center justify-center">
              <span className="absolute inset-0 rounded-full animate-pulse-ring bg-primary/40" />
              <span className="text-primary-foreground font-display text-sm font-bold relative">凪</span>
            </div>
            <div className="leading-none">
              <div className="font-display font-bold text-lg tracking-tight">Nagi</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">by Yūgen Labs</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative px-3 py-1.5 text-sm rounded-full transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-accent/40"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative">{n.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setCityOpen((o) => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-sm hover:shadow-soft transition"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow" />
                {city.name}
                <span className="text-xs text-muted-foreground hidden sm:inline">{city.jp}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <AnimatePresence>
                {cityOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl p-2 shadow-soft"
                  >
                    {cities.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { setCity(c.id); setCityOpen(false); }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm flex items-center justify-between hover:bg-accent/40 transition ${
                          c.id === city.id ? "bg-accent/30" : ""
                        }`}
                      >
                        <span>
                          <span className="font-medium">{c.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">{c.jp}</span>
                        </span>
                        <span className="text-xs text-primary">{c.calmIndex}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleDark}
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:shadow-soft transition"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button onClick={() => setMobile((m) => !m)} className="lg:hidden w-9 h-9 rounded-full glass flex items-center justify-center">
              {mobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-border/50"
            >
              <div className="px-4 py-3 grid grid-cols-2 gap-2">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMobile(false)}
                    className="px-3 py-2 rounded-xl text-sm hover:bg-accent/40"
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border/50 bg-gradient-to-b from-transparent to-accent/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-red shadow-red flex items-center justify-center text-primary-foreground font-display font-bold text-sm">凪</div>
            <div>
              <div className="font-display font-bold text-lg">Nagi</div>
              <div className="text-xs text-muted-foreground">by Yūgen Labs · 幽玄</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            We believe cities should breathe with you. Nagi is real-time urban calm intelligence — for healthier, quieter, more humane commuting.
          </p>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:scale-105 transition">App Store</button>
            <button className="px-4 py-2 rounded-xl glass text-sm font-medium hover:scale-105 transition">Google Play</button>
          </div>
        </div>
        <FooterCol title="Product" items={["Calm Map", "Transit", "Spaces", "Insights", "API"]} />
        <FooterCol title="Cities" items={["Tokyo", "Kyoto", "Singapore", "Seoul", "London"]} />
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">Newsletter</div>
          <p className="text-sm text-muted-foreground mb-3">Monthly notes on calmer urban living.</p>
          <div className="flex gap-2">
            <input placeholder="you@calm.city" className="flex-1 px-3 py-2 rounded-xl glass text-sm outline-none focus:ring-2 ring-accent/60" />
            <button className="px-3 py-2 rounded-xl gradient-red text-primary-foreground text-sm font-medium shadow-red">Join</button>
          </div>
          <div className="mt-6 flex gap-3 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Twitter</a>
            <a href="#" className="hover:text-foreground">Instagram</a>
            <a href="#" className="hover:text-foreground">GitHub</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Yūgen Labs. Designed for calmer cities.</div>
          <div className="flex gap-4">
            <a href="#">Accessibility</a>
            <a href="#">Privacy</a>
            <a href="#">Philosophy 哲学</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}><a href="#" className="hover:text-primary transition">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
