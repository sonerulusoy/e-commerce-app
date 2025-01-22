// types.ts (veya mevcut types dosyanız)
import { Product, Review, User } from "@prisma/client"

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
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