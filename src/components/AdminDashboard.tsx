"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  name: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  message: string | null;
  createdAt: string;
};

type Pack = {
  id: string;
  name: string;
  description: string;
  price: string;
  includes: string[];
  featured: boolean;
  order: number;
};

type Photo = {
  id: string;
  url: string;
  caption: string | null;
  eventType: string;
  order: number;
};

const eventLabels: Record<string, string> = {
  MARIAGE: "Mariage",
  FIANCAILLES: "Fiançailles",
  HENNA: "Henné",
  NAISSANCE: "Naissance",
  AUTRE: "Autre",
};

export default function AdminDashboard({
  initialBookings,
  initialPacks,
  initialPhotos,
}: {
  initialBookings: Booking[];
  initialPacks: Pack[];
  initialPhotos: Photo[];
}) {
  const [tab, setTab] = useState<"bookings" | "packs" | "gallery">("bookings");
  const [bookings] = useState(initialBookings);
  const [packs, setPacks] = useState(initialPacks);
  const [photos, setPhotos] = useState(initialPhotos);
  const router = useRouter();

  const [packForm, setPackForm] = useState({
    name: "",
    description: "",
    price: "",
    includes: "",
    featured: false,
  });
  const [savingPack, setSavingPack] = useState(false);

  async function handleAddPack(e: React.FormEvent) {
    e.preventDefault();
    setSavingPack(true);

    const res = await fetch("/api/packs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: packForm.name,
        description: packForm.description,
        price: packForm.price,
        includes: packForm.includes.split("\n").filter(Boolean),
        featured: packForm.featured,
        order: packs.length,
      }),
    });

    const newPack = await res.json();
    setPacks((prev) => [...prev, newPack]);
    setPackForm({ name: "", description: "", price: "", includes: "", featured: false });
    setSavingPack(false);
  }

  async function handleDeletePack(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cette offre ?")) return;
    await fetch(`/api/packs/${id}`, { method: "DELETE" });
    setPacks((prev) => prev.filter((p) => p.id !== id));
  }

  const [photoForm, setPhotoForm] = useState({ caption: "", eventType: "MARIAGE" });
  const [uploading, setUploading] = useState(false);

  async function handleUploadPhoto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fileInput = e.currentTarget.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
    const { url } = await uploadRes.json();

    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        caption: photoForm.caption,
        eventType: photoForm.eventType,
        order: photos.length,
      }),
    });

    const newPhoto = await res.json();
    setPhotos((prev) => [...prev, newPhoto]);
    setPhotoForm({ caption: "", eventType: "MARIAGE" });
    fileInput.value = "";
    setUploading(false);
  }

  async function handleDeletePhoto(id: string) {
    if (!confirm("Voulez-vous vraiment supprimer cette photo ?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  const inputClass =
    "w-full rounded-lg border border-gold/30 bg-onyx px-4 py-3 text-sm text-ivory outline-none focus:border-gold";

  return (
    <div className="min-h-screen px-6 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Espace privé</p>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-gold-light">
              Bonjour Imane 👋
            </h1>
            <p className="mt-1 text-sm text-ivory/50">
              Gérez ici vos offres, vos photos et vos demandes de réservation.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-gold/30 px-5 py-2 text-sm text-ivory/70 transition-colors hover:border-gold hover:text-gold-light"
          >
            Se déconnecter
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: "Nouvelles demandes", value: bookings.length },
            { label: "Offres publiées", value: packs.length },
            { label: "Photos en ligne", value: photos.length },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-gold/20 bg-charcoal p-6 text-center">
              <p className="font-[family-name:var(--font-display)] text-3xl text-gold-light">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-ivory/50">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2 border-b border-gold/20">
          {[
            { key: "bookings", label: `Demandes de réservation (${bookings.length})` },
            { key: "packs", label: `Mes offres (${packs.length})` },
            { key: "gallery", label: `Mes photos (${photos.length})` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className={`px-4 py-3 text-sm transition-colors ${
                tab === t.key
                  ? "border-b-2 border-gold text-gold-light"
                  : "text-ivory/50 hover:text-ivory"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "bookings" && (
          <div className="mt-8">
            <p className="mb-6 text-sm text-ivory/50">
              Voici les demandes envoyées par vos clients depuis le site. Contactez-les directement au numéro affiché.
            </p>
            {bookings.length === 0 ? (
              <p className="rounded-xl border border-gold/10 bg-charcoal p-6 text-center text-ivory/50">
                Aucune demande pour le moment. Elles apparaîtront ici automatiquement.
              </p>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="rounded-xl border border-gold/20 bg-charcoal p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium text-gold-light">{b.name}</p>
                      <span className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">
                        {eventLabels[b.eventType] ?? b.eventType}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-ivory/70">
                      📞 {b.phone} · 👥 {b.guests} invités · 📅{" "}
                      {new Date(b.eventDate).toLocaleDateString("fr-FR")}
                    </p>
                    {b.message && <p className="mt-2 text-sm text-ivory/50">💬 {b.message}</p>}
                    <p className="mt-2 text-xs text-ivory/30">
                      Reçu le {new Date(b.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "packs" && (
          <div className="mt-8">
            <p className="mb-6 text-sm text-ivory/50">
              Ajoutez ici les formules que vous proposez, avec leur prix. Elles s&apos;affichent automatiquement sur la page &quot;Packs &amp; Prix&quot; du site.
            </p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <form onSubmit={handleAddPack} className="space-y-4 rounded-2xl border border-gold/20 bg-charcoal p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-gold-light">Ajouter une nouvelle offre</h3>

                <div>
                  <label className="mb-1 block text-xs text-ivory/50">Nom de l&apos;offre</label>
                  <input required placeholder="Exemple : Pack Mariage Or" value={packForm.name}
                    onChange={(e) => setPackForm({ ...packForm, name: e.target.value })} className={inputClass} />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-ivory/50">Courte description</label>
                  <textarea required placeholder="Décrivez cette offre en une ou deux phrases" rows={2} value={packForm.description}
                    onChange={(e) => setPackForm({ ...packForm, description: e.target.value })} className={inputClass} />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-ivory/50">Prix à afficher</label>
                  <input required placeholder="Exemple : 5000 DH" value={packForm.price}
                    onChange={(e) => setPackForm({ ...packForm, price: e.target.value })} className={inputClass} />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-ivory/50">Ce qui est inclus (un élément par ligne)</label>
                  <textarea placeholder={"Exemple :\nBuffet complet\nDécoration florale\nService sur place"} rows={4} value={packForm.includes}
                    onChange={(e) => setPackForm({ ...packForm, includes: e.target.value })} className={inputClass} />
                </div>

                <label className="flex items-center gap-2 text-sm text-ivory/70">
                  <input type="checkbox" checked={packForm.featured}
                    onChange={(e) => setPackForm({ ...packForm, featured: e.target.checked })} />
                  Mettre en avant cette offre (badge &quot;Populaire&quot;)
                </label>

                <button type="submit" disabled={savingPack}
                  className="w-full rounded-full bg-gold py-3 text-sm font-medium text-onyx transition-colors hover:bg-gold-light disabled:opacity-60">
                  {savingPack ? "Ajout en cours..." : "Publier cette offre"}
                </button>
              </form>

              <div className="space-y-4 lg:col-span-2">
                {packs.length === 0 ? (
                  <p className="rounded-xl border border-gold/10 bg-onyx p-6 text-center text-ivory/50">
                    Vous n&apos;avez pas encore d&apos;offre publiée. Utilisez le formulaire pour en ajouter une.
                  </p>
                ) : (
                  packs.map((p) => (
                    <div key={p.id} className="flex items-start justify-between rounded-xl border border-gold/20 bg-charcoal p-5">
                      <div>
                        <p className="font-medium text-gold-light">{p.name} {p.featured && "⭐"}</p>
                        <p className="mt-1 text-sm text-ivory/60">{p.description}</p>
                        <p className="mt-1 text-sm text-ivory">{p.price}</p>
                      </div>
                      <button onClick={() => handleDeletePack(p.id)}
                        className="rounded-full border border-burgundy/50 px-3 py-1 text-xs text-burgundy hover:bg-burgundy hover:text-ivory">
                        Supprimer
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "gallery" && (
          <div className="mt-8">
            <p className="mb-6 text-sm text-ivory/50">
              Ajoutez ici des photos de vos réalisations. Elles s&apos;affichent automatiquement sur la page &quot;Galerie&quot; du site.
            </p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <form onSubmit={handleUploadPhoto} className="space-y-4 rounded-2xl border border-gold/20 bg-charcoal p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-gold-light">Ajouter une photo</h3>

                <div>
                  <label className="mb-1 block text-xs text-ivory/50">Choisissez une photo depuis votre téléphone ou ordinateur</label>
                  <input required type="file" name="file" accept="image/*" className={inputClass} />
                </div>

                <div>
                  <label className="mb-1 block text-xs text-ivory/50">Type d&apos;événement</label>
                  <select value={photoForm.eventType}
                    onChange={(e) => setPhotoForm({ ...photoForm, eventType: e.target.value })} className={inputClass}>
                    {Object.entries(eventLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs text-ivory/50">Légende (optionnel)</label>
                  <input placeholder="Exemple : Mariage à Témara, juin 2026" value={photoForm.caption}
                    onChange={(e) => setPhotoForm({ ...photoForm, caption: e.target.value })} className={inputClass} />
                </div>

                <button type="submit" disabled={uploading}
                  className="w-full rounded-full bg-gold py-3 text-sm font-medium text-onyx transition-colors hover:bg-gold-light disabled:opacity-60">
                  {uploading ? "Envoi en cours..." : "Publier cette photo"}
                </button>
              </form>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-2">
                {photos.length === 0 ? (
                  <p className="col-span-full rounded-xl border border-gold/10 bg-onyx p-6 text-center text-ivory/50">
                    Vous n&apos;avez pas encore ajouté de photo.
                  </p>
                ) : (
                  photos.map((p) => (
                    <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl border border-gold/20">
                      <img src={p.url} alt={p.caption || ""} className="h-full w-full object-cover" />
                      <button onClick={() => handleDeletePhoto(p.id)}
                        className="absolute right-2 top-2 rounded-full bg-burgundy/90 px-2 py-1 text-xs text-ivory opacity-0 transition-opacity group-hover:opacity-100">
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}