
import prisma from "@/libs/prismadb";

export default async function getContactMessages() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return messages;
  } catch (error: any) {
    console.error("Error getting contact messages:", error);
    return []; // Hata durumunda boş bir dizi döndür
  }
}