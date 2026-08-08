import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Mariage",
    desc: "Décoration et buffet raffinés pour le plus beau jour de votre vie.",
  },
  {
    title: "Fiançailles",
    desc: "Une mise en scène élégante pour célébrer votre engagement.",
  },
  {
    title: "Henné",
    desc: "Ambiance traditionnelle et festive, sublimée avec goût.",
  },
  {
    title: "Naissance",
    desc: "Des moments doux et précieux, mis en valeur avec délicatesse.",
  },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,162,75,0.15),transparent_60%)]" />
        <Image
          src="/logo.png"
          alt="Perla Luxury Events"
          width={140}
          height={140}
          className="relative mb-8 rounded-full"
        />
        <h1 className="relative font-[family-name:var(--font-display)] text-4xl text-gold-light md:text-6xl">
          Perla Luxury Events
        </h1>
        <p className="relative mt-4 font-[family-name:var(--font-script)] text-2xl italic text-ivory/80 md:text-3xl">
        </p>
        <div className="flourish-divider relative my-8 w-48 text-xs">✦</div>
        <p className="relative max-w-xl text-ivory/70">
          Buffets et décoration événementielle à Témara, Rabat — pour vos
          mariages, fiançailles, henné et naissances.
        </p>
        <Link
          href="/reservation"
          className="relative mt-8 rounded-full border border-gold bg-gold px-8 py-3 text-onyx transition-colors hover:bg-transparent hover:text-gold-light"
        >
          Réserver un événement
        </Link>
      </section>

      {/* Qui sommes-nous */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Qui sommes-nous
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-ivory md:text-4xl">
          L&apos;art de sublimer vos instants précieux
        </h2>
        <p className="mt-6 leading-relaxed text-ivory/70">
          Perla Luxury Events est née d&apos;une passion pour les belles
          célébrations. À Témara, nous accompagnons les familles marocaines
          dans l&apos;organisation de leurs événements les plus chers, en
          alliant buffets raffinés et décoration sur-mesure, pour que chaque
          détail reflète l&apos;élégance et l&apos;émotion du moment.
        </p>
      </section>

      {/* Services */}
      <section className="bg-charcoal px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-gold">
            Nos prestations
          </p>
          <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-3xl text-ivory md:text-4xl">
            Un accompagnement pour chaque occasion
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gold/20 bg-onyx p-8 text-center transition-colors hover:border-gold/50"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl text-gold-light">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/60">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Contactez-nous
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl text-ivory md:text-4xl">
          Parlons de votre événement
        </h2>
        <p className="mt-6 text-ivory/70">Témara · Rabat, Maroc</p>
        <p className="mt-2 text-ivory/70">WhatsApp : 06 32 60 40 84</p>
        <Link
          href="/reservation"
          className="mt-8 inline-block rounded-full border border-gold px-8 py-3 text-gold-light transition-colors hover:bg-gold hover:text-onyx"
        >
          Faire une demande
        </Link>
      </section>
    </div>
  );
}