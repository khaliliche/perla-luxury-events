import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const eventLabels: Record<string, string> = {
  MARIAGE: "Mariage",
  FIANCAILLES: "Fiançailles",
  HENNA: "Henné",
  NAISSANCE: "Naissance",
  AUTRE: "Autre",
};

export default async function GaleriePage() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Nos réalisations
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-ivory md:text-5xl">
          Galerie
        </h1>
        <p className="mt-4 text-ivory/60">
          Un aperçu de ce que Perla Luxury Events peut créer pour vous.
        </p>
      </div>

      {photos.length === 0 ? (
        <p className="mt-16 text-center text-ivory/50">
          La galerie sera bientôt garnie de nos plus belles réalisations.
        </p>
      ) : (
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-xl border border-gold/20"
            >
              <Image
                src={photo.url}
                alt={photo.caption || "Perla Luxury Events"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-onyx/90 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-xs uppercase tracking-widest text-gold">
                  {eventLabels[photo.eventType] ?? photo.eventType}
                </p>
                {photo.caption && (
                  <p className="mt-1 text-sm text-ivory">{photo.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}