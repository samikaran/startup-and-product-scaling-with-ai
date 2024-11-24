import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(features);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    );
  }
}
