export type City = {
  id: string;
  name: string;
  jp?: string;
  center: [number, number];
  zoom: number;
  calmIndex: number;
  vibe: string;
};

export const cities: City[] = [
  { id: "tokyo", name: "Tokyo", jp: "東京", center: [35.6762, 139.6503], zoom: 12, calmIndex: 78, vibe: "Neon stillness" },
  { id: "kyoto", name: "Kyoto", jp: "京都", center: [35.0116, 135.7681], zoom: 13, calmIndex: 91, vibe: "Temple quiet" },
  { id: "osaka", name: "Osaka", jp: "大阪", center: [34.6937, 135.5023], zoom: 12, calmIndex: 71, vibe: "Warm bustle" },
  { id: "singapore", name: "Singapore", jp: "新加坡", center: [1.3521, 103.8198], zoom: 12, calmIndex: 82, vibe: "Garden city" },
  { id: "seoul", name: "Seoul", jp: "서울", center: [37.5665, 126.978], zoom: 12, calmIndex: 74, vibe: "Mountain river" },
  { id: "london", name: "London", jp: "ロンドン", center: [51.5074, -0.1278], zoom: 12, calmIndex: 69, vibe: "Park hush" },
  { id: "newyork", name: "New York", jp: "ニューヨーク", center: [40.7128, -74.006], zoom: 12, calmIndex: 64, vibe: "Steel pulse" },
];

export type CalmPlace = {
  id: string;
  name: string;
  type: "Café" | "Park" | "Library" | "Co-work" | "Meditation" | "Restaurant";
  pos: [number, number];
  crowd: number; // 0-100
  noise: number;
  ambience: number;
  city: string;
  hours: string;
  wifi: "Fast" | "OK" | "None";
  seats: "Open" | "Limited" | "Full";
  tags: string[];
};

export const places: CalmPlace[] = [
  { id: "p1", name: "Blue Bottle Aoyama", type: "Café", pos: [35.6663, 139.7126], crowd: 32, noise: 28, ambience: 92, city: "tokyo", hours: "8:00 – 19:00", wifi: "Fast", seats: "Open", tags: ["Remote-work", "Quiet"] },
  { id: "p2", name: "Yoyogi Park West", type: "Park", pos: [35.6716, 139.6949], crowd: 18, noise: 14, ambience: 96, city: "tokyo", hours: "Open 24h", wifi: "None", seats: "Open", tags: ["Nature", "Calm"] },
  { id: "p3", name: "Daikanyama T-Site", type: "Library", pos: [35.6494, 139.7028], crowd: 41, noise: 22, ambience: 88, city: "tokyo", hours: "7:00 – 22:00", wifi: "Fast", seats: "Limited", tags: ["Reading", "Soft light"] },
  { id: "p4", name: "Shimokitazawa Hideaway", type: "Café", pos: [35.6613, 139.6680], crowd: 24, noise: 30, ambience: 90, city: "tokyo", hours: "10:00 – 20:00", wifi: "OK", seats: "Open", tags: ["Indie", "Vinyl"] },
  { id: "p5", name: "Roppongi Quiet Room", type: "Meditation", pos: [35.6627, 139.7314], crowd: 8, noise: 6, ambience: 99, city: "tokyo", hours: "6:00 – 22:00", wifi: "Fast", seats: "Open", tags: ["Silent", "Sensory"] },
  { id: "p6", name: "Nakameguro Walk", type: "Park", pos: [35.6442, 139.6993], crowd: 36, noise: 24, ambience: 86, city: "tokyo", hours: "Open 24h", wifi: "None", seats: "Open", tags: ["Riverside"] },
  { id: "p7", name: "Ebisu Worklounge", type: "Co-work", pos: [35.6467, 139.7100], crowd: 55, noise: 38, ambience: 81, city: "tokyo", hours: "24h", wifi: "Fast", seats: "Limited", tags: ["Phone-booths"] },
  { id: "p8", name: "Kiyosumi Garden Tea", type: "Restaurant", pos: [35.6800, 139.7960], crowd: 28, noise: 20, ambience: 93, city: "tokyo", hours: "11:00 – 21:00", wifi: "OK", seats: "Open", tags: ["Matcha", "Garden"] },
];

export type TransitLine = {
  id: string;
  name: string;
  color: string;
  comfort: number;
  crowd: number;
  delay: number; // minutes
  stations: string[];
};

export const transit: TransitLine[] = [
  { id: "yamanote", name: "Yamanote Line", color: "#A7DADC", comfort: 64, crowd: 78, delay: 0, stations: ["Shibuya", "Harajuku", "Shinjuku", "Ikebukuro", "Ueno", "Tokyo", "Shinagawa"] },
  { id: "ginza", name: "Ginza Line", color: "#E63746", comfort: 58, crowd: 82, delay: 2, stations: ["Asakusa", "Ueno", "Ginza", "Shimbashi", "Shibuya"] },
  { id: "marunouchi", name: "Marunouchi Line", color: "#447A9C", comfort: 71, crowd: 64, delay: 0, stations: ["Ogikubo", "Shinjuku", "Tokyo", "Ginza", "Ikebukuro"] },
  { id: "hibiya", name: "Hibiya Line", color: "#1D3658", comfort: 81, crowd: 42, delay: 0, stations: ["Naka-Meguro", "Ebisu", "Roppongi", "Ginza", "Akihabara"] },
  { id: "chiyoda", name: "Chiyoda Line", color: "#7BB6A4", comfort: 88, crowd: 31, delay: 0, stations: ["Yoyogi-Uehara", "Omotesando", "Otemachi", "Nishi-Nippori"] },
];

export const calmTrend = [
  { day: "Mon", calm: 62, noise: 48, crowd: 70 },
  { day: "Tue", calm: 66, noise: 44, crowd: 64 },
  { day: "Wed", calm: 58, noise: 52, crowd: 76 },
  { day: "Thu", calm: 71, noise: 38, crowd: 58 },
  { day: "Fri", calm: 54, noise: 60, crowd: 82 },
  { day: "Sat", calm: 78, noise: 32, crowd: 46 },
  { day: "Sun", calm: 84, noise: 28, crowd: 38 },
];

export const hourlyCalm = Array.from({ length: 24 }, (_, h) => ({
  h: `${h}:00`,
  calm: Math.round(50 + 30 * Math.sin((h - 4) / 24 * Math.PI * 2) + (h < 6 || h > 22 ? 15 : 0)),
}));
