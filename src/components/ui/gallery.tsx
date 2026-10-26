import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

const galleryModules = import.meta.glob("@/assets/gallery/*.{jpeg,jpg,png}", {
  eager: true,
  query: "url",
  import: "default",
});

// 2. PARSE INTO ARRAY: Maps the compiled module object into a clean array of URL strings
const GALLERY = Object.values(galleryModules) as string[];
export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (d: number) => ref.current?.scrollBy({ left: d * 200, behavior: "smooth" });
  useEffect(() => {
    const t = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5)
        el.scrollTo({ left: 0, behavior: "smooth" });
      else move(1);
    }, 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative flex w-full items-center gap-2 min-w-0">
      <button aria-label="Vorige" onClick={() => move(-1)} className="shrink-0">
        <ChevronLeft />
      </button>
      {/* Added w-full and min-w-0 to allow proper CSS shrinking calculation */}
      <div ref={ref} className="flex w-full snap-x gap-3 overflow-x-auto scrollbar-none min-w-0">
        {GALLERY.map((srcUrl, i) => (
          <img
            key={`${srcUrl}-${i}`}
            src={srcUrl}
            alt={`Absolute Car Cleaning op locatie - Sfeerimpressie ${i + 1}`}
            loading="lazy"
            className="h-64 w-40 sm:h-72 sm:w-48 shrink-0 snap-start rounded-2xl object-cover transition-transform duration-500 hover:scale-105 shadow-sm"
          />
        ))}
      </div>
      <button aria-label="Volgende" onClick={() => move(1)} className="shrink-0">
        <ChevronRight />
      </button>
    </div>
  );
}
