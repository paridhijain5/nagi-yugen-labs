import { createFileRoute } from "@tanstack/react-router";
import { transit } from "@/lib/nagi-data";
import { SectionTitle, ScoreBar, Chip } from "@/components/nagi-ui";
import { motion } from "framer-motion";
import { Train, AlertCircle, CloudRain, Clock } from "lucide-react";

export const Route = createFileRoute("/transit")({
  head: () => ({ meta: [{ title: "Transit — Nagi" }, { name: "description", content: "Live train comfort, crowding and delays." }] }),
  component: TransitPage,
});

function TransitPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <SectionTitle eyebrow="Live Transit" jp="移動の快適さ" title="Pick a line by how it feels." />

      <div className="grid md:grid-cols-4 gap-4 mt-8">
        <Metric label="Network comfort" value="74" unit="/100" tone="aqua" />
        <Metric label="Avg crowd" value="62" unit="%" tone="red" />
        <Metric label="Quietest line" value="Chiyoda" tone="mint" />
        <Metric label="Weather" value="Light rain" tone="navy" icon={CloudRain} />
      </div>

      <div className="mt-10 space-y-4">
        {transit.map((line, i) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="p-6 rounded-3xl glass-strong shadow-soft"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: line.color + "33", color: line.color }}>
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold">{line.name}</div>
                  <div className="text-xs text-muted-foreground">{line.stations.length} stations · {line.delay ? `${line.delay}m delay` : "On time"}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Chip>{line.comfort > 80 ? "Calm" : line.comfort > 60 ? "Mild" : "Active"}</Chip>
                {line.delay > 0 && <Chip>Delayed</Chip>}
              </div>
            </div>

            {/* Animated line visualization */}
            <div className="mt-6 relative h-16">
              <div className="absolute inset-x-0 top-1/2 h-1.5 rounded-full" style={{ background: line.color, opacity: 0.25 }} />
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between">
                {line.stations.map((s, j) => (
                  <div key={j} className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full border-2 bg-background" style={{ borderColor: line.color }} />
                    <div className="text-[10px] mt-1.5 text-muted-foreground whitespace-nowrap">{s}</div>
                  </div>
                ))}
              </div>
              {/* Moving train */}
              <div className="absolute top-1/2 -translate-y-1/2 animate-train" style={{ width: 24 }}>
                <div className="w-6 h-6 rounded-full shadow-glow" style={{ background: line.color }} />
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <ScoreBar label="Comfort" value={line.comfort} color={line.color} />
              <ScoreBar label="Crowd" value={line.crowd} color="#E63746" />
              <ScoreBar label="Expected quietness" value={100 - line.crowd} color="#7BB6A4" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl glass-strong shadow-soft">
          <div className="flex items-center gap-2 text-sm text-primary"><AlertCircle className="w-4 h-4" /> Alerts</div>
          <div className="mt-3 space-y-2 text-sm">
            <div>Ginza Line · minor crowding near Ueno (15:40)</div>
            <div>Marunouchi Line · maintenance window 23:30–04:30</div>
          </div>
        </div>
        <div className="p-6 rounded-3xl glass-strong shadow-soft">
          <div className="flex items-center gap-2 text-sm text-primary"><Clock className="w-4 h-4" /> Best times to travel</div>
          <div className="mt-3 grid grid-cols-7 gap-1 h-20">
            {Array.from({ length: 28 }).map((_, i) => {
              const v = 30 + Math.round(Math.sin(i / 3) * 35 + 35);
              return <div key={i} className="rounded" style={{ background: `oklch(0.7 0.08 ${200 - v}deg)`, opacity: v / 100 }} />;
            })}
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Tuesday 10:20 AM looks calmest this week.</div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, unit = "", tone, icon: Icon }: { label: string; value: string | number; unit?: string; tone: "aqua" | "red" | "mint" | "navy"; icon?: any }) {
  const tones = {
    aqua: "from-accent/40 to-accent/10",
    red: "from-primary/30 to-primary/5",
    mint: "from-secondary/60 to-secondary/10",
    navy: "from-foreground/15 to-foreground/0",
  };
  return (
    <div className={`p-5 rounded-3xl glass-strong shadow-soft bg-gradient-to-br ${tones[tone]}`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        {Icon && <Icon className="w-3.5 h-3.5" />} {label}
      </div>
      <div className="mt-2 font-display text-3xl font-bold">
        {value}{unit && <span className="text-base font-normal text-muted-foreground ml-1">{unit}</span>}
      </div>
    </div>
  );
}
