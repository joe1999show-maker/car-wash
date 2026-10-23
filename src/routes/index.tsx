import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Star, ArrowRight, MessageCircle, Trophy, Leaf, ShieldCheck, Sparkles, Truck, Heart } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { BeforeAfter, BookingIntro, BrandsOffer, ChatWidget, Footer, InfoTexts, Partners, Services } from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Absolute Car Cleaning — Professioneel auto poetsen op locatie" },
      { name: "description", content: "Mobiele autoreiniging bij u aan huis of op kantoor. 5.0 op Google, inclusief voorrijkosten. Boek direct online." },
      { property: "og:title", content: "Absolute Car Cleaning — Auto poetsen op locatie" },
      { property: "og:description", content: "Mobiele autoreiniging bij u aan huis. Boek direct online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = ["Home", "Onze diensten", "Keramische coating", "Referenties", "Over ons", "Contact", "Blog", "Shop"];
const USP = [
  { icon: Trophy, t: "Beste prijs/kwaliteit verhouding" },
  { icon: ShieldCheck, t: "Goede service & betrouwbaar" },
  { icon: Leaf, t: "Ecologisch" },
  { icon: Heart, t: "Met passie en precisie poetsen" },
  { icon: Truck, t: "Geen voorrijkosten" },
  { icon: Sparkles, t: "100% tevredenheidsgarantie" },
];
const GALLERY = ["14.png", "Ontwerp-zonder-titel-15.png", "22.png", "16.png", "20.png"].map(
  (f) => `https://absolutecarcleaning.nl/wp-content/uploads/2026/06/${f}`,
);
const REVIEWS = [
  { n: "Wilmer", d: "10 oktober 2026", t: "Snelle en uiterst nauwkeurige Deep Clean van je auto. Aanrader!" },
  { n: "sabri nasri", d: "26 september 2026", t: "Mijn auto zag er na de poetsbeurt echt als nieuw uit. De lak glanst weer, de kleine krasjes zijn netjes aangepakt en het interieur is echt superfris gemaakt. Professioneel en vriendelijk." },
  { n: "Mateusz", d: "19 september 2026", t: "Top quality top service" },
  { n: "Peter Stremler", d: "28 augustus 2026", t: "Wat een resultaat! Schoon op een geheel nieuw niveau. Echt tot in de kleinste details. Klasse!" },
];
const VEHICLES = [
  ["Normale auto (bijv. VW Golf, Audi A3)", 0],
  ["Middelgrote auto (bijv. Audi A4, A5)", 10],
  ["Grote auto (bijv. Audi A6, A7)", 20],
  ["SUV (bijv. Audi Q3, Q5)", 25],
  ["Pick-up (bijv. Dodge Ram)", 35],
  ["Bestelwagen (bijv. VW Caddy)", 30],
  ["Bestelbus (bijv. Mercedes Vito)", 40],
] as const;
const IN = ["Stofzuigen", "Matten reinigen", "Ramen binnenkant reinigen", "Kunststof (dashboard e.d.) verzorgen", "Ventilatie reinigen"];
const OUT = ["Buitenkant wassen met premium shampoo", "Kunststof (bumpers e.d.) verzorgen", "Ramen buitenkant reinigen", "Deurstijlen / dorpels reinigen", "Velgen reinigen", "Banden poetsen / behandelen", "Spray wax aanbrengen"];
const PLANS = [
  { name: "Alleen de binnenkant", price: 94.9, dur: 60, items: ["Voorrijkosten", ...IN, "Kofferruimte reinigen"] },
  { name: "Alleen buitenkant", price: 104.9, dur: 65, items: ["Voorrijkosten", ...OUT] },
  { name: "Buiten- en binnenkant", price: 189.9, dur: 130, items: ["Voorrijkosten", ...IN, ...OUT] },
];
const EXTRAS = [
  { name: "Stoelen shampooën", price: 39.9, dur: 30 },
  { name: "Hondenharen verwijderen", price: 24.9, dur: 20 },
  { name: "Lak decontaminatie (klei)", price: 49.9, dur: 40 },
  { name: "Leder reinigen & voeden", price: 34.9, dur: 25 },
];
const eur = (n: number) => `€${n.toFixed(2)}`;
const durTxt = (m: number) => `${Math.floor(m / 60)} uur ${m % 60 ? `${m % 60} min` : ""}`.trim();

function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-star text-star" />
      ))}
    </span>
  );
}

