"use client";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const CART_ITEMS_LOCAL_STORAGE_KEY = "ECommerceCartItems";
const PAYMENT_INTENT_LOCAL_STORAGE_KEY = "ECommercePaymentIntent";

// localStorage işlemleri için yardımcı fonksiyonlar
const getCartItemsFromLocalStorage = (): CartProductType[] | null => {
  if (typeof window !== 'undefined') {
    const cartItems = localStorage.getItem(CART_ITEMS_LOCAL_STORAGE_KEY);
    return cartItems ? JSON.parse(cartItems) : null;
  }
  return null
};

const getPaymentIntentFromLocalStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    const paymentIntent = localStorage.getItem(PAYMENT_INTENT_LOCAL_STORAGE_KEY);
    return paymentIntent ? JSON.parse(paymentIntent) : null;
  }
  return null;
};

const setCartItemsToLocalStorage = (cartItems: CartProductType[] | null) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(CART_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  }
};

const setPaymentIntentToLocalStorage = (paymentIntent: string | null) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PAYMENT_INTENT_LOCAL_STORAGE_KEY, JSON.stringify(paymentIntent));
  }
};

export const CartContextProvider = ({ children }: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  // Sepet öğelerini ve ödeme niyetini localStorage'dan yükle
  useEffect(() => {
    const cartItems = getCartItemsFromLocalStorage();
    const eCommercePaymentIntent = getPaymentIntentFromLocalStorage();

    if (cartItems) {
      setCartProducts(cartItems);
    }

    if (eCommercePaymentIntent) {
      setPaymentIntent(eCommercePaymentIntent);
    }
  }, []);

  // Sepet toplamlarını güncelle
  useEffect(() => {
    if (!cartProducts) {
      setCartTotalQty(0);
      setCartTotalAmount(0);
      return;
    }

    const { total, qty } = cartProducts.reduce(
      (acc, item) => {
        const itemTotal = item.price * item.quantity;
        acc.total += itemTotal;
        acc.qty += item.quantity;
        return acc;
      },
      { total: 0, qty: 0 }
    );

    setCartTotalQty(qty);
    setCartTotalAmount(total);
  }, [cartProducts]);

  // Sepete ürün ekleme
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart: CartProductType[];

      if (!prev) {
        updatedCart = [product];
      } else {
        const existingProductIndex = prev.findIndex(
          (item) => item.id === product.id
        );

        if (existingProductIndex !== -1) {
          const updatedProduct = {
            ...prev[existingProductIndex],
            quantity: prev[existingProductIndex].quantity + product.quantity,
          };

          if (updatedProduct.quantity > product.stock) {
            toast.error("Not enough stock available for this quantity.");
            return prev;
          }

          updatedCart = [
            ...prev.slice(0, existingProductIndex),
            updatedProduct,
            ...prev.slice(existingProductIndex + 1),
          ];
        } else {
          if (product.quantity > product.stock) {
            toast.error("Not enough stock available for this quantity.");
            return prev;
          }
          updatedCart = [...prev, product];
        }
      }

      setCartItemsToLocalStorage(updatedCart);
      toast.success("Product added to cart!");
      return updatedCart;
    });
  }, []);

  // Sepetten ürün silme
  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      setCartProducts((prev) => {
        if (!prev) return null;

        const filteredProducts = prev.filter((item) => item.id !== product.id);

        setCartItemsToLocalStorage(filteredProducts);
        toast.success("Product removed from cart");
        return filteredProducts;
      });
    },
    []
  );

  // Sepetteki ürün miktarını artırma
  const handleCartQtyIncrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      if (!prev) return null;

      const existingProductIndex = prev.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex === -1) return prev;

      const updatedProduct = {
        ...prev[existingProductIndex],
        quantity: prev[existingProductIndex].quantity + 1,
      };

      if (updatedProduct.quantity > product.stock) {
        toast.error("Max stock quantity reached");
        return prev;
      }

      const updatedCart = [
        ...prev.slice(0, existingProductIndex),
        updatedProduct,
        ...prev.slice(existingProductIndex + 1),
      ];

      setCartItemsToLocalStorage(updatedCart);
      toast.success("Product quantity updated");
      return updatedCart;
    });
  }, []);

  // Sepetteki ürün miktarını azaltma
  const handleCartQtyDecrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      if (!prev) return null;

      const existingProductIndex = prev.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex === -1) return prev;

      const updatedProduct = {
        ...prev[existingProductIndex],
        quantity: prev[existingProductIndex].quantity - 1,
      };

      if (updatedProduct.quantity < 1) {
        toast.error("Min quantity reached");
        return prev;
      }

      const updatedCart = [
        ...prev.slice(0, existingProductIndex),
        updatedProduct,
        ...prev.slice(existingProductIndex + 1),
      ];

      setCartItemsToLocalStorage(updatedCart);
      toast.success("Product quantity updated");
      return updatedCart;
    });
  }, []);

  // Sepeti temizleme
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    setCartItemsToLocalStorage(null);
    toast.success("Cart cleared");
  }, []);

  // Ödeme niyetini ayarlama
  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    setPaymentIntentToLocalStorage(val);
  }, []);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};