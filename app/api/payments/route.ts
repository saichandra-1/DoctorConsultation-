// app/api/payments/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/lib/auth";

export async function POST(req: Request) {
    const prisma = new PrismaClient();
  try {
    console.log("-------------REACHED API ROUTES OF PAYMENTS--------------------------------")
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { appointmentId, paymentMethod, amount } = await req.json();


    if (!appointmentId || !paymentMethod || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }


    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        appointmentId,
        patientId: session.user.id,
        amount,
        method:paymentMethod,
        status: "PENDING",
      },
    });

    // Update appointment status
    await prisma.appointment.update({
      
      where: { id: appointmentId },
      data: { status: "CONFIRMED" },
    });

    // Generate invoice URL (you'll need to implement this based on your needs)
    const invoiceUrl = `/invoice/${payment.id}`;

    // Update payment with invoice URL
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: { 
        invoiceUrl,
        status: "COMPLETED"
      },
    });

    return NextResponse.json({
      success: true,
      payment: updatedPayment,
      invoiceUrl,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}