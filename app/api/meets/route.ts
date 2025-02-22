
import { authOptions } from "../../../app/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    const prisma = new PrismaClient();
    try{
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                error:"Unauthorized"
            },{status:401});
        }
        const meets = await prisma.appointment.findMany({where:{
            patientId:session.user.id,
        }});
        return NextResponse.json({
            data:meets
        });
    }catch(e){
        console.log(e);
        return NextResponse.json({
            error:"An error occurred"
        }, {status:500});
    }


}