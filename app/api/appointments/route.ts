import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/lib/auth";

const prisma = new PrismaClient(); // Single Prisma instance

export async function POST(req: Request) {
  try {
    console.log("-------------REACHED API ROUTES OF appointments--------------------------------");

  const session = await getServerSession(authOptions);

    // ✅ Safely check if session exists and user has an ID
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: No active session" },
        { status: 401 }
      );
    }

    const patientId = session.user.id; // ✅ No TypeScript error now

    const { doctorId, date, startTime, endTime } = await req.json();

    if (!doctorId || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        doctorId,
        patientId, // ✅ Now safe to use
        date: new Date(date),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: "PENDING",
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
}
