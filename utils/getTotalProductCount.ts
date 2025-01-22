// utils/getTotalProductCount.ts

import prisma from "@/libs/prismadb";

interface IProductParams {
  category?: string | null;
  author?: string | null;
  language?: string | null;
  searchTerm?: string | null;
}

export const getTotalProductCount = async (params: IProductParams) => {
  try {
    const { category, author, language, searchTerm } = params;
    let query: any = {};

    if (category) {
      query.category = category;
    }
    if (author) {
      query.author = author;
    }
    if (language) {
      query.language = language;
    }
    if (searchTerm) {
      query.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    const totalItems = await prisma.product.count({
      where: query,
    });

    return totalItems;
  } catch (error: any) {
    console.error("Error getting total product count:", error);
    return 0; // Hata durumunda 0 döndür
  }
};