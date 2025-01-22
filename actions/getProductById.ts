import prisma from "@/libs/prismadb";
import { ObjectId } from "mongodb"; // ObjectId doğrulaması için ekledik

interface IParams {
  productId?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const { productId } = params;

    // productId'nin geçerli olup olmadığını kontrol et
    if (!productId || !ObjectId.isValid(productId)) {
      throw new Error("Invalid productId format");
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return product;
  } catch (error: any) {
    throw new Error(error.message || "Error fetching product");
  }
}
