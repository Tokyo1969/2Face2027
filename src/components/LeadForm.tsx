import { useState } from "react";

const STRIPE_CHECKOUT_URL = {
  A3: "https://buy.stripe.com/8x2cN5c6degQeJDaoj9AA01",
  A2: "https://buy.stripe.com/5kQ8wP9Y53Cc8lfcwr9AA00",
} as const;

export function LeadForm() {
  const [format, setFormat] = useState<"A3" | "A2">("A3");
  const checkoutUrl = STRIPE_CHECKOUT_URL[format];

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Wybierz format i przejdź bezpośrednio do bezpiecznej płatności Stripe.
      </p>

      <div>
        <span className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2">
          Format kalendarza
        </span>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            aria-pressed={format === "A3"}
            onClick={() => setFormat("A3")}
            className={`border px-4 py-3 text-sm text-left transition ${
              format === "A3"
                ? "border-gold bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:border-gold/60"
            }`}
          >
            <span className="block font-display text-lg">A3</span>
            <span className="text-[10px] tracking-luxury uppercase">199 PLN</span>
          </button>
          <button
            type="button"
            aria-pressed={format === "A2"}
            onClick={() => setFormat("A2")}
            className={`border px-4 py-3 text-sm text-left transition ${
              format === "A2"
                ? "border-gold bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:border-gold/60"
            }`}
          >
            <span className="block font-display text-lg">A2</span>
            <span className="text-[10px] tracking-luxury uppercase">299 PLN</span>
          </button>
        </div>
      </div>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-3 bg-gold text-accent-foreground px-8 py-4 text-xs tracking-luxury uppercase hover:opacity-90 transition"
      >
        Przejdź do płatności Stripe →
      </a>

      <div className="text-[11px] text-muted-foreground border-t border-border pt-4">
        Szybkie linki: <a href={STRIPE_CHECKOUT_URL.A3} className="text-gold hover:underline">A3</a>{" "}
        · <a href={STRIPE_CHECKOUT_URL.A2} className="text-gold hover:underline">A2</a>
      </div>
    </div>
  );
}
