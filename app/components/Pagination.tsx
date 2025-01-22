"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationProps {
  totalItems: number;
  currentPage: number; // Artık sadece number
  pageSize: number; // Artık sadece number
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  pageSize,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / pageSize);

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  const onPageChange = (page: number) => {
    const newQuery = createQueryString({ page: page, pageSize: pageSize }); // pageSize'ı ekleyin
    router.push(`?${newQuery}`);
  };

  const onPageSizeChange = (newPageSize: number) => {
    const newQuery = createQueryString({ page: 1, pageSize: newPageSize }); // Sayfa boyutunu ve 1. sayfayı seç
    router.push(`?${newQuery}`);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex items-center -space-x-px text-sm">
          {/* İlk Sayfaya Git Butonu */}
          {currentPage > 2 && (
            <li>
              <button
                onClick={() => onPageChange(1)}
                className="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span>&lt;&lt;</span> {/* İlk sayfa sembolü */}
              </button>
            </li>
          )}

          {/* Previous Butonu */}
          {currentPage > 1 && (
            <li>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                &lt; {/* Önceki sayfa sembolü */}
              </button>
            </li>
          )}

          {/* Sayfa Numarası */}
          <li>
            <button
              onClick={() => onPageChange(currentPage)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              {currentPage}
            </button>
          </li>

          {/* Next Butonu */}
          {currentPage < totalPages && (
            <li>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                &gt; {/* Sonraki sayfa sembolü */}
              </button>
            </li>
          )}

          {/* Son Sayfaya Git Butonu */}
          {currentPage < totalPages - 1 && (
            <li>
              <button
                onClick={() => onPageChange(totalPages)}
                className="flex items-center justify-center px-2 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span>&gt;&gt;</span> {/* Son sayfa sembolü */}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;