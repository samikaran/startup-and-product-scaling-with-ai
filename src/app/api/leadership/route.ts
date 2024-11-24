import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { performance: "desc" },
    });
    return NextResponse.json(teamMembers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team data" },
      { status: 500 }
    );
  }
}
