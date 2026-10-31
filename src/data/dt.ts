export type PLAN = {
  name: string;
  description: string;
  price: number;
  items: string[];
  dur: number;
};
export const PLANS: PLAN[] = [
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
    dur: 60,
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
    dur: 60,
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
    dur: 60,
  },
];

export type EXTRA = {
  name: string;
  price: number;
  dur: number;
};
export const EXTRAS: EXTRA[] = [
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

type VEHICLE = [description: string, price: number];

export const VEHICLES: VEHICLE[] = [
  ["Normale auto (bijv. VW Golf, Audi A3)", 0],
  ["Middelgrote auto (bijv. Audi A4, A5)", 10],
  ["Grote auto (bijv. Audi A6, A7)", 20],
  ["SUV (bijv. Audi Q3, Q5)", 25],
  ["Pick-up (bijv. Dodge Ram)", 35],
  ["Bestelwagen (bijv. VW Caddy)", 30],
  ["Bestelbus (bijv. Mercedes Vito)", 40],
] as const;

const REVIEWS = [
  {
    n: "Wilmer",
    d: "10 oktober 2026",
    t: "Snelle en uiterst nauwkeurige Deep Clean van je auto. Aanrader!",
  },
  {
    n: "sabri nasri",
    d: "26 september 2026",
    t: "Mijn auto zag er na de poetsbeurt echt als nieuw uit. De lak glanst weer, de kleine krasjes zijn netjes aangepakt en het interieur is echt superfris gemaakt. Professioneel en vriendelijk.",
  },
  { n: "Mateusz", d: "19 september 2026", t: "Top quality top service" },
  {
    n: "Peter Stremler",
    d: "28 augustus 2026",
    t: "Wat een resultaat! Schoon op een geheel nieuw niveau. Echt tot in de kleinste details. Klasse!",
  },
];

export interface ORDER_DETAILS {
  clientDetails:CLIENT_DETAILS;
  calculatedTotal: number;
  chosenPlanDetails: string | null | undefined;
}
export interface CLIENT_DETAILS {
  name: string;
  email: string;
  phone: string;
}
