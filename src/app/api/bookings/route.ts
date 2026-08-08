import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const booking = await prisma.booking.create({
    data: {
      name: body.name,
      phone: body.phone,
      eventType: body.eventType,
      eventDate: new Date(body.eventDate),
      guests: parseInt(body.guests, 10),
      message: body.message || null,
    },
  });

  return NextResponse.json(booking, { status: 201 });
}

export async function GET() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(bookings);
}