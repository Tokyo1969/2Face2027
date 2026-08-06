import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/LeadForm";

const media = {
  cover: "/media/cover.jpg",
  mockup: "/media/mockup.jpg",
  interior: "/media/interior.png",
  oneshot: "/media/oneshot.jpg",
  honorable: "/media/honorable.png",
  preview: "/media/video.jpg",
} as const;

const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
const socialImageUrl = siteUrl ? `${siteUrl}${media.cover}` : media.cover;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INFATUATION 2027 — kalendarz artystyczny Macieja Maxa Dominika" },
      {
        name: "description",
        content:
          'Limitowany kalendarz artystyczny 2027 „Infatuation". Fotografia autorska Maciej Max Dominik. Publikacja w Lens Magazine. 100 000 głosów w OneShot Awards.',
      },
      { property: "og:title", content: "INFATUATION 2027 — kalendarz artystyczny" },
      {
        property: "og:description",
        content: "Limitowana edycja kalendarza artystycznego 2027. Fotografia Maciej Max Dominik.",
      },
      { property: "og:type", content: "website" },
      ...(siteUrl ? [{ property: "og:url", content: siteUrl }] : []),
      { property: "og:image", content: socialImageUrl },
      { property: "og:locale", content: "pl_PL" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: socialImageUrl },
      { name: "theme-color", content: "#202023" },
    ],
    links: [
      ...(siteUrl ? [{ rel: "canonical", href: siteUrl }] : []),
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400;500&family=Great+Vibes&display=swap",
      },
    ],
  }),
  component: Landing,
});

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-5xl md:text-6xl text-gold font-light">{value}</div>
      <div className="mt-2 text-[10px] md:text-xs tracking-luxury uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xs tracking-luxury uppercase text-gold">NoirSilk</div>
          <div className="hidden md:flex gap-10 text-[11px] tracking-luxury uppercase text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition">
              Autor
            </a>
            <a href="#gallery" className="hover:text-foreground transition">
              Galeria
            </a>
            <a href="#awards" className="hover:text-foreground transition">
              Nagrody
            </a>
            <a href="#buy" className="hover:text-foreground transition">
              Zamów
            </a>
          </div>
          <a
            href="#buy"
            className="text-[11px] tracking-luxury uppercase border border-gold/60 text-gold px-4 py-2 hover:bg-gold hover:text-accent-foreground transition"
          >
            Kup
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-10 items-center w-full">
          <div className="md:col-span-6 order-2 md:order-1">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-6">
              Limited Edition · 2027
            </div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.95] font-light">
              Infatuation
            </h1>
            <div className="mt-6 h-px w-24 bg-gold" />
            <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed font-light">
              Kalendarz artystyczny na rok 2027. Dwanaście miesięcy intymnej, czarno-białej
              fotografii. Ograniczony nakład, numerowane egzemplarze.
            </p>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-script text-2xl text-gold">Photography by</span>
              <span className="font-display text-2xl">Maciej Max Dominik</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#buy"
                className="inline-flex items-center gap-3 bg-gold text-accent-foreground px-8 py-4 text-xs tracking-luxury uppercase hover:opacity-90 transition"
              >
                Zamów kalendarz →
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-3 border border-border px-8 py-4 text-xs tracking-luxury uppercase hover:border-gold hover:text-gold transition"
              >
                Zobacz galerię
              </a>
            </div>
          </div>
          <div className="md:col-span-6 order-1 md:order-2 relative">
            <div className="absolute -inset-8 bg-gold/5 blur-3xl" />
            <img
              src={media.cover}
              alt="Infatuation 2027 — okładka kalendarza"
              className="relative w-full max-w-md mx-auto shadow-editorial"
            />
          </div>
        </div>
      </section>

      {/* MARQUEE / CREDIBILITY */}
      <section className="border-y border-border/60 py-8 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[11px] tracking-luxury uppercase text-muted-foreground">
          <span className="text-gold">Featured in</span>
          <span className="font-display text-xl text-foreground normal-case tracking-normal italic">
            Lens Magazine
          </span>
          <span className="opacity-40">·</span>
          <span>One Shot Awards 2026</span>
          <span className="opacity-40">·</span>
          <span>100 000 głosów</span>
          <span className="opacity-40">·</span>
          <span>Honorable Mention — Nude Professional</span>
        </div>
      </section>

      {/* VIDEO / MOOD */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3">Preview</div>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Obiekt do kolekcjonowania
            </h2>
          </div>
          <div className="relative aspect-video overflow-hidden shadow-editorial border border-border/60">
            <img
              src={media.preview}
              alt="Kalendarz 2FACE 2027 — obiekt kolekcjonerski"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* MOCKUP + COPY */}
      <section id="about" className="py-24 md:py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={media.interior}
              alt="Kalendarz w aranżacji wnętrza"
              className="w-full shadow-editorial"
            />
          </div>
          <div>
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-4">O autorze</div>
            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight">
              Maciej Max <br />
              <span className="italic text-gold">Dominik</span>
            </h2>
            <div className="mt-6 h-px w-16 bg-gold" />
            <p className="mt-8 text-muted-foreground leading-relaxed font-light">
              Fotograf portretu i aktu. Jego prace balansują na granicy intymności i sztuki —
              czarno-białe kadry, w których światło rzeźbi emocję. Publikowany w międzynarodowej
              prasie fotograficznej, wyróżniony w prestiżowych konkursach.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed font-light">
              Kalendarz „Infatuation" to autorska seria dwunastu wyselekcjonowanych zdjęć — obiekt
              kolekcjonerski, wydany w numerowanym nakładzie.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 py-8 border-y border-border">
              <Stat value="100k" label="Głosów OneShot" />
              <Stat value="12" label="Miesięcy sztuki" />
              <Stat value="1/500" label="Numerowany nakład" />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://noirsilk.eu/en/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-luxury uppercase text-gold hover:text-foreground transition border-b border-gold/40 pb-1"
              >
                Więcej o autorze →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section id="awards" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3">Uznanie</div>
            <h2 className="font-display text-4xl md:text-5xl font-light">Nagrody & Publikacje</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-8 flex flex-col items-center text-center hover:border-gold/60 transition">
              <img
                src={media.oneshot}
                alt="Exposure One Awards trophy"
                className="h-96 object-contain"
              />
              <div className="mt-6 font-display text-2xl">Exposure One Awards 2026</div>
              <div className="mt-2 text-xs tracking-luxury uppercase text-gold">
                Honorable Mention · Nude · Professional
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Ponad 100 000 głosów w międzynarodowym konkursie One Shot Photo Contest.
              </p>
            </div>
            <div className="bg-card border border-border p-8 flex flex-col hover:border-gold/60 transition">
              <img
                src={media.honorable}
                alt="Honorable Mention badge"
                className="w-full object-contain bg-secondary/40 p-6"
              />
              <div className="mt-6 font-display text-2xl">Lens Magazine</div>
              <div className="mt-2 text-xs tracking-luxury uppercase text-gold">
                Featured Publication
              </div>
              <p className="mt-3 text-sm text-muted-foreground flex-1">
                Seria „Infatuation" opublikowana w międzynarodowym magazynie poświęconym fotografii
                artystycznej.
              </p>
              <div className="mt-6 pt-6 border-t border-border text-4xl font-display italic text-gold/80">
                Lens
                <span className="text-xs align-super ml-1 not-italic tracking-luxury uppercase">
                  Magazine
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY LINK */}
      <section id="gallery" className="py-24 md:py-32 bg-card/30 border-y border-border/60">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img
            src={media.mockup}
            alt="Kalendarz Infatuation 2027"
            className="w-full shadow-editorial"
          />
          <div>
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3">Seria 2FACE</div>
            <h2 className="font-display text-4xl md:text-5xl font-light">Zobacz pełną galerię</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed font-light">
              Odkryj kompletną serię fotografii, z której wybrano zdjęcia do kalendarza. Zanurz się
              w świecie autorskiej wizji Macieja Maxa Dominika.
            </p>
            <a
              href="https://noirsilk.eu/en/series/2face"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-gold text-gold px-8 py-4 text-xs tracking-luxury uppercase hover:bg-gold hover:text-accent-foreground transition"
            >
              Otwórz galerię 2FACE →
            </a>
          </div>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3">
              Limitowana edycja
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Kup swój egzemplarz już dziś
            </h2>
            <p className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto">
              Wybierz najlepszy format dla Siebie - już od 17.08.2026r rozpoczynamy wysyłkę.
            </p>
          </div>
          <div className="bg-card border border-border p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-3xl pointer-events-none" />
            <div className="relative grid md:grid-cols-2 gap-12 items-start">
              <div>
                <img
                  src={media.cover}
                  alt="Kalendarz 2027"
                  className="w-full max-w-xs mx-auto shadow-editorial"
                />
                <div className="mt-8 text-center">
                  <div className="font-display text-3xl">Kalendarz Art 2027</div>
                  <p className="mt-2 text-xs text-muted-foreground tracking-wide">
                    Druk premium · Numerowany · Podpis autora
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="border border-border p-4">
                      <div className="font-display text-2xl text-gold">A3</div>
                      <div className="text-xs text-muted-foreground tracking-wide">
                        29,7 × 42 cm
                      </div>
                      <div className="mt-2 font-display text-3xl">
                        199{" "}
                        <span className="text-xs tracking-luxury uppercase text-muted-foreground">
                          PLN
                        </span>
                      </div>
                    </div>
                    <div className="border border-border p-4">
                      <div className="font-display text-2xl text-gold">A2</div>
                      <div className="text-xs text-muted-foreground tracking-wide">
                        42 × 59,4 cm
                      </div>
                      <div className="mt-2 font-display text-3xl">
                        299{" "}
                        <span className="text-xs tracking-luxury uppercase text-muted-foreground">
                          PLN
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-[10px] tracking-luxury uppercase text-muted-foreground">
                    Nakład 500 egzemplarzy · Wysyłka w cenie
                  </div>
                </div>
              </div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-2xl italic text-gold">NoirSilk</div>
            <div className="text-xs text-muted-foreground mt-1">
              © 2026 Maciej Max Dominik. All rights reserved.  Powered by{" "}
              <a
                href="https://nexxsite.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                Nexxsite.pl
              </a>
            </div>
          </div>
          <div className="flex gap-8 text-[11px] tracking-luxury uppercase text-muted-foreground">
            <a
              href="https://noirsilk.eu/en/about"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              Autor
            </a>
            <a
              href="https://noirsilk.eu/en/series/2face"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold"
            >
              Galeria
            </a>
            <a href="mailto:hello@noirsilk.eu" className="hover:text-gold">
              Kontakt
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