const TOP = ["🏆 Beste prijs/kwaliteit verhouding", "⭐ 164 reviews met 5.0 op Google", "🚐 Wij komen bij u aan huis", "🌱 Ecologisch poetsen"];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function TopBar() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % TOP.length), 3500); return () => clearInterval(t); }, []);
  return (
    <div className="flex items-center justify-between bg-navy px-4 py-2.5 text-sm text-navy-foreground">
      <button aria-label="Vorige" onClick={() => setI((i - 1 + TOP.length) % TOP.length)}><ChevronLeft size={18} /></button>
      <span key={i} className="animate-fadeup">{TOP[i]}</span>
      <button aria-label="Volgende" onClick={() => setI((i + 1) % TOP.length)}><ChevronRight size={18} /></button>
    </div>
  );
}

function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (d: number) => ref.current?.scrollBy({ left: d * 200, behavior: "smooth" });
  useEffect(() => {
    const t = setInterval(() => {
      const el = ref.current; if (!el) return;
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 5) el.scrollTo({ left: 0, behavior: "smooth" }); else move(1);
    }, 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative flex items-center gap-2">
      <button aria-label="Vorige" onClick={() => move(-1)}><ChevronLeft /></button>
      <div ref={ref} className="flex snap-x gap-3 overflow-hidden">
        {GALLERY.map((g) => (
          <img key={g} src={g} alt="Absolute Car Cleaning op locatie" loading="lazy" className="h-72 w-48 shrink-0 snap-start rounded-2xl object-cover transition-transform duration-500 hover:scale-105" />
        ))}
      </div>
      <button aria-label="Volgende" onClick={() => move(1)}><ChevronRight /></button>
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div className="min-h-screen">
      <TopBar />
      <header className="sticky top-0 z-40 flex items-center bg-card shadow-sm">
        <div className="flex h-24 w-48 flex-col items-center justify-center bg-accent text-accent-foreground [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
          <span className="font-display text-4xl font-extrabold italic leading-none">ACC</span>
          <span className="text-[9px] font-bold tracking-widest">ABSOLUTE CAR CLEANING</span>
        </div>
        <nav className="hidden flex-1 gap-8 px-6 lg:flex">
          {NAV.map((n) => (
            <a key={n} href="#" className="group relative text-[15px] hover:text-primary">{n}<span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" /></a>
          ))}
        </nav>
        <a href="#reviews" className="group ml-auto mr-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
          Referenties <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </header>

      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img src={hero} alt="Interieur stoomreiniging" width={1920} height={1088} className="absolute inset-0 h-full w-full scale-110 animate-[fadeup_2s_ease-out] object-cover opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-12">
          <h1 className="animate-fadeup text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
            Professioneel auto{" "}
            <span className="relative inline-block text-sky">
              poetsen
              <svg viewBox="0 0 300 30" preserveAspectRatio="none" className="absolute -bottom-4 left-0 h-6 w-full text-go" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
                <path className="animate-draw" d="M3 12 C 80 4, 200 4, 297 10" />
                <path className="animate-draw [animation-delay:0.9s]" d="M40 24 C 120 15, 200 16, 260 20" />
              </svg>
            </span>{" "}
            op locatie.
          </h1>
          <ul className="mt-20 space-y-4 text-2xl md:ml-72 md:text-4xl">
            {["140+ 5-sterren reviews", "Wij komen bij u aan huis", "Inclusief voorrijkosten"].map((t, i) => (
              <li key={t} className="flex animate-fadeup items-center gap-4" style={{ animationDelay: `${0.8 + i * 0.25}s` }}>
                <span className="grid size-6 animate-popin place-items-center rounded-full bg-go" style={{ animationDelay: `${1 + i * 0.25}s` }}><Check size={14} className="text-go-foreground" /></span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-14 flex animate-fadeup flex-col items-center gap-6 [animation-delay:1.8s]">
            <div className="flex items-center gap-2 font-semibold"><span className="font-display font-bold">G</span> 5.0 <Stars /> 164 recensies</div>
            <a href="#afspraak" className="group inline-flex items-center gap-3 rounded-full bg-go py-1.5 pl-5 pr-1.5 text-lg font-bold text-go-foreground transition-transform hover:scale-105">
              Afspraak maken <span className="grid size-10 place-items-center rounded-full bg-navy transition-transform group-hover:rotate-[-45deg]"><ArrowRight size={20} className="text-navy-foreground" /></span>
            </a>
            <a href="#over" aria-label="Scroll" className="mt-4 flex h-12 w-7 justify-center rounded-full border-2 border-navy-foreground pt-2">
              <span className="size-1.5 animate-scrolldot rounded-full bg-navy-foreground" />
            </a>
          </div>
        </div>
      </section>

      <section id="over" className="bg-navy py-12 text-navy-foreground">
        <div className="reveal mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="flex items-center gap-3 text-primary">Grondig auto laten reinigen <span className="h-px w-14 bg-primary" /></p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">Geniet van het gemak van een auto die op locatie wordt gepoetst.</h2>
            <p className="mt-5 text-navy-foreground/80">Onze mobiele autoreinigingsdienst komt naar jouw huis, kantoor of waar dan ook je ervoor kiest om jouw auto te reinigen op het moment dat het jou het beste uitkomt.</p>
          </div>
          <Gallery />
        </div>
      </section>

      <section className="overflow-hidden border-y bg-card py-6">
        <div className="flex w-max animate-marquee gap-16">
          {[...USP, ...USP].map((u, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap font-display text-xl font-semibold"><u.icon className="text-accent" /> {u.t}</span>
          ))}
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
          <p className="font-display text-2xl font-bold">UITSTEKEND</p>
          <Stars size={24} />
          <p className="mt-1 text-muted-foreground">Gebaseerd op <b>164 recensies</b> op Google</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <div key={r.n} className="reveal rounded-xl bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-accent font-bold text-accent-foreground">{r.n[0]!.toUpperCase()}</span>
                <div><p className="font-semibold">{r.n}</p><p className="text-xs text-muted-foreground">{r.d}</p></div>
              </div>
              <div className="mt-3"><Stars size={14} /></div>
              <p className="mt-2 text-sm">{r.t}</p>
            </div>
          ))}
        </div>
      </section>

      <BeforeAfter />
      <BookingIntro />
      <Booking />
      <BrandsOffer />
      <Services />
      <InfoTexts />
      <Partners />
      <Footer />
      <ChatWidget />
    </div>
  );
}

