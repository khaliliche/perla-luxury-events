"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/packs", label: "Packs & Prix" },
  { href: "/reservation", label: "Réservation" },
  { href: "/galerie", label: "Galerie" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 w-full bg-onyx/80 backdrop-blur-md border-b border-gold/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Perla Luxury Events" width={48} height={48} className="rounded-full" />
          <span className="font-[family-name:var(--font-display)] text-lg text-gold-light">
            Perla <span className="italic font-[family-name:var(--font-script)]">Luxury Events</span>
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-body)] text-sm tracking-wide text-ivory/80 transition-colors hover:text-gold-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="text-gold md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-gold/20 bg-onyx px-6 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-ivory/80 hover:text-gold-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}