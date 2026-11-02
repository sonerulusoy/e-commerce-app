import type { Prisma } from "@prisma/client";

// Explicit allowlist for user records that can cross the server/client boundary.
export const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  createdAt: true,
  updatedAt: true,
  role: true,
} satisfies Prisma.UserSelect;

export type PublicUser = Prisma.UserGetPayload<{
  select: typeof publicUserSelect;
}>;
