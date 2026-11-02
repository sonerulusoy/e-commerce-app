import { publicUserSelect } from "@/libs/publicUser";
import prisma from "@/libs/prismadb";

export default async function getUsers() {
  try {
    const users = prisma.user.findMany({ select: publicUserSelect });

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
