import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://api.noirsilk.eu").replace(
  /\/$/,
  "",
);

const schema = z.object({
  name: z.string().trim().min(2, "Podaj imię").max(100),
  email: z.string().trim().email("Nieprawidłowy adres e-mail").max(255),
  street: z.string().trim().min(3, "Podaj ulicę i numer").max(200),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{2}-\d{3}$/, "Podaj kod w formacie 00-000"),
  city: z.string().trim().min(2, "Podaj miasto").max(100),
  format: z.enum(["A3", "A2"], { message: "Wybierz format" }),
  consent_processing: z.literal(true, {
    errorMap: () => ({ message: "Zgoda na przetwarzanie danych jest wymagana" }),
  }),
  consent_marketing: z.boolean(),
});

export function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [format, setFormat] = useState<"A3" | "A2">("A3");
  const [processing, setProcessing] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [requestId] = useState(() => crypto.randomUUID());

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({
      name,
      email,
      street,
      postalCode,
      city,
      format,
      consent_processing: processing,
      consent_marketing: marketing,
    });
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Formularz zawiera błędy";
      setSubmitError(message);
      toast.error(message);
      return;
    }
    setSubmitError("");
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/2face-2027`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          name: parsed.data.name,
          email: parsed.data.email,
          street: parsed.data.street,
          postalCode: parsed.data.postalCode,
          city: parsed.data.city,
          format: parsed.data.format,
          consentProcessing: parsed.data.consent_processing,
          consentMarketing: parsed.data.consent_marketing,
          website,
        }),
      });

      if (!response.ok) throw new Error(`Order request failed: ${response.status}`);

      setSubmitted(true);
      toast.success("Dziękujemy! Skontaktujemy się w sprawie zamówienia.");
    } catch {
      const message = "Nie udało się zapisać. Sprawdź połączenie i spróbuj ponownie.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <div className="text-[11px] tracking-luxury uppercase text-gold mb-3">Dziękujemy</div>
        <h3 className="font-display text-3xl mb-3">Zapisaliśmy Twoje zgłoszenie</h3>
        <p className="text-sm text-muted-foreground">
          Skontaktujemy się z Tobą mailowo w sprawie zamówienia i szczegółów wysyłki.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="lead-website">Strona internetowa</label>
        <input
          id="lead-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label
          htmlFor="lead-name"
          className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2"
        >
          Imię
        </label>
        <input
          id="lead-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition"
          placeholder="Twoje imię"
        />
      </div>
      <div>
        <label
          htmlFor="lead-email"
          className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2"
        >
          E-mail
        </label>
        <input
          id="lead-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          maxLength={255}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition"
          placeholder="ty@przyklad.pl"
        />
      </div>

      <fieldset className="space-y-4 border-t border-border pt-5">
        <legend className="pr-3 text-[10px] tracking-luxury uppercase text-gold">
          Dane do wysyłki
        </legend>
        <div>
          <label
            htmlFor="lead-street"
            className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2"
          >
            Ulica i numer
          </label>
          <input
            id="lead-street"
            type="text"
            name="street"
            autoComplete="street-address"
            required
            maxLength={200}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition"
            placeholder="Ulica 12/3"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="lead-postal-code"
              className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2"
            >
              Kod pocztowy
            </label>
            <input
              id="lead-postal-code"
              type="text"
              name="postalCode"
              inputMode="numeric"
              autoComplete="postal-code"
              required
              maxLength={6}
              pattern="[0-9]{2}-[0-9]{3}"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition"
              placeholder="00-000"
            />
          </div>
          <div>
            <label
              htmlFor="lead-city"
              className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2"
            >
              Miasto
            </label>
            <input
              id="lead-city"
              type="text"
              name="city"
              autoComplete="address-level2"
              required
              maxLength={100}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-gold transition"
              placeholder="Warszawa"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="lead-country"
            className="block text-[10px] tracking-luxury uppercase text-muted-foreground mb-2"
          >
            Kraj
          </label>
          <input
            id="lead-country"
            type="text"
            name="country"
            autoComplete="country-name"
            readOnly
            value="Polska"
            className="w-full bg-muted/40 border border-border px-4 py-3 text-sm text-muted-foreground cursor-not-allowed"
          />
        </div>
      </fieldset>

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

      <div className="space-y-3 pt-2">
        <label className="flex gap-3 items-start cursor-pointer group">
          <input
            type="checkbox"
            required
            checked={processing}
            onChange={(e) => setProcessing(e.target.checked)}
            className="mt-1 accent-[var(--color-gold)] shrink-0"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-foreground">*</span> Wyrażam zgodę na przetwarzanie moich danych
            osobowych (imię, e-mail) przez{" "}
            <span className="text-foreground">Maciej Max Dominik / NoirSilk</span> w celu obsługi
            zamówienia kalendarza „Infatuation 2027", zgodnie z RODO. Podanie danych jest
            dobrowolne, ale niezbędne do realizacji zamówienia.
          </span>
        </label>

        <label className="flex gap-3 items-start cursor-pointer group">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
            className="mt-1 accent-[var(--color-gold)] shrink-0"
          />
          <span className="text-xs text-muted-foreground leading-relaxed">
            Wyrażam zgodę na otrzymywanie informacji marketingowych o nowych projektach
            fotograficznych, wystawach i limitowanych edycjach na podany adres e-mail. Zgodę mogę
            wycofać w każdej chwili.
          </span>
        </label>
      </div>

      <p className="text-[10px] text-muted-foreground/70 leading-relaxed pt-2 border-t border-border">
        Administratorem danych jest Maciej Max Dominik (NoirSilk). Dane przetwarzane są w celu
        obsługi zamówienia i — po wyrażeniu zgody — w celach marketingowych. Masz prawo dostępu,
        sprostowania, usunięcia oraz przenoszenia danych. Kontakt:{" "}
        <a href="mailto:hello@noirsilk.eu" className="text-gold hover:underline">
          hello@noirsilk.eu
        </a>
        .
      </p>

      {submitError ? (
        <p role="alert" className="text-sm text-red-300">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full inline-flex items-center justify-center gap-3 bg-gold text-accent-foreground px-8 py-4 text-xs tracking-luxury uppercase hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? "Wysyłanie..." : "Zamawiam kalendarz →"}
      </button>
    </form>
  );
}
