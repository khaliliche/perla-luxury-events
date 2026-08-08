import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-charcoal px-6 py-12 text-center">
      <Image
        src="/logo.png"
        alt="Perla Luxury Events"
        width={64}
        height={64}
        className="mx-auto mb-4 rounded-full"
      />
      <p className="font-[family-name:var(--font-script)] italic text-xl text-gold-light">
        Perla Luxury Events by Imane
      </p>
      <div className="flourish-divider my-4 w-40 mx-auto text-xs">✦</div>
      <p className="text-sm text-ivory/60">Témara · Rabat, Maroc</p>
      <p className="text-sm text-ivory/60">WhatsApp : 06 32 60 40 84</p>
      <p className="mt-6 text-xs text-ivory/30">
        © {new Date().getFullYear()} Perla Luxury Events. Tous droits réservés.
      </p>
    </footer>
  );
}