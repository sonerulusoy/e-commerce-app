// ../actions/getProducts.ts
import prisma from "@/libs/prismadb";

export interface IProductParams {
  page: number;
  pageSize: number;
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
  try {
    const { page = 1, pageSize = 80, category, searchTerm } = params; 
    const searchString = searchTerm || "";

    const query: any = {
      OR: [
        {
          name: {
            contains: searchString,
            mode: "insensitive",
          },
        },
        {
          author: {
            contains: searchString,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchString,
            mode: "insensitive",
          },
        },
      ],
    };

    if (category) {
      query.category = category;
    }

    // Sayfalama için skip ve take değerlerini hesapla
    const skip = (page - 1) * pageSize;

    const products = await prisma.product.findMany({
      where: query,
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
      skip: skip,
      take: pageSize,
      orderBy: {
        // createdAt: "desc", // Veya istediğiniz başka bir sıralama kriteri
      }
    });

    // Toplam ürün sayısını al
    const totalCount = await prisma.product.count({ where: query });

    return {products, totalCount}; // Ürünleri ve toplam sayıyı döndür
  } catch (error: any) {
    throw new Error(error);
  }
}