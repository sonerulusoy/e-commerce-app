"use client";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { MdCheckCircle } from "react-icons/md";
import toast from "react-hot-toast";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  quantity: number;
  price: number;
  stock: number;
};

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    image: product.image,
    quantity: 1,
    price: product.price,
    stock: product.stock,
  });
  const router = useRouter();

  const [productRating, setProductRating] = useState(0);

  useEffect(() => {
    setIsProductInCart(false);
    setIsOutOfStock(false);

    if (cartProducts) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
    if (product.stock <= 0) {
      setIsOutOfStock(true);
    }
  }, [cartProducts, product]);

  useEffect(() => {
    if (product.reviews && product.reviews.length > 0) {
      const rating =
        product.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
        product.reviews.length;
      setProductRating(rating);
    }
  }, [product.reviews]);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity < product.stock) {
      setCartProduct((prev) => ({
        ...prev,
        quantity: prev.quantity + 1,
      }));
    } else {
      toast.error("Maximum stock quantity reached.");
    }
  }, [product.stock, cartProduct.quantity]);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity > 1) {
        return {
          ...prev,
          quantity: prev.quantity - 1,
        };
      }
      return prev;
    });
  }, []);

  const handleAddToCart = useCallback(() => {
    if (isOutOfStock) {
      toast.error("This product is out of stock.");
      return;
    }

    handleAddProductToCart(cartProduct);
  }, [handleAddProductToCart, cartProduct, isOutOfStock]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImage product={product} cartProduct={cartProduct} />
      <div className="flex flex-col gap-1 text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews ? product.reviews.length : 0} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">LANGUAGE:</span> {product.language}
        </div>
        <div
          className={
            isOutOfStock ? "text-rose-500" : "text-teal-400"
          }
        >
          {isOutOfStock ? "Out of stock" : "In stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-400" />
              <span>Product added to cart</span>
            </p>
            <div className="max-w-[500px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal />
            <div className="max-w-[500px]">
              <Button
                label="Add to Cart"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
