import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(photos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const photo = await prisma.galleryPhoto.create({
    data: {
      url: body.url,
      caption: body.caption || null,
      eventType: body.eventType,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(photo, { status: 201 });
}import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(photos);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const photo = await prisma.galleryPhoto.create({
    data: {
      url: body.url,
      caption: body.caption || null,
      eventType: body.eventType,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(photo, { status: 201 });
}