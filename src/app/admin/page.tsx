"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Mot de passe incorrect.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-gold/20 bg-charcoal p-8"
      >
        <h1 className="text-center font-[family-name:var(--font-display)] text-2xl text-gold-light">
          Espace Admin
        </h1>
        <p className="mt-2 text-center text-sm text-ivory/50">
          Perla Luxury Events
        </p>

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="mt-8 w-full rounded-lg border border-gold/30 bg-onyx px-4 py-3 text-ivory outline-none focus:border-gold"
        />

        {error && <p className="mt-3 text-sm text-burgundy">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-gold py-3 font-medium text-onyx transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}