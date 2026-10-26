import {
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  MessageCircle,
  Trophy,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
  Heart,
} from "lucide-react";
import { useEffect, useState } from "react";
const TOP = [
  "🏆 Beste prijs/kwaliteit verhouding",
  "⭐ 164 reviews met 5.0 op Google",
  "🚐 Wij komen bij u aan huis",
  "🌱 Ecologisch poetsen",
];
export function TopBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TOP.length), 3500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center justify-between bg-navy px-4 py-2.5 text-sm text-navy-foreground">
      <button aria-label="Vorige" onClick={() => setI((i - 1 + TOP.length) % TOP.length)}>
        <ChevronLeft size={18} />
      </button>
      <span key={i} className="animate-fadeup">
        {TOP[i]}
      </span>
      <button aria-label="Volgende" onClick={() => setI((i + 1) % TOP.length)}>
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
