"use client";

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps {
  cartProduct: CartProductType;
  product: any; // Replace with actual Product type when it's defined
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
}) => {
  return (
    <div
      className="
  grid
grid-cols-6
 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]"
    >
      

      {/* Seçilen resmin gösterimi */}
      <div className="col-span-5 relative aspect-square">
        <Image
          src={cartProduct.image}
          alt={cartProduct.name}
          fill
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized // Disable optimization
          priority
        />
      </div>
    </div>
  );
};

export default ProductImage;
