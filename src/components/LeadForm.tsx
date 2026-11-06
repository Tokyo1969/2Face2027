import { useRef, useState } from "react";
import { Check, ShieldCheck, Truck, Sparkles, Box, CreditCard } from "lucide-react";

const STRIPE_CHECKOUT_URL = {
  A3: "https://buy.stripe.com/5kQ5kD7PX8Ww0SN0NJ9AA02",
  A2: "https://buy.stripe.com/5kQ8wP9Y53Cc8lfcwr9AA00",
} as const;

export function LeadForm() {
  const [consentShipping, setConsentShipping] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const consentRef = useRef<HTMLDivElement>(null);

  function shakeConsent() {
    const el = consentRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-4px)" },
        { transform: "translateX(4px)" },
        { transform: "translateX(-3px)" },
        { transform: "translateX(3px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 300, easing: "ease-in-out" },
    );
  }

  function handleCheckout(format: "A3" | "A2") {
    if (!consentShipping) {
      setSubmitError(
        "Aby przejść do płatności, zaakceptuj poniższą zgodę na realizację zamówienia i wysyłkę.",
      );
      shakeConsent();
      return;
    }

    setSubmitError("");
    window.open(STRIPE_CHECKOUT_URL[format], "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-8">
      {/* FORMAT CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* FORMAT A3 */}
        <div className="border border-border/80 bg-card/60 p-6 md:p-8 flex flex-col justify-between hover:border-gold/50 transition-all duration-300 relative group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-luxury uppercase text-muted-foreground">
                Format A3
              </span>
              <span className="text-[10px] uppercase tracking-luxury text-accent-foreground bg-gold px-2 py-0.5 font-bold">
                Wyprzedaż
              </span>
            </div>
            <div className="mt-3 font-display text-4xl text-foreground">29,7 × 42 cm</div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Kompaktowa elegancja. Idealny do prywatnego gabinetu, biblioteki lub sypialni.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-muted-foreground border-t border-border/50 pt-5">
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>12 wyselekcjonowanych kart z fotografią</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Szlachetny papier matowy 250 g/m²</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Indywidualna numeracja i certyfikat</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Czarna matowa spirala z zawieszką</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60">
            <div className="text-[10px] tracking-luxury uppercase text-gold font-bold mb-1">
              Wyprzedaż · Ostatnie egzemplarze
            </div>
            <div className="flex items-baseline gap-2 mb-4 flex-wrap">
              <span className="text-lg text-muted-foreground line-through">199,-</span>
              <span className="font-display text-4xl text-gold">99,-</span>
              <span className="text-xs tracking-luxury uppercase text-muted-foreground">
                PLN / ~23 EUR
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCheckout("A3")}
              className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-background hover:bg-gold hover:text-accent-foreground px-6 py-4 text-xs tracking-luxury uppercase press font-bold shadow-lg cursor-pointer"
            >
              Kupuję format A3 →
            </button>
          </div>
        </div>

        {/* FORMAT A2 - FEATURED */}
        <div className="border-2 border-gold/70 bg-card p-6 md:p-8 flex flex-col justify-between relative shadow-editorial hover:border-gold transition-all duration-300">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-accent-foreground px-3.5 py-1 text-[10px] tracking-luxury uppercase font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3 h-3" />
            Wybór Kolekcjonerów
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] tracking-luxury uppercase text-gold font-medium">
                Format A2 (Galeryjny)
              </span>
              <span className="text-[10px] uppercase tracking-luxury text-muted-foreground px-2 py-0.5 border border-border font-medium">
                Brak
              </span>
            </div>
            <div className="mt-3 font-display text-4xl text-foreground">42 × 59,4 cm</div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Monumentalny wymiar wystawowy. Niesamowite nasycenie czerni i kinowy rozmach każdego
              ujęcia.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-muted-foreground border-t border-border/50 pt-5">
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="text-foreground font-medium">
                  Muzealny format ponad pół metra wysokości
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Gruby papier archiwalny 300 g/m² velvet touch</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Odręczny podpis autora i tłoczona pieczęć</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Najwyższa wartość kolekcjonerska</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/60">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-4xl text-muted-foreground">BRAK</span>
              <span className="text-xs tracking-luxury uppercase text-muted-foreground">
                Nakład wyczerpany
              </span>
            </div>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="w-full inline-flex items-center justify-center gap-2 border border-border text-muted-foreground px-6 py-4 text-xs tracking-luxury uppercase font-bold cursor-not-allowed opacity-70"
            >
              Format A2 — brak
            </button>
          </div>
        </div>
      </div>

      {/* CONSENT CHECKBOX */}
      <div
        ref={consentRef}
        className={`bg-card/40 border p-5 rounded-sm transition-[border-color] duration-200 ${
          submitError ? "border-red-400/60" : "border-border/70"
        }`}
      >
        <label className="flex gap-3.5 items-start cursor-pointer">
          <input
            type="checkbox"
            checked={consentShipping}
            onChange={(e) => {
              setConsentShipping(e.target.checked);
              if (e.target.checked) setSubmitError("");
            }}
            className="mt-1 w-4 h-4 accent-[var(--color-gold)] shrink-0 rounded cursor-pointer"
          />
          <span className="text-xs text-muted-foreground leading-relaxed select-none">
            Wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie niezbędnym do
            realizacji zamówienia, płatności i wysyłki produktu przez Maciej Max Dominik / NoirSilk
            oraz operatora płatności Stripe. Dane będą przetwarzane wyłącznie w celu obsługi
            transakcji, zgodnie z obowiązującymi przepisami RODO.
          </span>
        </label>

        {submitError ? (
          <p role="alert" className="alert-in mt-3 text-xs text-red-400 font-medium pl-7">
            {submitError}
          </p>
        ) : null}
      </div>

      {/* TRUST BADGES & GUARANTEES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-border/50">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <Truck className="w-4 h-4 text-gold shrink-0" />
          <span>Wysyłka w cenie na terenie Polski</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <Box className="w-4 h-4 text-gold shrink-0" />
          <span>Pancerne opakowanie flat-pack</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <CreditCard className="w-4 h-4 text-gold shrink-0" />
          <span>Szybkie i bezpieczne Stripe / BLIK</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
          <span>Wysyłka od 19.10.2026 r.</span>
        </div>
      </div>
    </div>
  );
}
