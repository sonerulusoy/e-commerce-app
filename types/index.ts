import type { PublicUser } from "@/libs/publicUser";
// types.ts (veya mevcut types dosyanız)
import { Product, Review } from "@prisma/client"

export type SafeUser = Omit<PublicUser, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}

export type ProductWithReviewsAndUser = Product & {
  reviews: (Review & { user: SafeUser })[];
};

export type ProductData = {
  products: ProductWithReviewsAndUser[];
  totalCount: number;
};