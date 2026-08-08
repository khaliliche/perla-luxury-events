import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PacksPage() {
  const packs = await prisma.pack.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Nos formules
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-ivory md:text-5xl">
          Packs & Prix
        </h1>
        <p className="mt-4 text-ivory/60">
          Des formules pensées pour chaque type d&apos;événement.
        </p>
      </div>

      {packs.length === 0 ? (
        <p className="mt-16 text-center text-ivory/50">
          Les packs seront bientôt disponibles. Contactez-nous sur WhatsApp
          pour un devis personnalisé.
        </p>
      ) : (
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={`rounded-2xl border p-8 ${
                pack.featured
                  ? "border-gold bg-charcoal shadow-lg shadow-gold/10"
                  : "border-gold/20 bg-onyx"
              }`}
            >
              {pack.featured && (
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gold">
                  Populaire
                </p>
              )}
              <h3 className="font-[family-name:var(--font-display)] text-2xl text-gold-light">
                {pack.name}
              </h3>
              <p className="mt-3 text-sm text-ivory/60">{pack.description}</p>
              <p className="mt-6 font-[family-name:var(--font-display)] text-3xl text-ivory">
                {pack.price}
              </p>
              <ul className="mt-6 space-y-2 text-left text-sm text-ivory/70">
                {pack.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={
                  "https://wa.me/212632604084?text=" +
                  encodeURIComponent(
                    `Bonjour, je suis intéressé(e) par le pack "${pack.name}".`
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-full border border-gold py-3 text-center text-gold-light transition-colors hover:bg-gold hover:text-onyx"
              >
                Réserver ce pack
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}