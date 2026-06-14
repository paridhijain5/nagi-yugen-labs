import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCity } from "@/lib/city-store";
import { places } from "@/lib/nagi-data";
import { SectionTitle, Chip, ScoreBar } from "@/components/nagi-ui";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Volume2, Users, Wifi, Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/spaces")({
  head: () => ({ meta: [{ title: "Calm Spaces — Nagi" }, { name: "description", content: "Cafés, parks, libraries and meditation rooms for quieter days." }] }),
  component: SpacesPage,
});

const types = ["All", "Café", "Park", "Library", "Co-work", "Meditation", "Restaurant"];

const stockColors = ["#A7DADC", "#7BB6A4", "#447A9C", "#E29A3F", "#E63746", "#1D3658", "#C5D5C0", "#F4B393"];

function SpacesPage() {
  const { city } = useCity();
  const [type, setType] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  const list = places.filter((p) => p.city === city.id && (type === "All" || p.type === type));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <SectionTitle eyebrow="Calm Spaces" jp="居場所" title="Places that breathe slower." />
      <div className="mt-6 flex flex-wrap gap-2">
        {types.map((t) => (
          <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p, i) => {
          const color = stockColors[i % stockColors.length];
          const isOpen = open === p.id;
          const isSaved = saved.includes(p.id);
          return (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl glass-strong shadow-soft overflow-hidden group"
            >
              {/* Generated visual */}
              <div className="relative h-44 overflow-hidden">
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top left, ${color}88, transparent 60%), radial-gradient(ellipse at bottom right, #1D365855, transparent 60%), linear-gradient(135deg, ${color}33, #F2FAEF)` }} />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path d="M0 140 Q 80 100 160 130 T 320 110 T 400 130 V 200 H 0 Z" fill={color} opacity="0.4" />
                  <path d="M0 160 Q 100 130 200 150 T 400 140 V 200 H 0 Z" fill="#1D3658" opacity="0.5" />
                  <circle cx="320" cy="50" r="22" fill={color} opacity="0.7" />
                </svg>
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="text-[10px] px-2 py-1 rounded-full glass-strong">{p.type}</span>
                  <span className="text-[10px] px-2 py-1 rounded-full glass-strong">Calm {100 - p.crowd}</span>
                </div>
                <button
                  onClick={() => setSaved((s) => (s.includes(p.id) ? s.filter((x) => x !== p.id) : [...s, p.id]))}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full glass-strong flex items-center justify-center hover:scale-110 transition"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? "fill-primary text-primary" : ""}`} />
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-display text-lg font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {city.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold" style={{ color }}>{p.ambience}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ambience</div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2 text-[11px]">
                  <Stat icon={Users} value={`${p.crowd}%`} />
                  <Stat icon={Volume2} value={`${p.noise} dB`} />
                  <Stat icon={Wifi} value={p.wifi} />
                  <Stat icon={Clock} value={p.seats} />
                </div>

                <button
                  onClick={() => setOpen(isOpen ? null : p.id)}
                  className="mt-4 text-xs text-primary hover:underline"
                >
                  {isOpen ? "Less details" : "More details"} →
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-3 pt-3 border-t border-border/50">
                        <div className="text-xs text-muted-foreground">{p.hours}</div>
                        <ScoreBar label="Crowd level" value={p.crowd} color="#E63746" />
                        <ScoreBar label="Noise" value={p.noise} color="#447A9C" />
                        <ScoreBar label="Ambience" value={p.ambience} color={color} />
                        <div className="flex flex-wrap gap-1">
                          {p.tags.map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/40">{t}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value }: { icon: any; value: string }) {
  return (
    <div className="rounded-xl bg-foreground/5 p-2 flex items-center gap-1.5">
      <Icon className="w-3 h-3 text-muted-foreground" />
      <span className="text-[11px] font-medium">{value}</span>
    </div>
  );
}
