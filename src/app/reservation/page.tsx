import BookingForm from "@/components/BookingForm";

export default function ReservationPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">
          Réservation
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl text-ivory md:text-5xl">
          Réservez votre événement
        </h1>
        <p className="mt-4 text-ivory/60">
          Remplissez le formulaire ci-dessous, votre demande sera envoyée
          directement sur WhatsApp.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}