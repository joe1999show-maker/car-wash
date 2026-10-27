import React, { useState } from "react";
import KCleanAnimatedBanner from "./banner";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV = [
  { text: "Home", route: "home" },
  { text: "Onze diensten", route: "diensten" },
  { text: "Keramische coating", route: "keramische coating" },
  { text: "Referenties", route: "referencies" },
  { text: "Over ons", route: "over-ons" },
  { text: "Contact", route: "contact" },
  { text: "Blog", route: "blog" },
  { text: "Shop", route: "shop" },
];


export default function NavbarHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    /* 
      We make the master header relative so the absolute brand shape can lock 
      to the absolute screen edge, bypassing the centered max-w-7xl layout margins.
    */
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40 h-20 flex items-center relative">
      {/* 
        LEFT BRAND SECTION: 
        Moved out of the max-w-7xl padding container. It now attaches directly to the left screen boundary (left-0), 
        completely eliminating the white gap before the banner.
      */}
      <div className="absolute inset-y-0 left-0 flex items-center bg-[#1fb6ff] pl-6 pr-16 [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)] select-none z-10">
        <div className="flex flex-col justify-center">
          <KCleanAnimatedBanner />

          <span className="text-[9px] font-extrabold tracking-[0.14em] text-white/95 uppercase mt-0.5 whitespace-nowrap pl-1">
            Professionele Autoreiniging aan Huis
          </span>
        </div>
      </div>

      {/* CENTERED LAYOUT ROW: This manages only the nav links and action items now */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* LAYOUT SPACER: Keeps your nav links from floating underneath the absolute logo block */}
        <div className="w-72 hidden md:block shrink-0" />

        {/* CENTER NAVIGATION LINKS SECTION */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-4 lg:space-x-6">
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-[#1fb6ff] transition-colors whitespace-nowrap"
          >
            Home
          </a>
          <a
            href="#onze-diensten"
            className="text-sm font-semibold text-gray-700 hover:text-[#1fb6ff] transition-colors whitespace-nowrap"
          >
            Onze diensten
          </a>
          {/* <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-[#1fb6ff] transition-colors whitespace-nowrap"
          >
            Keramische coating
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-[#1fb6ff] transition-colors whitespace-nowrap"
          >
            Referenties
          </a> */}
          <a
            href="#over-ons"
            className="text-sm font-semibold text-gray-700 hover:text-[#1fb6ff] transition-colors whitespace-nowrap"
          >
            Over ons
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-[#1fb6ff] transition-colors whitespace-nowrap"
          >
            Contact
          </a>
          {/* <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-[#1fb6ff] transition-colors whitespace-nowrap"
          >
            Blog
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-[#1fb6ff] transition-colors whitespace-nowrap"
          >
            Shop
          </a> */}
        </nav>

        {/* RIGHT ACTION BUTTON SECTION */}
        {/* <div className="flex items-center shrink-0">
          <a
            href="#"
            className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
          >
            <span>Referenties</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div> */}
      </div>
        {/* Action Button & Hamburger Toggle Wrapper */}
        <div className="ml-auto mr-6 flex items-center gap-4">
          {/* CTA Link (Hidden on small mobile viewports to save space) */}
          <a
            href="#reviews"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            Referenties{" "}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          {/* 3. Hamburger Button Control (Visible on mobile, hidden on lg screens) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid size-12 place-items-center rounded-lg border border-muted text-navy transition-colors hover:bg-secondary lg:hidden"
            aria-label={isMobileMenuOpen ? "Sluit menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 4. Mobile Dropdown Overlay Panel */}
        <div
          className={`absolute left-0 top-full z-50 w-full bg-card border-b shadow-xl transition-all duration-300 ease-in-out lg:hidden ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col p-6 space-y-4">
            {NAV.map((n) => (
              <a
                key={n.text}
                href={n.route}
                onClick={() => setIsMobileMenuOpen(false)} // Closes menu automatically when a link is clicked
                className="text-lg font-medium text-navy hover:text-primary transition-colors py-2 border-b border-secondary last:border-none"
              >
                {n.text}
              </a>
            ))}
            {/* CTA copy specifically inside mobile menu framework for small viewports */}
            <a
              href="#reviews"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 font-semibold text-primary-foreground sm:hidden"
            >
              Referenties <ArrowRight size={16} />
            </a>
          </nav>
        </div>
    </header>
  );
}
