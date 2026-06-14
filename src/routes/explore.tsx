import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCity } from "@/lib/city-store";
import { places } from "@/lib/nagi-data";
import { CalmMap } from "@/components/calm-map";
import { SectionTitle, Chip, ScoreBar } from "@/components/nagi-ui";
import { Navigation, Wind, Sparkles, MapPin } from "lucide-react";

export const Route = createFileRoute("/explore")({
  head: () => ({ meta: [{ title: "Explore — Nagi" }, { name: "description", content: "Plan calmer routes through your city." }] }),
  component: ExplorePage,
});

type RouteKind = "fastest" | "calmest" | "scenic" | "least-crowded";

const routeKinds: { id: RouteKind; label: string; color: string; jp: string }[] = [
  { id: "fastest", label: "Fastest", color: "#E63746", jp: "速い" },
  { id: "calmest", label: "Calmest", color: "#7BB6A4", jp: "静か" },
  { id: "scenic", label: "Scenic", color: "#A7DADC", jp: "景色" },
  { id: "least-crowded", label: "Least Crowded", color: "#447A9C", jp: "空いてる" },
];

function ExplorePage() {
  const { city } = useCity();
  const [from, setFrom] = useState("Shibuya Station");
  const [to, setTo] = useState("Ueno Park");
  const [kind, setKind] = useState<RouteKind>("calmest");

  const cityPlaces = places.filter((p) => p.city === city.id);
  const [lat, lng] = city.center;
  // Synthesized route polylines per kind
  const route = routesFor(kind, [lat, lng]);

  const scores: Record<RouteKind, { stress: number; noise: number; crowd: number; green: number; comfort: number; time: number }> = {
    fastest: { stress: 72, noise: 78, crowd: 88, green: 18, comfort: 42, time: 22 },
    calmest: { stress: 18, noise: 22, crowd: 24, green: 64, comfort: 88, time: 34 },
    scenic: { stress: 30, noise: 28, crowd: 36, green: 88, comfort: 80, time: 41 },
    "least-crowded": { stress: 26, noise: 38, crowd: 12, green: 52, comfort: 84, time: 36 },
  };
  const s = scores[kind];
  const active = routeKinds.find((r) => r.id === kind)!;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <SectionTitle eyebrow="Smart Route Planner" jp="経路設計" title="Choose how your day should feel." />
      <p className="mt-3 text-muted-foreground max-w-xl">Same destination — four different moods. Nagi weighs noise, crowd, greenery, and transit comfort beside travel time.</p>

      <div className="mt-8 grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-3xl glass-strong shadow-soft space-y-3">
            <Field icon={MapPin} label="From" value={from} onChange={setFrom} />
            <Field icon={Navigation} label="To" value={to} onChange={setTo} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {routeKinds.map((r) => (
              <motion.button
                key={r.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setKind(r.id)}
                className={`p-4 rounded-2xl text-left transition ${
                  kind === r.id ? "glass-strong shadow-soft ring-2 ring-primary/50" : "glass hover:shadow-soft"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
                  <span className="font-medium">{r.label}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground" style={{ fontFamily: "var(--font-jp)" }}>{r.jp}</div>
              </motion.button>
            ))}
          </div>

          <div className="p-5 rounded-3xl glass-strong shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{active.label} route</div>
                <div className="font-display text-3xl font-bold mt-1">{s.time} <span className="text-base font-normal text-muted-foreground">min</span></div>
              </div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${active.color}22`, color: active.color }}>
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <ScoreBar label="Stress" value={s.stress} color="#E63746" />
            <ScoreBar label="Noise" value={s.noise} color="#447A9C" />
            <ScoreBar label="Crowd" value={s.crowd} color="#1D3658" />
            <ScoreBar label="Greenery" value={s.green} color="#7BB6A4" />
            <ScoreBar label="Walking comfort" value={s.comfort} color="#A7DADC" />
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="relative h-[560px]">
            <CalmMap
              center={city.center}
              zoom={city.zoom}
              points={cityPlaces.map((p) => ({ id: p.id, pos: p.pos, intensity: p.crowd, label: p.name, type: p.type }))}
              route={route}
              routeColor={active.color}
              className="h-full rounded-3xl overflow-hidden shadow-soft glass-strong p-1"
            />
            <div className="absolute top-4 right-4 z-[400] glass-strong rounded-2xl p-3 shadow-soft">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{from} → {to}</div>
              <div className="mt-1 flex items-center gap-2 text-sm font-medium">
                <Wind className="w-4 h-4" style={{ color: active.color }} />
                {active.label} via {kind === "calmest" ? "Chiyoda Line" : kind === "scenic" ? "Riverside Walk" : kind === "fastest" ? "Yamanote Line" : "Hibiya Line"}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/map" className="text-xs underline text-muted-foreground hover:text-primary">Open full map →</Link>
            <Link to="/transit" className="text-xs underline text-muted-foreground hover:text-primary">Compare transit comfort →</Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionTitle eyebrow="Featured calm walks" title="Loved by quiet commuters" />
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {["Riverside dawn loop", "Temple alley walk", "Lantern-lit return"].map((t, i) => (
            <motion.div key={t} whileHover={{ y: -4 }} className="p-5 rounded-3xl glass shadow-soft">
              <div className="text-xs text-primary">Walk · {15 + i * 5} min</div>
              <div className="font-display text-lg font-semibold mt-1">{t}</div>
              <p className="mt-1 text-sm text-muted-foreground">Soft footsteps, low noise, generous greenery. Best between 6—9am.</p>
              <div className="mt-3 flex gap-2">
                <Chip>Calm 92</Chip>
                <Chip>Greenery 78</Chip>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange }: { icon: any; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1 flex items-center gap-2 px-3 py-2 rounded-2xl bg-foreground/5">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" />
      </div>
    </label>
  );
}

function routesFor(kind: RouteKind, center: [number, number]): [number, number][] {
  const [lat, lng] = center;
  const o = 0.015;
  switch (kind) {
    case "fastest":
      return [[lat - o, lng - o], [lat - o * 0.4, lng - o * 0.2], [lat + o * 0.4, lng + o * 0.4], [lat + o, lng + o]];
    case "calmest":
      return [[lat - o, lng - o], [lat - o * 0.6, lng + o * 0.1], [lat, lng + o * 0.4], [lat + o * 0.6, lng + o * 0.7], [lat + o, lng + o]];
    case "scenic":
      return [[lat - o, lng - o], [lat - o * 0.5, lng - o * 0.6], [lat + o * 0.2, lng - o * 0.3], [lat + o * 0.6, lng + o * 0.3], [lat + o, lng + o]];
    case "least-crowded":
      return [[lat - o, lng - o], [lat - o * 0.3, lng + o * 0.5], [lat + o * 0.5, lng + o * 0.1], [lat + o, lng + o]];
  }
}
