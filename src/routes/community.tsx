import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle, Chip } from "@/components/nagi-ui";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Bookmark, Plus } from "lucide-react";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Community — Nagi" }, { name: "description", content: "Hidden quiet spots, shared by people who care about calm." }] }),
  component: CommunityPage,
});

const posts = [
  { user: "Aiko · 東京", title: "A 6 AM walk through Yanaka Cemetery", body: "Soft footsteps, cicadas, no tourists. The light through the cherry trees feels sacred.", calm: 96, likes: 248, tags: ["Tokyo", "Walk", "Dawn"], color: "#A7DADC" },
  { user: "Minh · Singapore", title: "Hidden bench above MacRitchie", body: "Twenty minutes off the trail. You'll hear hornbills and your own breathing.", calm: 92, likes: 189, tags: ["Singapore", "Nature"], color: "#7BB6A4" },
  { user: "Sora · Seoul", title: "Late-night soba in a side alley", body: "Tiny counter, four seats, the chef hums. Calmest meal in Jongno.", calm: 88, likes: 312, tags: ["Seoul", "Food", "Night"], color: "#E63746" },
  { user: "Lena · London", title: "Reading room at the Wellcome", body: "Plush chairs, golden walls, hush like a library should be.", calm: 94, likes: 156, tags: ["London", "Library"], color: "#447A9C" },
  { user: "Hiro · 京都", title: "Stone path to Honen-in temple", body: "Few people know to take the second turn. Moss and silence.", calm: 99, likes: 421, tags: ["Kyoto", "Temple"], color: "#1D3658" },
  { user: "Mei · Osaka", title: "Sunset rooftop in Nakanoshima", body: "Skyline turns rose, river goes quiet. No music, just wind.", calm: 90, likes: 203, tags: ["Osaka", "Rooftop"], color: "#E29A3F" },
];

function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <SectionTitle eyebrow="Community" jp="共に静けさを" title="Quiet, shared." />
        <button className="px-4 py-2 rounded-full gradient-red text-primary-foreground shadow-red text-sm font-medium flex items-center gap-1.5 hover:scale-105 transition">
          <Plus className="w-4 h-4" /> Share a calm spot
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["Trending", "Near me", "Cafés", "Walks", "Hidden", "Late night"].map((t, i) => (
          <Chip key={t} active={i === 0}>{t}</Chip>
        ))}
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl glass-strong shadow-soft overflow-hidden"
          >
            <div className="relative h-32" style={{ background: `linear-gradient(135deg, ${p.color}55, #F2FAEF22)` }}>
              <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
                <path d="M0 70 Q 50 40 100 60 T 200 50 V 100 H 0 Z" fill={p.color} opacity="0.5" />
                <path d="M0 80 Q 60 60 120 75 T 200 70 V 100 H 0 Z" fill="#1D3658" opacity="0.5" />
              </svg>
              <div className="absolute top-3 left-3 px-2 py-1 rounded-full glass-strong text-[10px]">Calm {p.calm}</div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: p.color + "55" }}>
                  {p.user[0]}
                </div>
                <div className="text-xs text-muted-foreground">{p.user}</div>
              </div>
              <div className="font-display font-semibold mt-3">{p.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{p.body}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/40">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-primary"><Heart className="w-3.5 h-3.5" /> {p.likes}</button>
                <button className="flex items-center gap-1 hover:text-foreground"><MessageCircle className="w-3.5 h-3.5" /> 24</button>
                <button className="flex items-center gap-1 hover:text-foreground ml-auto"><Bookmark className="w-3.5 h-3.5" /> Save</button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
