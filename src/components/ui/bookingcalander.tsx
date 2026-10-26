export function BookingCalendar() {
  return (
    <section id="boeken" className="w-full bg-card py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Header Content */}
        <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Kies uw gewenste moment
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Selecteer hieronder een beschikbare datum en tijd. Onze mobiele 
          autoreinigingsdienst komt naar uw locatie wanneer het u uitkomt.
        </p>

        {/* Calendar Card Container */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-secondary bg-white shadow-xl">
          <iframe
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1TpTa8yZtemX8w63AkUJaK0wGObi9fT_Mm95ygLRuN79OMbGcy5tmQbnSNe0hWCB-T6TGEb3-d?gv=true"
            style={{ border: 0 }}
            width="100%"
            height="650"
            title="Absolute Car Cleaning Booking Calendar"
            className="w-full rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}