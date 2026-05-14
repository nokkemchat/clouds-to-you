export interface FlavorTheme {
  bgGradient: string;
  vaporColor: string;
  notes: string[];
}

const defaultThemes: Record<string, FlavorTheme> = {
  "Mango Ice": {
    bgGradient: "from-orange-500/20 via-yellow-500/10 to-transparent",
    vaporColor: "bg-orange-400",
    notes: ["🥭", "❄️", "Sweet", "Icy", "Tropical"],
  },
  "Blueberry Mint": {
    bgGradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    vaporColor: "bg-blue-400",
    notes: ["🫐", "🍃", "Cool", "Berry", "Fresh"],
  },
  "Grape": {
    bgGradient: "from-purple-600/20 via-fuchsia-600/10 to-transparent",
    vaporColor: "bg-purple-500",
    notes: ["🍇", "Juicy", "Rich", "Bold"],
  },
  "Watermelon Ice": {
    bgGradient: "from-red-500/20 via-pink-500/10 to-transparent",
    vaporColor: "bg-red-400",
    notes: ["🍉", "❄️", "Crisp", "Refreshing"],
  },
  "Strawberry Kiwi": {
    bgGradient: "from-rose-500/20 via-green-500/10 to-transparent",
    vaporColor: "bg-rose-400",
    notes: ["🍓", "🥝", "Tangy", "Sweet"],
  },
  "Peach Ice": {
    bgGradient: "from-orange-400/20 via-peach-400/10 to-transparent",
    vaporColor: "bg-orange-300",
    notes: ["🍑", "❄️", "Smooth", "Cool"],
  },
};

const colors = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"
];

const emojis = ["✨", "💨", "🌿", "💧", "⚡", "🌟"];

export function getFlavorTheme(flavorName: string): FlavorTheme {
  // Check exact match
  if (defaultThemes[flavorName]) {
    return defaultThemes[flavorName];
  }

  // Check partial match
  const lowerName = flavorName.toLowerCase();
  const match = Object.keys(defaultThemes).find(k => lowerName.includes(k.toLowerCase()));
  if (match) {
    return defaultThemes[match];
  }

  // Generate deterministic fallback based on string
  let hash = 0;
  for (let i = 0; i < flavorName.length; i++) {
    hash = flavorName.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colorIdx1 = Math.abs(hash) % colors.length;
  const colorIdx2 = (Math.abs(hash) >> 2) % colors.length;
  const emojiIdx = Math.abs(hash) % emojis.length;

  const color1 = colors[colorIdx1];
  const color2 = colors[colorIdx2];

  return {
    bgGradient: `from-${color1}-500/20 via-${color2}-500/10 to-transparent`,
    vaporColor: `bg-${color1}-400`,
    notes: [emojis[emojiIdx], "Premium", "Smooth", "Rich"],
  };
}
