"use client";

import { useState } from "react";

const eventTypes = [
  { value: "MARIAGE", label: "Mariage" },
  { value: "FIANCAILLES", label: "Fiançailles" },
  { value: "HENNA", label: "Henné" },
  { value: "NAISSANCE", label: "Naissance" },
  { value: "AUTRE", label: "Autre" },
];

export default function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "MARIAGE",
    eventDate: "",
    guests: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de la réservation", err);
    }

    const eventLabel =
      eventTypes.find((t) => t.value === form.eventType)?.label ?? form.eventType;

    const messageLines = [
      "Bonjour Perla Luxury Events,",
      `Je souhaite réserver pour : ${eventLabel}`,
      `Nom : ${form.name}`,
      `Téléphone : ${form.phone}`,
      `Date souhaitée : ${form.eventDate}`,
      `Nombre d'invités : ${form.guests}`,
    ];
    if (form.message) {
      messageLines.push(`Message : ${form.message}`);
    }

    const waText = encodeURIComponent(messageLines.join("\n"));
    const waUrl = "https://wa.me/212632604084?text=" + waText;

    setStatus("done");
    window.open(waUrl, "_blank");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-16 max-w-xl space-y-6 rounded-2xl border border-gold/20 bg-charcoal p-8"
    >
      <div>
        <label className="mb-2 block text-sm text-ivory/70">Nom complet</label>
        <input
          required
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="w-full rounded-lg border border-gold/30 bg-onyx px-4 py-3 text-ivory outline-none focus:border-gold"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-ivory/70">Téléphone</label>
        <input
          required
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="w-full rounded-lg border border-gold/30 bg-onyx px-4 py-3 text-ivory outline-none focus:border-gold"
          placeholder="06 XX XX XX XX"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-ivory/70">Type d&apos;événement</label>
        <select
          value={form.eventType}
          onChange={(e) => updateField("eventType", e.target.value)}
          className="w-full rounded-lg border border-gold/30 bg-onyx px-4 py-3 text-ivory outline-none focus:border-gold"
        >
          {eventTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-ivory/70">Date souhaitée</label>
        <input
          required
          type="date"
          value={form.eventDate}
          onChange={(e) => updateField("eventDate", e.target.value)}
          className="w-full rounded-lg border border-gold/30 bg-onyx px-4 py-3 text-ivory outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-ivory/70">Nombre d&apos;invités</label>
        <input
          required
          type="number"
          min="1"
          value={form.guests}
          onChange={(e) => updateField("guests", e.target.value)}
          className="w-full rounded-lg border border-gold/30 bg-onyx px-4 py-3 text-ivory outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-ivory/70">Message (optionnel)</label>
        <textarea
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-gold/30 bg-onyx px-4 py-3 text-ivory outline-none focus:border-gold"
          placeholder="Précisions sur votre événement..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-gold py-3 font-medium text-onyx transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {status === "loading" ? "Envoi en cours..." : "Réserver via WhatsApp"}
      </button>

      {status === "done" && (
        <p className="text-center text-sm text-gold-light">
          Votre demande a été enregistrée. Une fenêtre WhatsApp s&apos;est ouverte.
        </p>
      )}
    </form>
  );
}