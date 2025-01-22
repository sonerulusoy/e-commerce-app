// /api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '0', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const category = searchParams.get('category');
  const searchTerm = searchParams.get('searchTerm');

  const searchString = searchTerm || "";

  let query: any = {
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

  try {
    const products = await prisma.product.findMany({
      skip: page * pageSize,
      take: pageSize,
      where: query,
      orderBy: {
        // createdAt: 'desc',
      },
    });

    const totalCount = await prisma.product.count({ where: query });

    return NextResponse.json({ products, totalCount });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}