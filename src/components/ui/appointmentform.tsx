import React, { useEffect, useState } from "react";

// Paste your Apps Script web app URL here (Deploy -> Manage deployments -> Web app URL, ends in /exec)
// AKfycby_V0kiJSTO22Yr9gJWT926i2E7BGTqAyD9zBcsD4mVyfB8_LNEm7p_XwM3DIwsfjQy
// const PUBLIC_FORM_ID =
//   "1FAIpQLSdVEd0on1yuaoyYj5hvK5MsOg57I-GlNxL01zzUVqHPkJqJDA";
const API_URL = 'https://script.google.com/macros/s/AKfycby_V0kiJSTO22Yr9gJWT926i2E7BGTqAyD9zBcsD4mVyfB8_LNEm7p_XwM3DIwsfjQy/exec';

interface BookingProps {
  calculatedTotal: number;
  chosenPlanDetails: string | null | undefined;
  duration: number; // total minutes: plan + extras
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

export function AppointmentForm({ calculatedTotal, chosenPlanDetails, duration }: BookingProps) {
  const [slots, setSlots] = useState<Slots>({});
  const [slotsLoading, setSlotsLoading] = useState(true);
  const [slotsError, setSlotsError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", website: "" });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Load free slots whenever the needed duration changes (or after a "slot taken" error)
  useEffect(() => {
    if (!duration) return;
    let cancelled = false;
    setSlotsLoading(true);
    setSlotsError(false);
    fetch(`${API_URL}?duration=${duration}`)
      .then((r) => r.json())
      .then((data) => {
        console.log({data});
        if (cancelled) return;
        setSlots(data.slots ?? {});
        setDate("");
        setTime("");
      })
      .catch(() => !cancelled && setSlotsError(true))
      .finally(() => !cancelled && setSlotsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [duration, reloadKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.website) {
      setSuccess(true); // honeypot: bot
      return;
    }
    if (!date || !time) {
      setError("Kies eerst een datum en tijdstip.");
      return;
    }

    setLoading(true);
    try {
      // text/plain avoids a CORS preflight, which Apps Script cannot answer
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          date,
          time,
          // duration,
          options: chosenPlanDetails || "Geen pakket geselecteerd",
          total: `€${calculatedTotal.toFixed(2)}`,
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setSuccess(true);
      } else if (data.error === "slot_taken") {
        setError("Dit tijdstip is net bezet. Kies een ander tijdstip.");
        setReloadKey((k) => k + 1);
      } else if (data.error === "rate_limit") {
        setError("Te veel pogingen. Probeer het later opnieuw of neem telefonisch contact op.");
      } else {
        setError("Controleer uw gegevens en probeer het opnieuw.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError("Er ging iets mis bij het versturen. Probeer het opnieuw of neem telefonisch contact op.");
    } finally {
      setLoading(false);
    }
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
        <label className="block text-sm font-semibold mb-2 text-gray-700">Kies een dag</label>
        {!duration ? (
          <p className="text-sm text-gray-500">Kies eerst een pakket.</p>
        ) : slotsLoading ? (
          <p className="text-sm text-gray-500">Beschikbaarheid laden...</p>
        ) : slotsError ? (
          <p className="text-sm text-red-600">
            Beschikbaarheid kon niet geladen worden.{" "}
            <button type="button" className="underline" onClick={() => setReloadKey((k) => k + 1)}>
              Opnieuw proberen
            </button>
          </p>
        ) : days.length === 0 ? (
          <p className="text-sm text-gray-500">Geen beschikbare momenten gevonden. Neem contact met ons op.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {days.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDate(d);
                  setTime("");
                }}
                className={`px-3 py-2 rounded-xl border text-sm ${
                  date === d ? "bg-primary text-white border-primary" : "border-gray-200"
                }`}
              >
                {dayLabel(d)}
              </button>
            ))}
          </div>
        )}
      </div>

      {date && (
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Kies een tijdstip</label>
          <div className="grid grid-cols-4 gap-2">
            {slots[date]!.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={`py-2 rounded-xl border text-sm ${
                  time === t ? "bg-primary text-white border-primary" : "border-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

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
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="pt-4 border-t mt-6 flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground block">Totaalprijs op locatie:</span>
          <span className="text-2xl font-black text-primary">€{calculatedTotal.toFixed(2)}</span>
        </div>
        <button
          type="submit"
          disabled={loading || !duration}
          className="bg-primary text-white font-bold px-6 py-3.5 rounded-full hover:opacity-95 transition-opacity disabled:opacity-50 shadow-md"
        >
          {loading ? "Verwerken..." : "Afspraak Plannen"}
        </button>
      </div>
    </form>
  );
}
