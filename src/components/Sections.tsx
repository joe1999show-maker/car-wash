import { useRef, useState } from "react";
import { ArrowRight, Check, MessageCircle, X } from "lucide-react";
import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";

const IMG = (f: string) => `https://absolutecarcleaning.nl/wp-content/uploads/2026/06/${f}`;

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const update = (x: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };
  return (
    <section className="bg-card py-12">
      <div className="reveal mx-auto max-w-5xl px-6 text-center">
        <h3 className="text-3xl font-bold">Van vervuild naar showroomstaat</h3>
        <p className="mt-2 text-muted-foreground">Swipe door echte <b>voor- en na</b> resultaten van onze mobiele <b>poetsservice</b>.</p>
        <div
          ref={ref}
          className="relative mt-10 aspect-[3/2] cursor-ew-resize select-none overflow-hidden rounded-2xl shadow-xl"
          onMouseMove={(e) => e.buttons === 1 && update(e.clientX)}
          onMouseDown={(e) => update(e.clientX)}
          onTouchMove={(e) => update(e.touches[0]!.clientX)}
        >
          <img src={after} alt="Na" loading="lazy" width={1200} height={800} className="absolute inset-0 h-full w-full object-cover" />
          <img src={before} alt="Voor" loading="lazy" width={1200} height={800} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
          <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-sm font-semibold text-navy-foreground">Voor</span>
          <span className="absolute right-4 top-4 rounded-full bg-go px-3 py-1 text-sm font-semibold text-go-foreground">Na</span>
          <div className="absolute inset-y-0 w-1 bg-card" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-card px-3 py-2 text-sm font-bold text-foreground shadow">⇆</span>
          </div>
        </div>
        <h2 className="mt-12 text-3xl font-bold">Wilt u dit resultaat ook?</h2>
        <a href="#afspraak" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105">Afspraak maken <ArrowRight size={18} /></a>
      </div>
    </section>
  );
}

export function BookingIntro() {
  return (
    <section className="bg-secondary pt-12">
      <div className="reveal mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-bold">Bereken direct uw prijs en boek uw afspraak online</h2>
        <p className="mt-4 text-muted-foreground"><b>Bereken</b> eenvoudig <b>uw prijs</b> en reserveer <b>direct</b> uw gewenste datum en tijd. Heeft u vragen of wilt u persoonlijk advies? Neem gerust contact met ons op.</p>
        <p className="mt-6 font-display text-xl font-semibold text-accent">Alle prijzen zijn inclusief voorrijkosten en 21% btw.</p>
        <p className="text-sm text-muted-foreground">U betaalt pas na uitvoering van de werkzaamheden.</p>
      </div>
    </section>
  );
}

const BRANDS = ["Koch-Chemie", "Gyeon", "CarPro", "Meguiar's", "Sonax", "Rupes"];
const OFFER = ["Buitenkant wassen", "Deurpanelen / Stoelen schoonmaken", "Grondige reiniging van dashboard", "Glanzende banden", "Motor wassen", "Stoelen reiniging", "Polijsten gehele auto", "Volledige auto poetsen", "Alle auto's wassen.", "Beste kwaliteit prijs verhouding"];

export function BrandsOffer() {
  return (
    <>
      <section className="overflow-hidden bg-card py-10">
        <h2 className="text-center text-3xl"><b>De beste kwaliteit</b>, de beste merken.</h2>
        <div className="mt-8 flex w-max animate-marquee gap-16">
          {[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="font-display text-3xl font-bold text-muted-foreground/60 transition-colors hover:text-accent">{b}</span>
          ))}
        </div>
      </section>
      <section className="bg-navy py-12 text-navy-foreground">
        <div className="reveal mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <img src={IMG("22.png")} alt="Autoreiniging op locatie" loading="lazy" className="h-[28rem] w-full rounded-3xl object-cover" />
          <div>
            <p className="text-primary">Wat wij aanbieden</p>
            <h2 className="mt-2 text-4xl font-semibold">Autoreiniging op locatie</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {OFFER.map((o) => (
                <li key={o} className="flex gap-2"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-go"><Check size={12} className="text-go-foreground" /></span>{o}</li>
              ))}
            </ul>
            <a href="#afspraak" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105">Afspraak boeken <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>
    </>
  );
}

const SERVICES = [
  { t: "Auto Detailing Diensten Nederland – Topprofessioneel", img: "16.png" },
  { t: "Auto Interieur Reinigen Nederland – Professioneel en Betaalbaar", img: "14.png" },
  { t: "Auto Stoom Reinigen Service in Rotterdam", img: "20.png" },
];

