import { useMemo, useState } from "react";
import { Step } from "./step";
import { Check } from "lucide-react";
import { AppointmentForm } from "./appointmentform";

const VEHICLES = [
  ["Normale auto (bijv. VW Golf, Audi A3)", 0],
  ["Middelgrote auto (bijv. Audi A4, A5)", 10],
  ["Grote auto (bijv. Audi A6, A7)", 20],
  ["SUV (bijv. Audi Q3, Q5)", 25],
  ["Pick-up (bijv. Dodge Ram)", 35],
  ["Bestelwagen (bijv. VW Caddy)", 30],
  ["Bestelbus (bijv. Mercedes Vito)", 40],
] as const;
const PLANS = [
  {
    name: "Basic Shine",
    description: "Een grondige opfrisbeurt voor een schoon en verzorgd auto-interieur.",
    // items:[...IN],
    price: 49,
    items: [
      "Stofzuigen van de auto",
      "Reinigen van het dashboard en de kunststof onderdelen",
      " Reinigen van de deurpanelen",
      "Verzorgde afwerking van het interieur",
    ],
    dur:60
  },
  {
    name: "Comfort Deep Cleaning",
    description: "Voor wie zijn auto grondig wil laten reinigen.",
    // items:[...IN],
    price: 129,
    items: [
      "Alles uit het Basic Shine-pakket",
      "Grondige reiniging van moeilijk bereikbare plaatsen",
      "Reinigen van matten en tapijten",
      "Aanpak van zichtbare vlekken",
      "Extra aandacht voor details",
      "Zorgvuldige afwerking met oog voor detail",
    ],
    dur:60
  },
  {
    name: "Premium Detailing",
    description: "De ultieme behandeling voor een fris, verzorgd en luxueus auto-interieur.",
    // items:[...IN],
    price: 99,
    items: [
      "Intensieve interieurreiniging",
      "Grondige reiniging van stoelen en tapijten, afhankelijk van het materiaal",
      "Reinigen van kunststof onderdelen en details",
      "Stoomreiniging waar geschikt",
      "Verwijderen van hardnekkig vuil en onaangename geuren, voor zover mogelijk",
    ],
    dur:60
  },
];
const EXTRAS = [
  { name: "Honden- en kattenharen verwijderen", price: 39.9, dur: 30 },
  { name: "Stoomreiniging", price: 24.9, dur: 20 },
  { name: "Hardnekkige vlekken behandelen", price: 49.9, dur: 40 },
  { name: "Hemelbekleding reinigen", price: 34.9, dur: 25 },
  { name: "Koplampen polijsten", price: 34.9, dur: 25 },
  { name: "Motorruimte reinigen", price: 34.9, dur: 25 },
  {
    name: "Exterieur reinigen zonder traditionele wasbeurt, afhankelijk van de vervuiling en geschiktheid van de lak",
    price: 34.9,
    dur: 25,
  },
];

const eur = (n: number) => `€${n.toFixed(2)}`;
const durTxt = (m: number) => `${Math.floor(m / 60)} uur ${m % 60 ? `${m % 60} min` : ""}`.trim();

export default function Booking() {
  const [veh, setVeh] = useState(0);
  const [plan, setPlan] = useState<number | null>(null);
  const [extras, setExtras] = useState<number[]>([]);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
      }),
    [],
  );
  const total =
    plan === null
      ? 0
      : PLANS[plan]!.price 
      // + VEHICLES[veh]![1] 
      // + extras.reduce((s, e) => s + EXTRAS[e]!.price, 0);
  
  const dur = plan === null ? 0 : PLANS[plan]!.dur + extras.reduce((s, e) => s + EXTRAS[e]!.dur, 0);

  const extraNames = extras.map((e) => EXTRAS[e]!.name);

  const chosenPlanDetails =
    plan === null
      ? null
      : [
          `${PLANS[plan]!.name} (${PLANS[plan]!.description})`,
          `Voertuig: ${VEHICLES[veh]![0]}`,
          extraNames.length ? `Extra's: ${extraNames.join(", ")}` : null,
        ]
          .filter(Boolean)
          .join(" | ");
  return (
    <section id="afspraak" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* <Step n="01" eyebrow="Bereken je prijs" title="Kies je auto">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {VEHICLES.map(([v], i) => (
              <button
                key={v}
                onClick={() => setVeh(i)}
                className={`flex flex-col items-center gap-3 rounded-lg border px-2 py-5 text-center font-semibold transition hover:-translate-y-1 hover:shadow-md ${veh === i ? "border-sky bg-sky text-navy-foreground" : "bg-card text-navy"}`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}cars/${i + 1}.png`}
                  alt={v}
                  loading="lazy"
                  className="h-14 object-contain"
                />
                <span className="text-[15px] leading-tight">
                  {i + 1}. {v}
                </span>
              </button>
            ))}
          </div>
        </Step> */}
        <Step n="01" eyebrow="Kies jouw behandeling" title="Kies je plan">
          <div className="grid gap-6 md:grid-cols-3">
            {PLANS.map((p, i) => (
              <div
                key={p.name}
                className={`reveal flex flex-col rounded-2xl bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ring-2 ${plan === i ? "ring-primary" : "ring-transparent"}`}
              >
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 font-display text-4xl font-bold text-accent">
                  {eur(p.price + VEHICLES[veh]![1])}
                </p>
                {/* <p className="text-sm text-muted-foreground">{durTxt(p.dur)}</p> */}
                <ul className="mt-4 flex-1 space-y-2 text-sm">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <Check size={16} className="shrink-0 text-go" />
                      {it}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPlan(i)}
                  className="mt-6 rounded-full bg-primary py-3 font-semibold text-primary-foreground"
                >
                  Kies nu
                </button>
              </div>
            ))}
          </div>
        </Step>
        <Step
          n="02"
          title="Kies extra opties (na keuze van pakket)"
          note="Verschijnt na keuze pakket"
        >
          {plan === null ? (
            <p className="text-muted-foreground">Kies eerst een pakket.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {EXTRAS.map((x, i) => (
                <label
                  key={x.name}
                  className="flex cursor-pointer items-center justify-between rounded-lg bg-card p-4"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={extras.includes(i)}
                      onChange={() =>
                        setExtras((s) => (s.includes(i) ? s.filter((e) => e !== i) : [...s, i]))
                      }
                    />
                    {x.name}
                  </span>
                  {/* <span className="font-semibold">+{eur(x.price)}</span> */}
                </label>
              ))}
            </div>
          )}
        </Step>
        <Step
          n="03"
          title="Staat uw gewenste datum "
          note="*Staat uw gewenste datum of tijd er niet bij? Neem gerust contact met ons op via de chat."
        >
          <div className="grid gap-8 md:grid-cols-1">
          
            <AppointmentForm 
            calculatedTotal={total} 
            chosenPlanDetails={chosenPlanDetails}
            duration={dur}
            />
          
          </div>
        </Step>
      </div>
    </section>
  );
}
