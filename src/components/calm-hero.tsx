import { motion } from "framer-motion";

/**
 * Animated abstract city visualization for the hero.
 * SVG city silhouette with glowing calm zones, moving transit lines,
 * floating cards, and ambient pulses.
 */
export function CalmHero() {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 600 600" className="w-full h-full">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A7DADC" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F2FAEF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="calmZone" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A7DADC" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#A7DADC" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hotZone" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E63746" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E63746" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="line1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#447A9C" />
            <stop offset="100%" stopColor="#A7DADC" />
          </linearGradient>
        </defs>

        <rect width="600" height="600" fill="url(#sky)" rx="32" />

        {/* Calm + hot zones */}
        <circle cx="180" cy="220" r="120" fill="url(#calmZone)">
          <animate attributeName="r" values="110;140;110" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="430" cy="180" r="100" fill="url(#calmZone)">
          <animate attributeName="r" values="90;120;90" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="340" cy="430" r="110" fill="url(#hotZone)">
          <animate attributeName="r" values="100;130;100" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* City skyline */}
        <g opacity="0.85">
          {[
            [40, 380, 50, 140],
            [100, 340, 60, 180],
            [170, 310, 70, 210],
            [250, 280, 80, 240],
            [340, 320, 60, 200],
            [410, 290, 80, 230],
            [500, 340, 60, 180],
            [570, 360, 30, 160],
          ].map(([x, y, w, h], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width={w}
              height={h}
              rx="6"
              fill="#1D3658"
              fillOpacity={0.85 - i * 0.04}
            />
          ))}
        </g>

        {/* Transit line — animated */}
        <path
          d="M 20 460 Q 150 420 280 450 T 580 430"
          stroke="url(#line1)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          className="animate-dash"
        />
        <path
          d="M 30 500 Q 200 470 360 490 T 590 470"
          stroke="#E63746"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
          strokeDasharray="6 8"
        />

        {/* Moving train dot */}
        <circle r="6" fill="#A7DADC" stroke="#447A9C" strokeWidth="2">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 20 460 Q 150 420 280 450 T 580 430" />
        </circle>
        <circle r="5" fill="#E63746">
          <animateMotion dur="8s" repeatCount="indefinite" path="M 30 500 Q 200 470 360 490 T 590 470" />
        </circle>

        {/* Calm pulses */}
        {[
          [180, 220, "#A7DADC"],
          [430, 180, "#7BB6A4"],
          [340, 430, "#E63746"],
        ].map(([cx, cy, color], i) => (
          <g key={i}>
            <circle cx={cx as number} cy={cy as number} r="6" fill={color as string} />
            <circle cx={cx as number} cy={cy as number} r="6" fill="none" stroke={color as string} strokeWidth="2">
              <animate attributeName="r" values="6;28;6" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Floating cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute top-6 right-4 glass-strong rounded-2xl p-3 shadow-soft animate-float-slow"
      >
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Quietest district</div>
        <div className="font-display text-base font-semibold mt-1">Yoyogi · 代々木</div>
        <div className="text-[11px] text-primary mt-0.5">Calm 92 · ↑ 4</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-12 left-2 glass-strong rounded-2xl p-3 shadow-soft animate-float-slow"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Transit comfort</div>
        <div className="flex items-end gap-1 mt-1">
          {[60, 75, 88, 55, 70, 92, 81].map((v, i) => (
            <div key={i} className="w-2 rounded-full bg-gradient-to-t from-accent to-foreground" style={{ height: `${v / 3}px` }} />
          ))}
        </div>
        <div className="text-[11px] text-foreground mt-1.5">Chiyoda Line · 88</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute top-1/2 -translate-y-1/2 right-8 glass-strong rounded-full p-4 shadow-glow"
      >
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground text-center">Now</div>
        <div className="font-display text-3xl font-bold text-center">78</div>
        <div className="text-[10px] text-center text-primary">Calm</div>
      </motion.div>
    </div>
  );
}