function Step({ n, title, note, eyebrow, children }: { n: string; title: string; note?: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="border-b py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-3 text-sky">{eyebrow ?? note}<span className="h-px w-14 bg-sky" /></p>
          <h2 className="mt-1 text-4xl font-semibold text-navy">{title}</h2>
          {eyebrow && note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}
        </div>
        <span className="grid size-20 shrink-0 place-items-center rounded-full bg-navy font-display text-xl font-bold text-navy-foreground">{n}</span>
      </div>
      {children}
    </div>
  );
}

function Booking() {
  const [veh, setVeh] = useState(0);
  const [plan, setPlan] = useState<number | null>(null);
  const [extras, setExtras] = useState<number[]>([]);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d; }), []);
  const total = plan === null ? 0 : PLANS[plan]!.price + VEHICLES[veh]![1] + extras.reduce((s, e) => s + EXTRAS[e]!.price, 0);
  const dur = plan === null ? 0 : PLANS[plan]!.dur + extras.reduce((s, e) => s + EXTRAS[e]!.dur, 0);

  return (
    <section id="afspraak" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Step n="01" eyebrow="Bereken je prijs" title="Kies je auto">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {VEHICLES.map(([v], i) => (
              <button
                key={v}
                onClick={() => setVeh(i)}
                className={`flex flex-col items-center gap-3 rounded-lg border px-2 py-5 text-center font-semibold transition hover:-translate-y-1 hover:shadow-md ${veh === i ? "border-sky bg-sky text-navy-foreground" : "bg-card text-navy"}`}
              >
                <img src={`/cars/${i + 1}.png`} alt={v} loading="lazy" className="h-14 object-contain" />
                <span className="text-[15px] leading-tight">{i + 1}. {v}</span>
              </button>
            ))}
          </div>
        </Step>
        <Step n="02" eyebrow="Kies je pakket" title="Kies je plan">
          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((p, i) => (
              <div key={p.name} className={`reveal flex flex-col rounded-2xl bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ring-2 ${plan === i ? "ring-primary" : "ring-transparent"}`}>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 font-display text-4xl font-bold text-accent">{eur(p.price + VEHICLES[veh]![1])}</p>
                <p className="text-sm text-muted-foreground">{durTxt(p.dur)}</p>
                <ul className="mt-4 flex-1 space-y-2 text-sm">
                  {p.items.map((it) => <li key={it} className="flex gap-2"><Check size={16} className="shrink-0 text-go" />{it}</li>)}
                </ul>
                <button onClick={() => setPlan(i)} className="mt-6 rounded-full bg-primary py-3 font-semibold text-primary-foreground">Kies nu</button>
              </div>
            ))}
          </div>
        </Step>
        <Step n="03" title="Kies extra opties (na keuze van pakket)" note="Verschijnt na keuze pakket">
          {plan === null ? <p className="text-muted-foreground">Kies eerst een pakket.</p> : (
            <div className="grid gap-3 sm:grid-cols-2">
              {EXTRAS.map((x, i) => (
                <label key={x.name} className="flex cursor-pointer items-center justify-between rounded-lg bg-card p-4">
                  <span className="flex items-center gap-3"><input type="checkbox" checked={extras.includes(i)} onChange={() => setExtras((s) => s.includes(i) ? s.filter((e) => e !== i) : [...s, i])} />{x.name}</span>
                  <span className="font-semibold">+{eur(x.price)}</span>
                </label>
              ))}
            </div>
          )}
        </Step>
        <Step n="04" title="Wanneer komt het u het beste uit voor onze komst?" note="Let op: dit is een voorkeursmoment. De definitieve afspraak wordt bevestigd na overleg.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {days.map((d, i) => {
              const full = i < 2;
              const label = d.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "short" });
              return (
                <div key={i} className="rounded-lg bg-card p-3 text-center">
                  <p className="text-sm font-semibold capitalize">{label}</p>
                  {full ? <p className="mt-3 text-sm text-destructive">Vol geboekt</p> : ["08:00-12:00", "12:00-17:00"].map((t) => {
                    const k = `${label} ${t}`;
                    return <button key={t} onClick={() => setSlot(k)} className={`mt-2 w-full rounded-md border px-1 py-2 text-xs ${slot === k ? "border-primary bg-primary text-primary-foreground" : ""}`}>Tussen {t}</button>;
                  })}
                </div>
              );
            })}
          </div>
        </Step>
        <Step n="05" title="Afronden" note="*Staat uw gewenste datum of tijd er niet bij? Neem gerust contact met ons op via de chat.">
          <div className="grid gap-8 md:grid-cols-2">
            <dl className="space-y-3 rounded-2xl bg-card p-6">
              {[
                ["Voertuigtype", VEHICLES[veh]![0]],
                ["Gekozen pakket", plan === null ? "Geen pakket geselecteerd" : PLANS[plan]!.name],
                ["Extra opties", extras.length ? extras.map((e) => EXTRAS[e]!.name).join(", ") : "Geen extra opties geselecteerd"],
                ["Boekingsdatum", slot ?? "Geen datum geselecteerd"],
                ["Boekingsduur", `${dur} minuten`],
              ].map(([k, v]) => <div key={k}><dt className="text-sm font-semibold">{k}</dt><dd className="text-muted-foreground">{v}</dd></div>)}
              <div className="border-t pt-3"><dt className="text-sm font-semibold">Totaalbedrag incl. BTW</dt><dd className="font-display text-3xl font-bold text-accent">{eur(total)}</dd></div>
            </dl>
            <div className="space-y-4">
              <button disabled={plan === null || !slot} onClick={() => setDone(true)} className="w-full rounded-full bg-go py-4 text-lg font-bold text-go-foreground disabled:opacity-50">Bevestig boeking</button>
              {done && <p className="rounded-lg bg-card p-4 font-semibold text-go">Bedankt! Wij bevestigen uw poetsbeurt zo snel mogelijk.</p>}
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>* Prijs is incl. voorrijkosten en 21% BTW. U betaalt pas als wij klaar zijn.</li>
                <li>Het gekozen pakket kan, mits gewenst, ter plaatse worden gewijzigd.</li>
                <li>Op al onze werkzaamheden zijn onze algemene voorwaarden van toepassing.</li>
                <li>Uw gegevens worden niet gedeeld.</li>
              </ul>
            </div>
          </div>
        </Step>
      </div>
    </section>
  );
}
