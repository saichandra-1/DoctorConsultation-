// app/api/slots/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request) {
    const prisma = new PrismaClient();
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get("id");
    const date = searchParams.get("date");


    if (!doctorId || !date) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const slots = await prisma.timeSlot.findMany({
      where: {
        doctorId,
        date: new Date(date),
        isBooked: false,
      },
      orderBy: { startTime: "asc" },
    });

    return NextResponse.json(slots);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch time slots" },
      { status: 500 }
    );
  }
}