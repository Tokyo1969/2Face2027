import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/LeadForm";
import { MonthSlideshow } from "@/components/MonthSlideshow";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Feather,
  Maximize2,
  Box,
  Layers,
  Award,
  Calendar,
} from "lucide-react";
import { useState, useEffect, type CSSProperties } from "react";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

const media = {
  cover: "/media/cover.jpg",
  mockup: "/media/mockup.jpg",
  interior: "/media/interior.png",
  oneshot: "/media/oneshot.jpg",
  honorable: "/media/honorable.png",
  preview: "/media/video.jpg",
  formatComparison: "/media/format-comparison.jpg",
  printQuality: "/media/print-quality.jpg",
  packaging: "/media/packaging-unboxing.jpg",
} as const;

const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
const socialImageUrl = siteUrl ? `${siteUrl}${media.cover}` : media.cover;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INFATUATION 2027 — Limitowany kalendarz artystyczny Macieja Maxa Dominika" },
      {
        name: "description",
        content:
          'Limitowany kalendarz artystyczny 2027 „Infatuation". Czarno-biała fotografia autorska Maciej Max Dominik. Wyróżnienie OneShot Awards, publikacja w Lens Magazine. Wysyłka od 19.10.2026.',
      },
      { property: "og:title", content: "INFATUATION 2027 — Limitowany kalendarz artystyczny" },
      {
        property: "og:description",
        content:
          "Limitowana edycja kolekcjonerska kalendarza artystycznego 2027. 12 miesięcy intymnej fotografii Macieja Maxa Dominika. Wysyłka od 19.10.2026.",
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
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@200;300;400;500;600&family=Great+Vibes&display=swap",
      },
    ],
  }),
  component: Landing,
});

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl md:text-5xl text-gold font-light">{value}</div>
      <div className="mt-2 text-[10px] md:text-xs tracking-luxury uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function Landing() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 600);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Deter casual saving of photos: no context menu or drag on images
  useEffect(() => {
    const isImage = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest("img, [data-protect]");
    const block = (e: Event) => {
      if (isImage(e.target)) e.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    document.documentElement.classList.add("reveal-ready");
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-gold/30 selection:text-foreground">
      {/* NAVIGATION */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display text-xl text-gold tracking-wide italic">NoirSilk</span>
            <span className="hidden sm:inline-block text-[9px] tracking-luxury uppercase text-muted-foreground border-l border-border pl-2">
              Edition 2027
            </span>
          </a>

          <div className="hidden lg:flex gap-8 text-[11px] tracking-luxury uppercase text-muted-foreground">
            <a href="#about" className="hover:text-gold transition">
              Autor
            </a>
            <a href="#craft" className="hover:text-gold transition">
              Kunszt
            </a>
            <a href="#spread" className="hover:text-gold transition">
              12 Miesięcy
            </a>
            <a href="#formats" className="hover:text-gold transition">
              Formaty
            </a>
            <a href="#awards" className="hover:text-gold transition">
              Nagrody
            </a>
            <a href="#faq" className="hover:text-gold transition">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#buy"
              className="text-[11px] tracking-luxury uppercase border border-gold/70 text-gold px-5 py-2.5 hover:bg-gold hover:text-accent-foreground press font-medium cursor-pointer"
            >
              Zamów Kalendarz
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div
              style={stagger(0)}
              className="hero-in inline-flex items-center gap-2 px-3 py-1 mb-6 border border-gold/40 bg-gold/5 text-[10px] md:text-[11px] tracking-luxury uppercase text-gold"
            >
              <Sparkles className="w-3 h-3 text-gold" />
              Edycja Kolekcjonerska · Nakład 500 sztuk
            </div>

            <h1
              style={stagger(1)}
              className="hero-in font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] font-light tracking-tight"
            >
              Infatuation
            </h1>

            <div style={stagger(2)} className="hero-in mt-5 flex items-center gap-4">
              <div className="hero-line h-px w-20 bg-gold" />
              <span className="text-xs tracking-luxury uppercase text-muted-foreground font-light">
                Kalendarz Artystyczny 2027
              </span>
            </div>

            <p
              style={stagger(3)}
              className="hero-in mt-8 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-light"
            >
              Dwanaście miesięcy intymnej, czarno-białej fotografii. Ekskluzywne dzieło
              kolekcjonerskie w limitowanym nakładzie, wydrukowane na szlachetnym papierze
              archiwalnym z odręcznym podpisem autora.
            </p>

            <div style={stagger(4)} className="hero-in mt-8 flex items-baseline gap-3">
              <span className="font-script text-2xl text-gold">Photography by</span>
              <span className="font-display text-2xl md:text-3xl tracking-wide">
                Maciej Max Dominik
              </span>
            </div>

            <div style={stagger(5)} className="hero-in mt-10 flex flex-wrap gap-4 items-center">
              <a
                href="#buy"
                className="inline-flex items-center gap-3 bg-gold text-accent-foreground px-8 py-4 text-xs tracking-luxury uppercase hover:opacity-90 press font-bold shadow-lg hover:shadow-gold/20 cursor-pointer"
              >
                Zamów egzemplarz (od 199 zł)
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#craft"
                className="inline-flex items-center gap-2 border border-border px-7 py-4 text-xs tracking-luxury uppercase hover:border-gold hover:text-gold press cursor-pointer"
              >
                Odkryj kunszt wydania
              </a>
            </div>

            {/* TRUST HIGHLIGHTS */}
            <div
              style={stagger(6)}
              className="hero-in mt-12 pt-8 border-t border-border/60 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-muted-foreground"
            >
              <div>
                <div className="text-gold font-display text-lg">19.10.2026</div>
                <div className="text-[10px] tracking-luxury uppercase mt-0.5">Start wysyłki</div>
              </div>
              <div>
                <div className="text-gold font-display text-lg">500 sztuk</div>
                <div className="text-[10px] tracking-luxury uppercase mt-0.5">Ścisły limit</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-gold font-display text-lg">0 zł</div>
                <div className="text-[10px] tracking-luxury uppercase mt-0.5">Dostawa w Polsce</div>
              </div>
            </div>
          </div>

          <div className="hero-cover lg:col-span-5 order-1 lg:order-2 relative flex justify-center">
            <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative group">
              <img
                src={media.cover}
                alt="Infatuation 2027 — okładka kalendarza"
                className="w-full max-w-sm sm:max-w-md mx-auto shadow-editorial border border-border/50 group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md border border-border/80 p-3 text-center">
                <div className="text-[10px] tracking-luxury uppercase text-gold">
                  Okładka Edycji 2027
                </div>
                <div className="text-xs font-display italic text-muted-foreground">
                  „Infatuation" — autorski kadr Macieja Maxa Dominika
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition">
          <a href="#about" className="text-[9px] tracking-luxury uppercase text-muted-foreground">
            Odkryj szczegóły
          </a>
          <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
        </div>
      </section>

      {/* MARQUEE CREDIBILITY */}
      <section className="border-y border-border/60 py-6 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[11px] tracking-luxury uppercase text-muted-foreground">
          <span className="text-gold font-medium">Uznanie międzynarodowe:</span>
          <span className="font-display text-xl text-foreground normal-case tracking-normal italic">
            Lens Magazine
          </span>
          <span className="opacity-40">·</span>
          <span>One Shot Awards 2026</span>
          <span className="opacity-40">·</span>
          <span>Ponad 100 000 głosów</span>
          <span className="opacity-40">·</span>
          <span>Honorable Mention — Nude Professional</span>
        </div>
      </section>

      {/* SECTION: KUNSZT WYDANIA / CRAFTSMANSHIP */}
      <section id="craft" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3 flex items-center justify-center gap-2">
              <Feather className="w-3.5 h-3.5" />
              Standard Galeryjny & Rzemiosło
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Kunszt w każdym milimetrze papieru
            </h2>
            <div className="mt-5 h-px w-16 bg-gold mx-auto" />
            <p className="mt-6 text-muted-foreground text-sm md:text-base leading-relaxed font-light">
              Kalendarz „Infatuation" to nie masowy wydruk reklamowy, lecz pieczołowicie stworzony
              obiekt kolekcjonerski przygotowany według rygorystycznych standardów wystawienniczych.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div
                data-reveal
                className="relative group overflow-hidden border border-border shadow-editorial"
              >
                <img
                  src={media.printQuality}
                  alt="Zbliżenie na papier archiwalny, tłoczenia i spiralę kalendarza"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[10px] tracking-luxury uppercase text-gold mb-1">
                    Detal Rzemiosła
                  </div>
                  <div className="font-display text-xl text-foreground">
                    Aksamitna matowa faktura i złocone tłoczenia
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal className="lg:col-span-5 space-y-6">
              <div className="bg-card/50 border border-border/70 p-6 hover:border-gold/50 transition">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gold/10 border border-gold/30 text-gold shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground">
                      Papier Archiwalny Fine-Art
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Ciężki papier bezdrzewny (do 300 g/m² w formacie A2). Matowe, aksamitne
                      wykończenie pochłania odblaski i pozwala podziwiać każdy niuans światła.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border/70 p-6 hover:border-gold/50 transition">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gold/10 border border-gold/30 text-gold shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground">
                      Głęboka Czerń Pigmentowa
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Zastosowanie specjalnych czarnych pigmentów węglowych zapewnia głęboką,
                      smolistą czerń oraz aksamitne przejścia szarości, oddające plastykę oryginału.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border/70 p-6 hover:border-gold/50 transition">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gold/10 border border-gold/30 text-gold shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground">
                      Certyfikat z Podpisem Autora
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Każdy egzemplarz z numerowanego nakładu 500 sztuk posiada odręczny podpis
                      Macieja Maxa Dominika oraz certyfikat potwierdzający autentyczność wydania.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 border border-border/70 p-6 hover:border-gold/50 transition">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-gold/10 border border-gold/30 text-gold shrink-0">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground">
                      Czarna Matowa Spirala Twin-Wire
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Elegancka, minimalistyczna oprawa z wbudowaną zawieszką umożliwia perfekcyjne
                      przyleganie kalendarza do ściany i łatwe obracanie kart każdego miesiąca.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 12 MIESIĘCY EMOCJI / SPREAD PREVIEW */}
      <section id="spread" className="py-24 md:py-32 bg-card/30 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div data-reveal className="lg:col-span-5 order-2 lg:order-1">
              <div className="text-[11px] tracking-luxury uppercase text-gold mb-3 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                Kolekcja 12 Miesięcy
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
                Dwanaście intymnych kadrów, które zmieniają wnętrze
              </h2>
              <div className="mt-5 h-px w-16 bg-gold" />
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed font-light">
                Każdy miesiąc to osobna opowieść zapisana światłem i cieniem. Starannie
                wyselekcjonowane prace pochodzą z wielokrotnie nagradzanego cyklu{" "}
                <strong>2FACE</strong> oraz archiwum autorskich sesji portretowych.
              </p>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed font-light">
                Po upływie roku każda karta może zostać oprawiona w passe-partout i stać się
                niezależną fotografią kolekcjonerską w Twojej galerii domowej.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/50 pt-6">
                <div>
                  <div className="font-display text-2xl text-gold">12</div>
                  <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mt-1">
                    Unikalnych kart
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl text-gold">100%</div>
                  <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mt-1">
                    Fotografia autorska
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#buy"
                  className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-6 py-3.5 text-xs tracking-luxury uppercase hover:opacity-90 press font-bold"
                >
                  Zarezerwuj swój nakład →
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <div data-reveal>
                <MonthSlideshow />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FORMAT COMPARISON (A2 vs A3) */}
      <section id="formats" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div data-reveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3 flex items-center justify-center gap-2">
              <Maximize2 className="w-3.5 h-3.5" />
              Porównanie Skali we Wnętrzu
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Wybierz format dla swojej przestrzeni
            </h2>
            <div className="mt-5 h-px w-16 bg-gold mx-auto" />
            <p className="mt-6 text-muted-foreground text-sm md:text-base leading-relaxed font-light">
              Zobacz rzeczywistą skalę formatów A3 oraz A2 we współczesnym wnętrzu. Zdecyduj, który
              rozmiar lepiej dopełni charakter Twojego salonu lub gabinetu.
            </p>
          </div>

          <div
            data-reveal
            className="relative overflow-hidden border border-border/70 shadow-editorial bg-card/20 mb-12"
          >
            <img
              src={media.formatComparison}
              alt="Porównanie formatów A3 oraz A2 na ścianie salonu"
              className="w-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md border border-border/80 px-4 py-2 text-xs tracking-luxury uppercase text-gold">
              Wizualizacja Skali: A3 (po lewej) vs A2 (po prawej)
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-border/80 bg-card/40 p-8 flex flex-col justify-between">
              <div>
                <div className="text-[11px] tracking-luxury uppercase text-muted-foreground">
                  Format Mniejszy
                </div>
                <div className="mt-2 font-display text-3xl text-foreground">A3 · 29,7 × 42 cm</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
                  Dyskretny, intymny format. Znakomicie prezentuje się w gabinecie nad biurkiem, w
                  korytarzu artystycznym lub domowej bibliotece. Nie przytłacza mniejszych
                  pomieszczeń, zachowując perfekcyjną czytelność fotografii.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="font-display text-2xl text-gold">199 PLN</span>
                <a
                  href="#buy"
                  className="text-xs tracking-luxury uppercase text-gold hover:underline"
                >
                  Wybierz A3 →
                </a>
              </div>
            </div>

            <div className="border-2 border-gold/70 bg-card/60 p-8 flex flex-col justify-between relative shadow-editorial">
              <div className="absolute -top-3 right-6 bg-gold text-accent-foreground px-3 py-0.5 text-[10px] tracking-luxury uppercase font-bold">
                Rekomendacja Autora
              </div>
              <div>
                <div className="text-[11px] tracking-luxury uppercase text-gold">
                  Format Monumentalny
                </div>
                <div className="mt-2 font-display text-3xl text-foreground">A2 · 42 × 59,4 cm</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
                  Muzealny rozmiar wystawowy o wysokości ponad pół metra. Format A2 tworzy główny
                  punkt skupienia uwagi w salonie lub luksusowym apartamencie, uwypuklając całe
                  bogactwo faktury i światłocienia.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="font-display text-2xl text-gold">299 PLN</span>
                <a
                  href="#buy"
                  className="text-xs tracking-luxury uppercase text-gold hover:underline font-bold"
                >
                  Wybierz A2 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ABOUT AUTHOR & INTERIOR */}
      <section id="about" className="py-24 md:py-32 bg-card/30 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div data-reveal className="relative border border-border shadow-editorial">
              <img src={media.interior} alt="Kalendarz w aranżacji wnętrza" className="w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
            </div>
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
              prasie fotograficznej, wyróżniony w prestiżowych konkursach światowych.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed font-light">
              Kalendarz „Infatuation" to autorska seria dwunastu wyselekcjonowanych zdjęć — obiekt
              kolekcjonerski, wydany w ściśle numerowanym nakładzie 500 sztuk.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 py-8 border-y border-border">
              <Stat value="100 tyś" label="Głosów OneShot" />
              <Stat value="12" label="Miesięcy sztuki" />
              <Stat value="1/500" label="Numerowany nakład" />
            </div>
            <div className="mt-8 flex flex-wrap gap-6 items-center">
              <a
                href="https://noirsilk.eu/en/about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-luxury uppercase text-gold hover:text-foreground transition border-b border-gold/40 pb-1"
              >
                Więcej o autorze na NoirSilk.eu →
              </a>
              <a
                href="https://noirsilk.eu/en/series/2face"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] tracking-luxury uppercase text-muted-foreground hover:text-gold transition border-b border-border pb-1"
              >
                Zobacz serię 2FACE →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: AWARDS & PUBLICATIONS */}
      <section id="awards" className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div data-reveal className="text-center mb-16">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3">
              Uznanie Świata Sztuki
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light">Nagrody & Publikacje</h2>
            <div className="mt-5 h-px w-16 bg-gold mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-8 md:p-10 flex flex-col items-center text-center hover:border-gold/60 transition group shadow-editorial">
              <img
                src={media.oneshot}
                alt="Exposure One Awards trophy"
                className="h-80 object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="mt-6 font-display text-2xl">Exposure One Awards 2026</div>
              <div className="mt-2 text-xs tracking-luxury uppercase text-gold">
                Honorable Mention · Nude · Professional
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Ponad 100 000 głosów w prestiżowym międzynarodowym konkursie One Shot Photo Contest.
              </p>
            </div>

            <div className="bg-card border border-border p-8 md:p-10 flex flex-col hover:border-gold/60 transition group shadow-editorial">
              <img
                src={media.honorable}
                alt="Lens Magazine badge"
                className="w-full object-contain bg-secondary/30 p-6 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="mt-6 font-display text-2xl">Lens Magazine</div>
              <div className="mt-2 text-xs tracking-luxury uppercase text-gold">
                Featured Publication
              </div>
              <p className="mt-3 text-sm text-muted-foreground flex-1 leading-relaxed">
                Seria „Infatuation" opublikowana w międzynarodowym magazynie poświęconym fotografii
                artystycznej najwyższej próby.
              </p>
              <div className="mt-6 pt-6 border-t border-border text-4xl font-display italic text-gold/80 flex items-center justify-between">
                <span>
                  Lens
                  <span className="text-xs align-super ml-1 not-italic tracking-luxury uppercase">
                    Magazine
                  </span>
                </span>
                <span className="text-xs tracking-luxury uppercase text-muted-foreground not-italic font-sans">
                  Wydanie Międzynarodowe
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: PACKAGING & UNBOXING */}
      <section className="py-24 md:py-32 bg-card/30 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div data-reveal className="lg:col-span-6 order-2 lg:order-1">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Doświadczenie Unboxingu
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
              Opakowanie godne dzieła sztuki
            </h2>
            <div className="mt-5 h-px w-16 bg-gold" />
            <p className="mt-6 text-muted-foreground text-sm md:text-base leading-relaxed font-light">
              Wiemy, jak cenny jest nieskazitelny stan papieru artystycznego. Dlatego
              zrezygnowaliśmy ze zwijania w ciasne tuby, które powodują zniekształcenia.
            </p>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed font-light">
              Każdy kalendarz wysyłany jest w{" "}
              <strong>sztywnym, pancernym kartonie flat-pack</strong>, otulony bibułą ochronną, z
              zabezpieczonymi narożnikami. W przesyłce znajdziesz również imienny certyfikat
              autentyczności z numerem nakładu.
            </p>

            <div className="mt-8 space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Zero zagięć — kalendarz dostarczany całkowicie na płasko</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>Pełne ubezpieczenie przesyłki na czas transportu</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span>
                  Wysyłka rozpoczyna się od <strong>19.10.2026 r.</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div
              data-reveal
              className="relative group overflow-hidden border border-border shadow-editorial"
            >
              <img
                src={media.packaging}
                alt="Ekskluzywne opakowanie kolekcjonerskie kalendarza z certyfikatem"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm border border-border/60 p-3 text-center">
                <div className="text-[10px] tracking-luxury uppercase text-gold">
                  Kolekcjonerski Zestaw Wysyłkowy
                </div>
                <div className="text-xs text-muted-foreground font-light">
                  Certyfikat autentyczności, numeracja i bezpieczne opakowanie ochronne
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: BUY / ORDER */}
      <section id="buy" className="py-24 md:py-32 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6">
          <div data-reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 border border-gold/40 bg-gold/5 text-[10px] tracking-luxury uppercase text-gold">
              Ścisły Limit 500 Egzemplarzy
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Zamów swój egzemplarz kalendarza
            </h2>
            <p className="mt-4 text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
              Wybierz format odpowiedni dla Twojego wnętrza.{" "}
              <strong className="text-foreground">
                Wysyłkę zamówień rozpoczynamy od 19.10.2026 r.
              </strong>{" "}
              Dostawa kurierska na terenie Polski wliczona w cenę.
            </p>
          </div>

          <div className="bg-card border border-border p-6 md:p-12 relative overflow-hidden shadow-editorial">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-3xl pointer-events-none" />
            <div className="relative max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <img
                  src={media.cover}
                  alt="Kalendarz 2027"
                  className="w-full max-w-md mx-auto shadow-editorial border border-border/60"
                />
                <div className="mt-8 text-center">
                  <div className="font-display text-3xl">Kalendarz Artystyczny 2027</div>
                  <p className="mt-2 text-xs text-muted-foreground tracking-wide">
                    Druk Fine-Art · Numerowany · Podpis Macieja Maxa Dominika
                  </p>
                  <div className="mt-4 text-[11px] tracking-luxury uppercase text-gold font-medium">
                    Nakład po 500 egzemplarzy na format · Wysyłka od 19.10.2026 r.
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground">
                    Chcesz zapłacić w EURO? Wystarczy wybrać preferowaną walutę bezpośrednio na
                    stronie kasy Stripe.
                  </div>
                </div>
              </div>

              {/* UPGRADED LEAD FORM */}
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section id="faq" className="py-24 md:py-32 bg-card/20 border-t border-border/60">
        <div className="max-w-4xl mx-auto px-6">
          <div data-reveal className="text-center mb-16">
            <div className="text-[11px] tracking-luxury uppercase text-gold mb-3">
              Odpowiedzi & Szczegóły
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Najczęściej Zadawane Pytania
            </h2>
            <div className="mt-5 h-px w-16 bg-gold mx-auto" />
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card/60 border border-border px-6 py-2">
              <AccordionTrigger className="font-display text-xl text-foreground hover:no-underline hover:text-gold transition">
                Kiedy rozpoczyna się wysyłka kalendarza?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-light">
                Wysyłkę gotowych, ponumerowanych egzemplarzy rozpoczynamy{" "}
                <strong>19 października 2026 roku</strong>. Zamówienia realizowane są
                chronologicznie według kolejności ich złożenia. O nadaniu przesyłki z numerem
                śledzenia kuriera zostaniesz powiadomiony mailowo.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card/60 border border-border px-6 py-2">
              <AccordionTrigger className="font-display text-xl text-foreground hover:no-underline hover:text-gold transition">
                Czym różni się format A2 od A3?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-light">
                Format <strong>A2 (42 × 59,4 cm)</strong> ma dwukrotnie większą powierzchnię niż A3
                i jest drukowany na grubszym papierze archiwalnym 300 g/m². To monumentalny format
                galeryjny, przeznaczony do przestronnych salonów i gabinetów. Format{" "}
                <strong>A3 (29,7 × 42 cm)</strong> to klasyczny, elegancki format kolekcjonerski,
                doskonały do mniejszych wnętrz, biur oraz sypialni.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card/60 border border-border px-6 py-2">
              <AccordionTrigger className="font-display text-xl text-foreground hover:no-underline hover:text-gold transition">
                Jak zabezpieczony jest kalendarz w transporcie?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-light">
                Każdy egzemplarz pakujemy na płasko (flat-pack) w specjalnie wzmocniony, gruby
                karton z narożnikami amortyzującymi uderzenia. Kalendarz nie jest zwijany w rulon,
                co zapobiega powstawaniu odkształceń i rys. Wszystkie przesyłki są w 100%
                ubezpieczone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card/60 border border-border px-6 py-2">
              <AccordionTrigger className="font-display text-xl text-foreground hover:no-underline hover:text-gold transition">
                Czy kalendarz posiada certyfikat i podpis autora?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-light">
                Tak. „Infatuation" to oficjalna, limitowana edycja artystyczna (500 sztuk na
                format). Do każdego zamówienia dołączony jest imienny certyfikat autentyczności z
                ręcznie wpisanym numerem egzemplarza oraz odręcznym podpisem Macieja Maxa Dominika.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card/60 border border-border px-6 py-2">
              <AccordionTrigger className="font-display text-xl text-foreground hover:no-underline hover:text-gold transition">
                Czy mogę zapłacić w EURO lub zamówić wysyłkę za granicę?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-light">
                Oczywiście. Po przejściu do płatności Stripe platforma umożliwia wybór płatności w
                walucie EUR oraz podanie adresu dostawy w krajach Unii Europejskiej i na świecie.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-2xl italic text-gold">NoirSilk</div>
            <div className="text-xs text-muted-foreground mt-1">
              © 2026 Maciej Max Dominik. Wszelkie prawa zastrzeżone. Kalendarz Artystyczny 2027.
            </div>
            <div className="text-[11px] text-muted-foreground/70 mt-1">
              Wysyłka zamówień od 19.10.2026 r. Powered by{" "}
              <a
                href="https://nexxsite.pl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                NexXsite.pl
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 text-[11px] tracking-luxury uppercase text-muted-foreground">
            <a
              href="https://noirsilk.eu/en/about"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition"
            >
              Autor
            </a>
            <a
              href="https://noirsilk.eu/en/series/2face"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition"
            >
              Galeria 2FACE
            </a>
            <a href="mailto:hello@noirsilk.eu" className="hover:text-gold transition">
              Kontakt
            </a>
          </div>
        </div>
      </footer>

      {/* STICKY BOTTOM BAR FOR MOBILE */}
      <div
        data-visible={scrolledPastHero || undefined}
        aria-hidden={!scrolledPastHero}
        className="sticky-bar fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-lg border-t border-border/80 p-3 sm:hidden flex items-center justify-between shadow-2xl"
      >
        <div>
          <div className="text-[10px] tracking-luxury uppercase text-gold">Infatuation 2027</div>
          <div className="text-xs font-display text-foreground">
            Format A3 (199 zł) / A2 (299 zł)
          </div>
        </div>
        <a
          href="#buy"
          className="bg-gold text-accent-foreground px-4 py-2 text-[10px] tracking-luxury uppercase font-bold shadow press"
        >
          Zamów →
        </a>
      </div>
    </div>
  );
}
