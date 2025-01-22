import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    const currentUser = await getCurrentUser(); // Kullanıcı bilgisini al

    const newMessage = await prisma.contactMessage.create({
      data: {
        name, // Kullanıcı giriş yapmamışsa, formdan gelen adı kullan
        email, // Kullanıcı giriş yapmamışsa, formdan gelen e-postayı kullan
        message,
        userId: currentUser?.id, // Kullanıcı giriş yapmışsa ID'sini ekle
      },
    });

    return NextResponse.json(
      { message: "Message created successfully", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { message: "Failed to create message", error },
      { status: 500 }
    );
  }
}