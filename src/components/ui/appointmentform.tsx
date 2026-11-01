import React, { useEffect, useState } from "react";

// Paste your Apps Script web app URL here (Deploy -> Manage deployments -> Web app URL, ends in /exec)
// AKfycby_V0kiJSTO22Yr9gJWT926i2E7BGTqAyD9zBcsD4mVyfB8_LNEm7p_XwM3DIwsfjQy
// const PUBLIC_FORM_ID =
//   "1FAIpQLSdVEd0on1yuaoyYj5hvK5MsOg57I-GlNxL01zzUVqHPkJqJDA";
const API_URL = `${import.meta.env["VITE_API_URL"]}`;

interface BookingProps {
  calculatedTotal: number;
  chosenPlanDetails: string | null | undefined;
  duration: number; // total minutes: plan + extras
  // setPlanDetails: ()=>{}
}

type Slots = Record<string, string[]>;

const dayLabel = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y!, m! - 1, d!).toLocaleDateString("nl-BE", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

export function AppointmentForm({
  calculatedTotal,
  chosenPlanDetails,
  duration,
  // , setPlanDetails
}: BookingProps) {
  const [slots, setSlots] = useState<Slots>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    date: "",
    time: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Load free slots whenever the needed duration changes (or after a "slot taken" error)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.website) {
      setSuccess(true); // honeypot: bot
      return;
    }
    if (!formData.date) {
      setError("Kies een datum.");
      return;
    }
      if (!formData.time) {
      setError("Kies een tijd.");
      return;
    }

    if (!chosenPlanDetails) {
      setError("Kies eerst een pakket!");
      return;
    }

       const formattedDate = formData.date.split("-").reverse().join("-");
const isDesktop = !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

       const messageText = 
`✨ *NIEUWE BOEKING* ✨

👤 *Klantgegevens:*
• *Naam:* ${formData.name}
• *E-mail:* ${formData.email}
• *Telefoon:* ${formData.phone}

📅 *Afspraak Details:*
• *Datum:* ${formattedDate}
• *Tijdstip:* ${formData.time} uur


🛠️ *Overzicht:*
${chosenPlanDetails || "Geen specifieke details opgegeven"}`;
//💶 *Totaalprijs:* €${calculatedTotal.toFixed(2)}
    const COMPANY_WHATSAPP_NUMBER = "+32489391378"; 
     const encodedMessage = encodeURIComponent(messageText);
  const whatsAppUrl = isDesktop
  ? `https://web.whatsapp.com/send?phone=${COMPANY_WHATSAPP_NUMBER}&text=${encodedMessage}`
  : `https://whatsapp.com{COMPANY_WHATSAPP_NUMBER}&text=${encodedMessage}`;

       window.open(whatsAppUrl, "_blank", "noopener,noreferrer");

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="text-center p-6 bg-green-50 border border-green-200 rounded-2xl max-w-md mx-auto">
        <h3 className="text-xl font-bold text-green-800">Bedankt voor uw boeking!</h3>
        <p className="text-green-700 mt-2">
          Uw afspraak is ingepland. U ontvangt een bevestiging per e-mail (check eventueel uw spam).
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary";
  const days = Object.keys(slots).sort();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-6 bg-card rounded-2xl border shadow-sm"
    >
      <h3 className="text-xl font-bold text-navy border-b pb-2 mb-4">Gegevens afronden</h3>
      <div>
        <label className="block text-sm font-semibold mb-1 text-gray-700">Naam</label>
        <input
          type="text"
          required
          className={inputClass}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
          <input
            type="email"
            required
            className={inputClass}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Telefoonnummer</label>
          <input
            type="tel"
            required
            className={inputClass}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">datum</label>
          <input
            type="date"
            required
            className={inputClass}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Tijd</label>
          <input
            type="time"
            required
            className={inputClass}
            value={formData.time} // FIX: Changed from formData.phone to formData.time
            onChange={(e) => setFormData({ ...formData, time: e.target.value })} // FIX: Changed from phone to time
          />
        </div>
      </div>

      {/* Honeypot: hidden from users, bots tend to fill it */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </label>
      </div>

      {error && (
       <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  <p className="font-bold">!!!</p>
  <p>{error}</p>
</div>
      )}

      <div className="pt-4 border-t mt-6 flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground block">Totaalprijs op locatie:</span>
          <span className="text-2xl font-black text-primary">€{calculatedTotal.toFixed(2)}</span>
        </div>
        <button
          type="submit"
          className="bg-primary text-white font-bold px-6 py-3.5 rounded-full hover:opacity-95 transition-opacity disabled:opacity-50 shadow-md"
        >
          Afspraak Plannen
        </button>
      </div>
    </form>
  );
}
