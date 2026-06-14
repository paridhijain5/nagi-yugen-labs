import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function LiveStat({ label, value, unit = "", tone = "aqua" }: { label: string; value: number | string; unit?: string; tone?: "aqua" | "red" | "mint" | "blue" }) {
  const bg = {
    aqua: "bg-accent/40",
    red: "bg-primary/15",
    mint: "bg-secondary/60",
    blue: "bg-foreground/5",
  }[tone];
  return (
    <motion.div whileHover={{ y: -3 }} className={`p-3 rounded-2xl glass`}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <div className="font-display text-2xl font-bold">{value}</div>
        {unit && <div className="text-xs text-muted-foreground">{unit}</div>}
      </div>
      <div className={`mt-2 h-1 rounded-full ${bg}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: typeof value === "number" ? `${Math.min(100, value)}%` : "70%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-foreground/60"
        />
      </div>
    </motion.div>
  );
}

export function FloatingWidget({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={`glass-strong rounded-2xl p-4 shadow-soft min-w-[180px] ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, jp }: { eyebrow?: string; title: string; jp?: string }) {
  return (
    <div>
      {eyebrow && <div className="text-xs uppercase tracking-[0.2em] text-primary font-medium">{eyebrow}</div>}
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
        {title} {jp && <span className="text-muted-foreground/60 text-xl ml-2 font-normal" style={{ fontFamily: "var(--font-jp)" }}>{jp}</span>}
      </h2>
    </div>
  );
}

export function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
        active ? "gradient-red text-primary-foreground shadow-red" : "glass-strong hover:scale-105"
      }`}
    >
      {children}
    </button>
  );
}

export function ScoreBar({ label, value, color = "#447A9C" }: { label: string; value: number; color?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
