"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const [productRating, setProductRating] = useState(0);

  // Resim URL'si, varsayılan resim kontrolü
  const defaultImage = "/noimage.jpg";
  const imageSrc =
    data.image && data.image.length > 0 ? data.image : defaultImage;

  useEffect(() => {
    if (data.reviews && data.reviews.length > 0) {
      const rating =
        data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
        data.reviews.length;
      setProductRating(rating);
    }
  }, [data]);

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1px] border-slate-200 bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 text-center text-base relative z-0 hover:z-10"
      style={{ margin: "15px" }} // Daha az boşluk
    >
      <div className="flex flex-col items-center w-full gap-3">
        {/* Resim Bölümü */}
        <div className="aspect-square overflow-hidden relative w-full rounded-md bg-gray-50 shadow-sm transition-shadow duration-300 z-10">
          <Image
            fill
            src={imageSrc}
            alt={data.name}
            className="object-contain w-full h-full transition-transform duration-700 ease-in-out hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Ürün İsmi */}
        <div className="mt-1 font-font-medium text-gray-700 truncate text-sm">
          {truncateText(data.name)}
        </div>

        {/* Rating */}
        <div className="text-xs text-gray-500">
          <div className="flex items-center justify-center">
            <Rating value={productRating} readOnly size="small" />
          </div>
          <div className="flex justify-center">
            <span className="ml-0 text-sm">
              ({data.reviews ? data.reviews.length : 0} reviews)
            </span>
          </div>
        </div>

        {/* Fiyat */}
        <div className="font-semibold text-sm text-indigo-500 mt-1">
          {formatPrice(data.price)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
