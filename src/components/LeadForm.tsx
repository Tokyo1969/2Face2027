import { useState } from "react";

const STRIPE_CHECKOUT_URL = {
  A3: "https://buy.stripe.com/8x2cN5c6degQeJDaoj9AA01",
  A2: "https://buy.stripe.com/5kQ8wP9Y53Cc8lfcwr9AA00",
} as const;

export function LeadForm() {
  const [consentShipping, setConsentShipping] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleCheckout(format: "A3" | "A2") {
    if (!consentShipping) {
      setSubmitError("Aby przejść do płatności, zaakceptuj zgodę na przetwarzanie danych do wysyłki.");
      return;
    }

    setSubmitError("");
    window.open(STRIPE_CHECKOUT_URL[format], "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-border p-5 text-center">
          <div className="font-display text-2xl text-gold">A3</div>
          <div className="mt-1 text-xs text-muted-foreground tracking-wide">29,7 × 42 cm</div>
          <div className="mt-3 font-display text-3xl">
            199,-{" "}
            <span className="text-xs tracking-luxury uppercase text-muted-foreground">PLN</span>
          </div>
          <button
            type="button"
            onClick={() => handleCheckout("A3")}
            className="mt-4 w-full inline-flex items-center justify-center bg-gold text-accent-foreground px-5 py-3 text-xs tracking-luxury uppercase hover:opacity-90 transition font-bold"
          >
            Kupuję format A3
          </button>
        </div>

        <div className="border border-border p-5 text-center">
          <div className="font-display text-2xl text-gold">A2</div>
          <div className="mt-1 text-xs text-muted-foreground tracking-wide">42 × 59,4 cm</div>
          <div className="mt-3 font-display text-3xl">
            299,-{" "}
            <span className="text-xs tracking-luxury uppercase text-muted-foreground">PLN</span>
          </div>
          <button
            type="button"
            onClick={() => handleCheckout("A2")}
            className="mt-4 w-full inline-flex items-center justify-center bg-gold text-accent-foreground px-5 py-3 text-xs tracking-luxury uppercase hover:opacity-90 transition font-bold"
          >
            Kupuję format A2
          </button>
        </div>
      </div>

      <label className="flex gap-3 items-start cursor-pointer border-t border-border pt-4">
        <input
          type="checkbox"
          checked={consentShipping}
          onChange={(e) => setConsentShipping(e.target.checked)}
          className="mt-1 accent-[var(--color-gold)] shrink-0"
        />
        <span className="text-xs text-muted-foreground leading-relaxed">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie niezbędnym do realizacji
          zamówienia, płatności i wysyłki produktu przez Maciej Max Dominik / NoirSilk oraz
          operatora płatności Stripe. Dane będą przetwarzane wyłącznie w celu obsługi transakcji,
          zgodnie z obowiązującymi przepisami RODO.
        </span>
      </label>

      {submitError ? (
        <p role="alert" className="text-sm text-red-300">
          {submitError}
        </p>
      ) : null}

      <div className="text-[11px] text-muted-foreground">
        Po kliknięciu przycisku zakupowego nastąpi przekierowanie do bezpiecznej płatności Stripe.
      </div>
    </div>
  );
}
