import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useCity } from "@/lib/city-store";
import { places } from "@/lib/nagi-data";
import { CalmMap } from "@/components/calm-map";
import { SectionTitle, Chip } from "@/components/nagi-ui";
import { motion } from "framer-motion";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Calm Map — Nagi" }, { name: "description", content: "Live calm heatmap of crowd, noise, greenery and quiet zones." }] }),
  component: MapPage,
});

const filters = ["Quiet Cafés", "Calm Routes", "Low Crowd", "Nature", "Low Noise", "Late Night Safe", "Remote Work"];

function MapPage() {
  const { city } = useCity();
  const [active, setActive] = useState<string[]>(["Low Crowd", "Nature"]);

  const toggle = (f: string) => setActive((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));

  const cityPlaces = useMemo(() => places.filter((p) => p.city === city.id), [city.id]);

  const filtered = cityPlaces.filter((p) => {
    if (!active.length) return true;
    if (active.includes("Quiet Cafés") && p.type === "Café") return true;
    if (active.includes("Nature") && p.type === "Park") return true;
    if (active.includes("Low Crowd") && p.crowd < 40) return true;
    if (active.includes("Low Noise") && p.noise < 30) return true;
    if (active.includes("Remote Work") && p.wifi === "Fast") return true;
    if (active.includes("Calm Routes")) return true;
    if (active.includes("Late Night Safe") && (p.type === "Park" || p.type === "Café")) return true;
    return false;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <SectionTitle eyebrow="Live Calm Map" jp="街の地図" title={`${city.name} right now`} />
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#7BB6A4]" /> Calm</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#A7DADC]" /> Mild</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#447A9C]" /> Active</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#E63746]" /> Crowded</span>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Chip key={f} active={active.includes(f)} onClick={() => toggle(f)}>{f}</Chip>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <CalmMap
            center={city.center}
            zoom={city.zoom}
            points={filtered.map((p) => ({ id: p.id, pos: p.pos, intensity: p.crowd, label: p.name, type: p.type }))}
            className="h-[640px] rounded-3xl overflow-hidden shadow-soft glass-strong p-1"
          />
        </div>
        <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="p-4 rounded-2xl glass-strong shadow-soft"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.type} · {p.hours}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Calm</div>
                  <div className="font-display text-xl font-bold">{100 - p.crowd}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                <Mini label="Crowd" value={`${p.crowd}%`} />
                <Mini label="Noise" value={`${p.noise} dB`} />
                <Mini label="Seats" value={p.seats} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/40">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
          {!filtered.length && (
            <div className="p-6 rounded-2xl glass text-sm text-muted-foreground">No spots match these filters. Try removing one.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-foreground/5 p-2">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="text-xs font-medium mt-0.5">{value}</div>
    </div>
  );
}
