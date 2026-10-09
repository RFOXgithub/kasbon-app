export default function Loading() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-page px-4 py-8 text-ink">
      <div className="surface-shell w-full max-w-sm">
        <div className="surface-core flex flex-col items-center px-8 py-12 text-center" role="status" aria-live="polite">
          <span aria-hidden="true" className="grid size-12 place-items-center rounded-2xl bg-forest text-xl font-semibold text-brand-cream">K.</span>
          <span className="mt-7 flex items-center gap-3 text-sm font-medium text-accent">
            <span className="loading-dot" aria-hidden="true" /> Menyiapkan Kasbon...
          </span>
        </div>
      </div>
    </main>
  );
}
