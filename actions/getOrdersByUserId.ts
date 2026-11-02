import { publicUserSelect } from "@/libs/publicUser";
import prisma from "@/libs/prismadb";

export default async function getOrdersByUserId(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: publicUserSelect },
      },
      orderBy: {
        createDate: "desc",
      },
      where: {
        userId: userId
      }
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
