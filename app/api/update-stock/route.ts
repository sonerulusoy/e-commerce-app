// /api/update-stock/route.ts
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";

export async function POST(request: Request) {
  const body = await request.json();
  const products: CartProductType[] = body;

  if (!products || products.length === 0) {
    return NextResponse.json(
      { error: "No products provided" },
      { status: 400 }
    );
  }

  try {
    for (const product of products) {
      await prisma.product.update({
        where: { id: product.id },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    }

    return NextResponse.json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}