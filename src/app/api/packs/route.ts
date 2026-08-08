import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const packs = await prisma.pack.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(packs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const pack = await prisma.pack.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      includes: body.includes,
      featured: body.featured ?? false,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(pack, { status: 201 });
}