export function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-center text-primary">Ontdek</p>
      <h2 className="text-center text-4xl font-bold">Onze diensten</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {SERVICES.map((s) => (
          <a key={s.t} href="#" className="reveal group overflow-hidden rounded-2xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="overflow-hidden"><img src={IMG(s.img)} alt={s.t} loading="lazy" className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
            <div className="flex items-start justify-between gap-3 p-5">
              <h3 className="font-semibold">{s.t}</h3>
              <ArrowRight className="shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const TEXTS = [
  { h: "Voordelen auto poetsen op locatie", p: ["Heb je er ooit over nagedacht hoe handig het zou zijn om je auto te laten poetsen zonder dat je zelf naar een autopoetsbedrijf hoeft te gaan? Welkom bij de toekomst van autoverzorging! Met auto poetsen op locatie bespaar je tijd en moeite. Je hoeft niet langer te wachten in een ongemakkelijke wachtruimte. Sterker nog, je kunt gewoon doorgaan met je dag terwijl wij je auto professioneel laten poetsen, waar je ook bent in Rotterdam en omgeving.", "De kosten voor autopoetsen kunnen variëren, maar de tijd die je bespaart door deze service aan huis te hebben, is onbetaalbaar. En laten we eerlijk zijn, niets overtreft het gemak en de kwaliteit van een professionele autopoetser die je auto interieur en exterieur reinigt op locatie.", "Dus, voor de ultieme luxe en gemak, laat je auto poetsen aan huis of op locatie door Absolute Car Cleaning!"] },
  { h: "Professioneel auto laten reinigen door autopoetsbedrijf", p: ["Je hebt hard voor je auto gewerkt en die verdient het allerbeste. Laat je auto professioneel reinigen door ons autopoetsbedrijf Absolute Car Cleaning en ervaar het verschil. We gaan veel verder dan een gewone wasbeurt; we bieden een uitgebreide reiniging, zowel binnen als buiten. Van autopoetsen tot het reinigen van het interieur, wij zorgen ervoor dat je auto er weer als nieuw uitziet.", "Maak je geen zorgen over de auto laten poetsen kosten. Wij bieden concurrerende prijzen voor een service die elke cent waard is. Kies het prijsplan uit wat bij je past. Een professioneel gereinigde auto draagt niet alleen bij aan de esthetische waarde, maar helpt ook bij het behouden van de wederverkoopwaarde. Maak vandaag nog eenvoudig en snel een afspraak online."] },
  { h: "Waarom kiezen voor Absolute Car Cleaning", p: ["Als je in Rotterdam en omgeving woont of werkt en op zoek bent naar een autopoetsbedrijf dat staat voor kwaliteit en klanttevredenheid, dan ben je bij Absolute Car Cleaning aan het juiste adres. Maar waarom zou je specifiek voor ons kiezen?", "Ten eerste, wij bieden een breed scala aan diensten, van het reinigen van het interieur van je auto op locatie tot het professioneel poetsen van je auto. Ten tweede, wij zijn transparant over de kosten van het autopoetsen, zodat je altijd weet waar je aan toe bent. En tot slot, onze expertise in car cleaning zorgt ervoor dat je altijd met een glimlach de weg op gaat.", "Kies voor het gemak, kwaliteit en uitstekende klantenservice. Kies voor Absolute Car Cleaning voor autopoetsen op locatie."] },
];

export function InfoTexts() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-secondary py-12">
      <div className="mx-auto max-w-4xl space-y-4 px-6">
        {TEXTS.map((t, i) => (
          <div key={t.h} className="reveal rounded-2xl bg-card p-6 shadow-sm">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between text-left">
              <h2 className="text-2xl font-semibold">{t.h}</h2>
              <span className={`text-3xl text-primary transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`grid transition-all duration-500 ${open === i ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="space-y-3 overflow-hidden text-muted-foreground">{t.p.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const PARTNERS = ["Bol.com", "Mobiel Wassen", "Autobedrijf Rijnmond", "Lease Partner", "Garage Dordrecht", "Fleet Care"];

export function Partners() {
  return (
    <section className="overflow-hidden bg-card py-10">
      <p className="text-center text-primary">Onze opdrachtgevers</p>
      <h2 className="text-center text-3xl font-bold">Samenwerkingen waar wij trots op zijn</h2>
      <div className="mt-8 flex w-max animate-marquee gap-10 [animation-direction:reverse]">
        {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((p, i) => (
          <span key={i} className="rounded-xl border px-8 py-5 font-display text-lg font-semibold text-muted-foreground">{p}</span>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    ["Diensten", ["Auto detailing", "Interieur reinigen", "Stoom reinigen", "Keramische coating"]],
    ["Bedrijf", ["Over ons", "Referenties", "Blog", "Shop"]],
    ["Contact", ["Regio Rotterdam & Dordrecht", "Studio in Alblasserdam", "info@absolutecarcleaning.nl", "Ma–Za 08:00–17:00"]],
  ] as const;
  return (
    <footer className="bg-navy py-10 text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-4xl font-extrabold italic text-sky">ACC</p>
          <p className="mt-2 text-sm text-navy-foreground/70">Professioneel auto poetsen op locatie. Wij komen bij u aan huis.</p>
        </div>
        {cols.map(([h, items]) => (
          <div key={h}>
            <h4 className="font-display font-semibold">{h}</h4>
            <ul className="mt-3 space-y-2 text-sm text-navy-foreground/70">{items.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="mt-12 text-center text-xs text-navy-foreground/50">© {new Date().getFullYear()} Absolute Car Cleaning · Algemene voorwaarden · Privacy</p>
    </footer>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 animate-fadeup overflow-hidden rounded-2xl bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-go p-4 text-go-foreground">
            <div><p className="font-semibold">Absolute Car Cleaning</p><p className="text-xs opacity-90">Wij reageren binnen een paar uur</p></div>
            <button aria-label="Sluiten" onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="bg-secondary p-4">
            <p className="rounded-xl rounded-tl-none bg-card p-3 text-sm shadow-sm">Hi 👋 Waarmee kunnen wij u helpen? Plan direct uw afspraak of stel uw vraag.</p>
          </div>
          <a href="#afspraak" onClick={() => setOpen(false)} className="m-4 flex items-center justify-center gap-2 rounded-full bg-go py-3 font-semibold text-go-foreground"><MessageCircle size={18} /> Start chat</a>
        </div>
      )}
      <button aria-label="WhatsApp" onClick={() => setOpen(!open)} className="relative grid size-16 place-items-center rounded-full bg-go text-go-foreground shadow-lg transition-transform hover:scale-110">
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-go opacity-30" />}
        {!open && <span className="absolute right-1 top-1 size-3 rounded-full bg-destructive" />}
        {open ? <X size={28} /> : <MessageCircle size={30} />}
      </button>
    </div>
  );
}
