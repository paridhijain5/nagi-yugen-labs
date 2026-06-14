import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Wind, TreePine, Train, Coffee, Sparkles } from "lucide-react";
import { useCity } from "@/lib/city-store";
import { places, calmTrend } from "@/lib/nagi-data";
import { CalmMap } from "@/components/calm-map";
import { LiveStat, FloatingWidget, SectionTitle, Chip } from "@/components/nagi-ui";
import { CalmHero } from "@/components/calm-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nagi — Move through cities calmly" },
      { name: "description", content: "Find quieter routes, peaceful places, and low-stress travel in real time." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { city } = useCity();
  const cityPlaces = places.filter((p) => p.city === city.id);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-accent/30 blur-3xl animate-float-slow" />
          <div className="absolute top-40 -right-32 w-[400px] h-[400px] rounded-full bg-primary/15 blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-glow" />
              Live in {city.name} <span className="opacity-60">· {city.jp}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight"
            >
              Move through<br />
              cities <span className="text-gradient">calmly.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 text-lg text-muted-foreground max-w-xl"
            >
              Find quieter routes, peaceful places, and low-stress travel experiences in real time. Nagi reads your city's pulse — so your day can feel softer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/explore" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-red text-primary-foreground font-medium shadow-red hover:scale-[1.03] transition">
                Explore Calm Routes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/map" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong font-medium hover:scale-[1.03] transition">
                <MapPin className="w-4 h-4" /> Open Live Map
              </Link>
            </motion.div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <LiveStat label="City Calm" value={city.calmIndex} unit="" tone="aqua" />
              <LiveStat label="Crowd" value={62} unit="%" tone="red" />
              <LiveStat label="Quietest" value="Yoyogi" tone="mint" />
              <LiveStat label="Transit" value={81} unit="" tone="blue" />
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[480px] lg:h-[560px]">
            <CalmHero />
          </div>
        </div>
      </section>

      {/* PREVIEW MAP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 relative">
            <CalmMap
              center={city.center}
              zoom={city.zoom}
              points={cityPlaces.map((p) => ({ id: p.id, pos: p.pos, intensity: p.crowd, label: p.name, type: p.type }))}
              className="h-[420px] rounded-3xl overflow-hidden shadow-soft glass-strong p-1"
            />
            <div className="absolute top-4 left-4 flex gap-2 z-[400]">
              {["Quiet Cafés", "Parks", "Low Crowd", "Nature"].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <FloatingWidget className="absolute bottom-4 right-4 z-[400]">
              <div className="text-xs text-muted-foreground">Now in {city.name}</div>
              <div className="font-display text-2xl font-semibold">{city.vibe}</div>
              <div className="mt-1 text-xs text-primary">Calm index {city.calmIndex} · trending up</div>
            </FloatingWidget>
          </div>

          <div className="space-y-4">
            <InsightCard icon={Wind} title="Air softer than usual" body="PM2.5 down 18% this afternoon. Riverside walks recommended." tone="aqua" />
            <InsightCard icon={Coffee} title="Quiet café nearby" body="Blue Bottle Aoyama · 32% crowd · soft jazz · open seat by window." tone="mint" />
            <InsightCard icon={Train} title="Take the Chiyoda Line" body="Comfort 88 · 6 min slower but ½ the crowd." tone="navy" />
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <SectionTitle eyebrow="What Nagi does" jp="静けさの設計" title="A city that listens back." />
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {[
            { icon: MapPin, title: "Calm Map", body: "Real-time crowd, noise, and greenery heatmaps across your city.", to: "/map" },
            { icon: Train, title: "Smart Transit", body: "Pick lines by comfort — not just speed. Comfort scores per carriage.", to: "/transit" },
            { icon: TreePine, title: "Calm Spaces", body: "Discover quiet cafés, parks, libraries and meditation rooms.", to: "/spaces" },
            { icon: Sparkles, title: "AI Insights", body: "Personal recommendations tuned to your sensory preferences.", to: "/insights" },
            { icon: Wind, title: "Sensory Profile", body: "Tell Nagi how you experience the city. It adapts everything.", to: "/profile" },
            { icon: Coffee, title: "Community", body: "Hidden quiet spots shared by people who care about calm.", to: "/community" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={f.to} className="group block p-6 rounded-3xl glass hover:shadow-soft transition h-full">
                <div className="w-11 h-11 rounded-2xl bg-accent/40 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <f.icon className="w-5 h-5" />
                </div>
                <div className="font-display text-lg font-semibold">{f.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
                <div className="mt-4 text-sm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  Open <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TREND */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <SectionTitle eyebrow="This week" jp="今週の鼓動" title="Your city's calm rhythm." />
            <p className="mt-4 text-muted-foreground max-w-md">
              Nagi tracks crowd density, noise, transit comfort, and greenery to compute a daily Calm Index — so you can plan around your city's quietest moments.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Chip>Tuesday morning · best commute</Chip>
              <Chip>Sunday · peak calm</Chip>
            </div>
          </div>
          <div className="lg:col-span-3 p-6 rounded-3xl glass-strong shadow-soft">
            <CalmTrendChart />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="relative overflow-hidden rounded-3xl gradient-deep text-background p-10 md:p-16">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <div className="text-xs uppercase tracking-widest opacity-70">Yūgen Labs · 幽玄</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight" style={{ color: "var(--mint)" }}>
              Cities should breathe with you.
            </h2>
            <p className="mt-4 opacity-80 max-w-lg">
              Join 240,000 quieter commuters reshaping how we move through urban space.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/explore" className="px-6 py-3 rounded-full gradient-red text-primary-foreground font-medium shadow-red hover:scale-105 transition">Start exploring</Link>
              <Link to="/community" className="px-6 py-3 rounded-full bg-white/10 backdrop-blur font-medium hover:bg-white/20 transition" style={{ color: "var(--mint)" }}>Meet the community</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InsightCard({ icon: Icon, title, body, tone }: { icon: any; title: string; body: string; tone: "aqua" | "mint" | "navy" }) {
  const bg = tone === "aqua" ? "bg-accent/40" : tone === "mint" ? "bg-secondary/60" : "bg-foreground/5";
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-5 rounded-3xl glass shadow-soft"
    >
      <div className={`w-10 h-10 rounded-2xl ${bg} flex items-center justify-center mb-3`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="font-display font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </motion.div>
  );
}

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RTooltip } from "recharts";

function CalmTrendChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <AreaChart data={calmTrend} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="g-calm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A7DADC" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#A7DADC" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="g-crowd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E63746" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#E63746" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" stroke="currentColor" opacity={0.5} fontSize={11} />
          <YAxis stroke="currentColor" opacity={0.4} fontSize={11} />
          <RTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
          <Area type="monotone" dataKey="calm" stroke="#447A9C" strokeWidth={2.5} fill="url(#g-calm)" />
          <Area type="monotone" dataKey="crowd" stroke="#E63746" strokeWidth={2} fill="url(#g-crowd)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
