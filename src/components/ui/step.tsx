export function Step({
  n,
  title,
  note,
  eyebrow,
  children,
}: {
  n: string;
  title: string;
  note?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-3 text-sky">
            {eyebrow ?? note}
            <span className="h-px w-14 bg-sky" />
          </p>
          <h2 className="mt-1 text-4xl font-semibold text-navy">{title}</h2>
          {eyebrow && note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}
        </div>
        <span className="grid size-20 shrink-0 place-items-center rounded-full bg-navy font-display text-xl font-bold text-navy-foreground">
          {n}
        </span>
      </div>
      {children}
    </div>
  );
}