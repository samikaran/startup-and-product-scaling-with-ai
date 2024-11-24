import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [features, feedback, businessMetrics, teamMembers] =
      await Promise.all([
        prisma.feature.findMany(),
        prisma.feedback.findMany(),
        prisma.businessMetric.findMany(),
        prisma.teamMember.findMany(),
      ]);

    return NextResponse.json({
      features,
      feedback,
      businessMetrics,
      teamMembers,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { type, payload } = data;

    switch (type) {
      case "feature":
        const feature = await prisma.feature.create({
          data: payload,
        });
        return NextResponse.json(feature);

      case "feedback":
        const feedback = await prisma.feedback.create({
          data: payload,
        });
        return NextResponse.json(feedback);

      case "businessMetric":
        const metric = await prisma.businessMetric.create({
          data: payload,
        });
        return NextResponse.json(metric);

      case "teamMember":
        const member = await prisma.teamMember.create({
          data: payload,
        });
        return NextResponse.json(member);

      default:
        return NextResponse.json(
          { error: "Invalid data type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to create data" },
      { status: 500 }
    );
  }
}
