import { ArrowRight, Trophy, Leaf, ShieldCheck, Sparkles, Truck, Heart, Star } from "lucide-react";
import {
  BeforeAfter,
  BookingIntro,
  ChatWidget,
  Footer,
  InfoTexts,
  Partners,
  Services,
  Contact
} from "@/components/Sections";
import Booking from "./booking";
import KCleanAnimatedBanner from "./banner";
import { TopBar } from "./topbar";
import hero from "@/assets/hero.jpg";
import { Gallery } from "./gallery";
import { useEffect, useState } from "react";
import NavBarHeader from "./navbarheader";

const USP = [
  { icon: Trophy, t: "Beste prijs/kwaliteit verhouding" },
  { icon: ShieldCheck, t: "Goede service & betrouwbaar" },
  { icon: Leaf, t: "Ecologisch" },
  { icon: Heart, t: "Met passie en precisie poetsen" },
  { icon: Truck, t: "Geen voorrijkosten" },
  { icon: Sparkles, t: "100% tevredenheidsgarantie" },
];

interface ORDER_DETAILS {
  client_details:{
    name:string;
    email: string;
    phone: string;
  };
  calculated_total: number;
  chosen_Plan: string |null |undefined;
}
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

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-star text-star" />
      ))}
    </span>
  );
}

export function Container() {
  useReveal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [order,setOrder]=useState<ORDER_DETAILS>();
  return (
    <div className="min-h-screen w-screen">
      <TopBar />
      <NavBarHeader />

      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <img
          src={hero}
          alt="Interieur stoomreiniging"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full scale-110 animate-[fadeup_2s_ease-out] object-cover opacity-60"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-12">
          <h1 className="animate-fadeup text-5xl font-bold leading-tight md:text-7xl lg:text-8xl">
            Geef jouw auto de luxe behandeling die hij verdient!
          </h1>
          <div className="mt-14 flex animate-fadeup flex-col items-center gap-6 [animation-delay:1.8s]">
            {/* <div className="flex items-center gap-2 font-semibold">
              <span className="font-display font-bold">G</span> 5.0 <Stars /> 164 recensies
            </div> */}
            <a
              href="#afspraak"
              className="group inline-flex items-center gap-3 rounded-full bg-go py-1.5 pl-5 pr-1.5 text-lg font-bold text-go-foreground transition-transform hover:scale-105"
            >
              Afspraak maken{" "}
              <span className="grid size-10 place-items-center rounded-full bg-navy transition-transform group-hover:rotate-[-45deg]">
                <ArrowRight size={20} className="text-navy-foreground" />
              </span>
            </a>
            <a
              href="#over"
              aria-label="Scroll"
              className="mt-4 flex h-12 w-7 justify-center rounded-full border-2 border-navy-foreground pt-2"
            >
              <span className="size-1.5 animate-scrolldot rounded-full bg-navy-foreground" />
            </a>
          </div>
        </div>
      </section>

      <section id="over" className="w-full bg-navy py-12 text-navy-foreground overflow-hidden">
        <div className="reveal mx-auto grid max-w-6xl items-center gap-12 px-6 grid-cols-1 md:grid-cols-2">
          <div className="w-full min-w-0">
            {" "}
            {/* min-w-0 prevents text elements from expanding the grid column */}
            <p className="flex items-center gap-3 text-primary">
              Een schoon interieur, een frisse geur en een auto die er weer als nieuw uitziet. Dat
              is de kwaliteit van KClean Detailing. <span className="h-px w-14 bg-primary" />
            </p>
            <p className="mt-5 text-md font-semibold leading-tight sm:text-md">
              Bij KClean Detailing zorgen we ervoor dat jouw auto opnieuw straalt, van binnen en
              indien gewenst ook van buiten. Wij zijn gespecialiseerd in professionele
              interieurreiniging, dieptereiniging en het verwijderen van hardnekkig vuil, vlekken en
              dierenharen.
            </p>
            <p className="mt-5 text-base text-navy-foreground">
              Wij komen naar jou toe in Beveren, Antwerpen, Sint-Niklaas en omgeving. Zo geniet je
              van een perfect gereinigde auto zonder dat je zelf tijd hoeft te verliezen.
            </p>
            <p className="mt-5 text-base text-navy-foreground">
              Jouw auto verdient meer dan een gewone schoonmaakbeurt. Kies voor de professionele
              aanpak van KClean Detailing!
            </p>
          </div>
          <Gallery />
        </div>
      </section>

      <section className="overflow-hidden border-y bg-card py-6">
        <div className="flex w-max animate-marquee gap-16">
          {[...USP, ...USP].map((u, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap font-display text-xl font-semibold"
            >
              <u.icon className="text-accent" /> {u.t}
            </span>
          ))}
        </div>
      </section>
      <BeforeAfter />
      <Services />
      <InfoTexts />
      <BookingIntro />
      <Booking />
      <Contact/>
      {/* <BrandsOffer /> */}

      {/* <Partners /> */}
      {/* <Footer /> */}
      <ChatWidget />
    
    </div>
  );
}
