import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle, ScoreBar, Chip } from "@/components/nagi-ui";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles, Settings } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Nagi" }, { name: "description", content: "Your personal calm preferences." }] }),
  component: ProfilePage,
});

const prefs = [
  { id: "quiet", label: "Prefers quiet spaces", emoji: "🌿" },
  { id: "low-walk", label: "Low walking routes", emoji: "🚶" },
  { id: "sensory", label: "Sensory-friendly", emoji: "🌸" },
  { id: "green", label: "Greenery preference", emoji: "🌳" },
  { id: "low-crowd", label: "Low crowd tolerance", emoji: "🫧" },
  { id: "night-safe", label: "Night-safe routes", emoji: "🌙" },
];

function ProfilePage() {
  const [active, setActive] = useState<string[]>(["quiet", "sensory", "green"]);
  const [tolerance, setTolerance] = useState(35);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <div className="p-6 rounded-3xl glass-strong shadow-soft text-center">
          <div className="mx-auto w-24 h-24 rounded-full gradient-deep flex items-center justify-center text-3xl font-display font-bold" style={{ color: "var(--mint)" }}>
            凪
          </div>
          <div className="mt-4 font-display text-xl font-semibold">Hana Y.</div>
          <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><MapPin className="w-3 h-3" /> Tokyo · Setagaya</div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Stat n="142" label="Calm routes" />
            <Stat n="38" label="Saved" />
            <Stat n="7" label="Cities" />
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-accent/30 text-left">
            <div className="text-xs uppercase tracking-widest text-primary">Calm Score</div>
            <div className="font-display text-3xl font-bold mt-1">82</div>
            <div className="text-xs text-muted-foreground">Up 6 this week. Your evenings are calmer.</div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl glass-strong shadow-soft">
            <SectionTitle eyebrow="Preferences" title="How do you want to move?" />
            <div className="mt-6 grid md:grid-cols-2 gap-3">
              {prefs.map((p) => {
                const on = active.includes(p.id);
                return (
                  <motion.button
                    key={p.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActive((a) => (a.includes(p.id) ? a.filter((x) => x !== p.id) : [...a, p.id]))}
                    className={`flex items-center gap-3 p-4 rounded-2xl transition text-left ${
                      on ? "bg-primary/10 ring-2 ring-primary/50" : "bg-foreground/5 hover:bg-foreground/10"
                    }`}
                  >
                    <div className="text-2xl">{p.emoji}</div>
                    <div className="flex-1">
                      <div className="font-medium">{p.label}</div>
                      <div className="text-xs text-muted-foreground">{on ? "Active" : "Tap to enable"}</div>
                    </div>
                    <div className={`w-9 h-5 rounded-full p-0.5 transition ${on ? "bg-primary" : "bg-foreground/20"}`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? "translate-x-4" : ""}`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-foreground/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Crowd tolerance</div>
                  <div className="text-sm">{tolerance < 30 ? "Very low — Nagi reroutes aggressively" : tolerance < 60 ? "Moderate" : "Flexible"}</div>
                </div>
                <div className="font-display text-2xl font-bold">{tolerance}</div>
              </div>
              <input
                type="range"
                min={0} max={100}
                value={tolerance}
                onChange={(e) => setTolerance(+e.target.value)}
                className="w-full mt-3 accent-[color:var(--primary)]"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-strong shadow-soft">
            <SectionTitle eyebrow="Adapting to you" title="What Nagi has learned" />
            <div className="mt-6 space-y-3">
              <ScoreBar label="Weekday calm preference" value={82} color="#7BB6A4" />
              <ScoreBar label="Greenery weight" value={71} color="#A7DADC" />
              <ScoreBar label="Late-night safety" value={64} color="#447A9C" />
              <ScoreBar label="Reroute willingness" value={56} color="#E63746" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Chip><Sparkles className="w-3 h-3 inline mr-1" /> Avoid Shibuya 17—19</Chip>
              <Chip><Heart className="w-3 h-3 inline mr-1" /> 12 quiet cafés saved</Chip>
              <Chip><Settings className="w-3 h-3 inline mr-1" /> Sensory mode on</Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="p-2 rounded-xl bg-foreground/5">
      <div className="font-display text-lg font-bold">{n}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
