// Category.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  selected?: boolean;
}

const Category: React.FC<CategoryBoxProps> = ({
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
    router.refresh();
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-row 
        items-center 
        gap-2 
        p-3 
        rounded-lg
        cursor-pointer
        transition
        hover:bg-gray-200 /* Değişiklik 6: Hover efekti */
        hover:text-gray-900 /* Değişiklik 6: Hover efekti */
        text-gray-500 /* Değişiklik 2: Metin rengi */
        text-xl /* Değişiklik 2: Metin boyutu */
        ${selected ? "bg-gray-200" : ""} /* Değişiklik 3: Arka plan rengi */
        ${selected ? "text-gray-900" : ""} /* Değişiklik 3: Metin rengi */
        ${selected ? "font-semibold" : ""} /* Değişiklik 3: Kalın yazı tipi */
      `}
    >
      <div className="text-base">
        {label}
      </div>
    </div>
  );
};

export default Category;