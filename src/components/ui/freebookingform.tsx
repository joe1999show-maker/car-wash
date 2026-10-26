import React, { useState } from "react";

interface PlanDetails {
  name: string;
  description: string;
  price: number;
}

interface BookingProps {
  calculatedTotal: number;
  chosenPlanDetails: PlanDetails | string | null | undefined;
}

// Public form ID (the one starting with 1FAIpQLS... from the published "viewform" link),
// NOT the editor ID.
const PUBLIC_FORM_ID =
  "1FAIpQLSdVEd0on1yuaoyYj5hvK5MsOg57I-GlNxL01zzUVqHPkJqJDA";
const GOOGLE_FORM_ACTION_URL = `https://docs.google.com/forms/d/e/${PUBLIC_FORM_ID}/formResponse`;

export function FreeBookingForm({ calculatedTotal, chosenPlanDetails}: BookingProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    website: "", // honeypot: real users never fill this in
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Local date as YYYY-MM-DD, used to block past dates
  const today = new Date().toLocaleDateString("sv-SE");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Honeypot filled in => bot. Pretend success, send nothing.
    if (formData.website) {
      setSuccess(true);
      return;
    }

    setLoading(true);

    // Matches the "YYYY-MM-DD HH:MM" format the Apps Script expects
    const formattedDateTime = `${formData.date} ${formData.time}`;

    let planString = "Geen pakket geselecteerd";
    if (chosenPlanDetails) {
      if (typeof chosenPlanDetails === "string") {
        planString = chosenPlanDetails;
      } else if (chosenPlanDetails.name) {
        planString = `${chosenPlanDetails.name} (${chosenPlanDetails.description})`;
      }
    }

    // URLSearchParams sets the correct Content-Type automatically
    const formPayload = new URLSearchParams();
    formPayload.append("entry.1275290619", formData.name);   // Client Name
    formPayload.append("entry.1987093092", formData.email);  // Client Email
    formPayload.append("entry.1166895317", formData.phone);  // Client Phone
    formPayload.append("entry.512442687", formattedDateTime); // Booking Date Time
    formPayload.append("entry.566219484", planString);       // Selected Options
    formPayload.append("entry.822299334", `€${calculatedTotal.toFixed(2)}`); // Total Price

    try {
      // no-cors: the response is opaque, so we can't verify Google accepted it.
      // Test once and check the form's Responses tab.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formPayload,
      });
      setSuccess(true);
    } catch (err) {
      console.error("Booking submission error:", err);
      setError("Er ging iets mis bij het versturen. Probeer het opnieuw of neem telefonisch contact op.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-6 bg-green-50 border border-green-200 rounded-2xl max-w-md mx-auto">
        <h3 className="text-xl font-bold text-green-800">Bedankt voor uw aanvraag!</h3>
        <p className="text-green-700 mt-2">
          Wij hebben uw aanvraag ontvangen. U krijgt een bevestiging per e-mail zodra de afspraak is ingepland.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary";

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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Datum afspraak</label>
          <input
            type="date"
            required
            min={today}
            className={inputClass}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Tijdstip</label>
          <input
            type="time"
            required
            className={inputClass}
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
      </div>

      {/* Honeypot: hidden from users and screen readers, bots tend to fill it */}
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
          disabled={loading}
          className="bg-primary text-white font-bold px-6 py-3.5 rounded-full hover:opacity-95 transition-opacity disabled:opacity-50 shadow-md"
        >
          {loading ? "Verwerken..." : "Afspraak Aanvragen"}
        </button>
      </div>
    </form>
  );
}