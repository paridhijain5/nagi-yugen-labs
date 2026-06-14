import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle, Chip } from "@/components/nagi-ui";
import { calmTrend, hourlyCalm } from "@/lib/nagi-data";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { motion } from "framer-motion";
import { Sparkles, Sunrise, Coffee, MoonStar, Brain } from "lucide-react";
import { useCity } from "@/lib/city-store";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [{ title: "Insights — Nagi" }, { name: "description", content: "AI-tuned calm analytics for your week." }] }),
  component: InsightsPage,
});

function InsightsPage() {
  const { city } = useCity();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <SectionTitle eyebrow="AI Insights" jp="洞察" title={`Calm intelligence for ${city.name}`} />

      <div className="mt-10 grid lg:grid-cols-3 gap-5">
        <InsightCard icon={Sunrise} title="Best commute window" body="Tomorrow 7:10—7:40 AM · 38% less crowd than your average." accent="#A7DADC" />
        <InsightCard icon={Coffee} title="Lowest-noise café nearby" body="Daikanyama T-Site · 22 dB · soft jazz · open seats by window." accent="#7BB6A4" />
        <InsightCard icon={MoonStar} title="Evening unwind route" body="Riverside walk through Nakameguro · 18 min · calm 92." accent="#E63746" />
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-6 rounded-3xl glass-strong shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-primary">Weekly stress trend</div>
              <div className="font-display text-2xl font-semibold mt-1">Calm is winning ↑ 12%</div>
            </div>
            <Chip>This week</Chip>
          </div>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <AreaChart data={calmTrend} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="ic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#447A9C" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#447A9C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="in" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E63746" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#E63746" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="currentColor" opacity={0.5} fontSize={11} />
                <YAxis stroke="currentColor" opacity={0.4} fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="calm" stroke="#447A9C" strokeWidth={2.5} fill="url(#ic)" />
                <Area type="monotone" dataKey="noise" stroke="#E63746" strokeWidth={2} fill="url(#in)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-strong shadow-soft flex flex-col">
          <div className="text-xs uppercase tracking-widest text-primary">City Calm Index</div>
          <div className="font-display text-2xl font-semibold">{city.calmIndex}</div>
          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <RadialBarChart innerRadius="65%" outerRadius="100%" data={[{ name: "calm", value: city.calmIndex, fill: "#7BB6A4" }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-muted-foreground text-center">{city.vibe} — trending upward</div>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-6 rounded-3xl glass-strong shadow-soft">
          <div className="text-xs uppercase tracking-widest text-primary">24-hour calm curve</div>
          <div className="font-display text-2xl font-semibold mt-1">Quietest at 4 AM, peak rush 18:00</div>
          <div className="h-60 mt-4">
            <ResponsiveContainer>
              <BarChart data={hourlyCalm} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
                <XAxis dataKey="h" stroke="currentColor" opacity={0.4} fontSize={10} interval={2} />
                <YAxis stroke="currentColor" opacity={0.4} fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="calm" radius={[8, 8, 0, 0]} fill="#A7DADC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-3xl gradient-deep text-background shadow-soft">
          <Brain className="w-6 h-6" style={{ color: "var(--mint)" }} />
          <div className="mt-3 font-display text-xl font-semibold" style={{ color: "var(--mint)" }}>Nagi suggests</div>
          <ul className="mt-3 space-y-3 text-sm" style={{ color: "var(--mint)" }}>
            <li className="flex gap-2"><Sparkles className="w-4 h-4 mt-0.5 opacity-70" /> Skip Shibuya 17:30–19:00, head to Yoyogi instead.</li>
            <li className="flex gap-2"><Sparkles className="w-4 h-4 mt-0.5 opacity-70" /> Tuesday morning sensory-friendly window.</li>
            <li className="flex gap-2"><Sparkles className="w-4 h-4 mt-0.5 opacity-70" /> 3 new quiet cafés saved by friends this week.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ icon: Icon, title, body, accent }: { icon: any; title: string; body: string; accent: string }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="p-6 rounded-3xl glass-strong shadow-soft relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl" style={{ background: accent + "55" }} />
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center relative" style={{ background: accent + "33", color: accent }}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="font-display text-lg font-semibold mt-4 relative">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground relative">{body}</p>
    </motion.div>
  );
}
