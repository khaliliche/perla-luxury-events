import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminDashboard from "@/components/AdminDashboard";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token || !verifySessionToken(token)) {
    redirect("/admin");
  }

  const [bookings, packs, photos] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.pack.findMany({ orderBy: { order: "asc" } }),
    prisma.galleryPhoto.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <AdminDashboard
      initialBookings={JSON.parse(JSON.stringify(bookings))}
      initialPacks={JSON.parse(JSON.stringify(packs))}
      initialPhotos={JSON.parse(JSON.stringify(photos))}
    />
  );
}