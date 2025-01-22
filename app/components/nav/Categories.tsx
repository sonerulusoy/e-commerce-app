// Categories.tsx
"use client";

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <div className="w-full bg-white"> {/* Değişiklik 1: Arka plan rengi */}
      <Container>
        <div
          className="
            pt-3
            pb-3
            flex
            flex-row
            items-center
            justify-start
            gap-6  {/* Değişiklik 5: Boşluk Artırıldı */}
            overflow-x-auto
            scrollbar-thin
            scrollbar-thumb-gray-400
            scrollbar-track-gray-100
            px-1
          "
        >
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;