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
  // ... (diğer fonksiyon tanımları)
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
  setCartItemsToLocalStorage: (cartItems: CartProductType[] | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

// Sabitler
const CART_ITEMS_LOCAL_STORAGE_KEY = "ECommerceCartItems";
const PAYMENT_INTENT_LOCAL_STORAGE_KEY = "ECommercePaymentIntent";

// localStorage işlemleri için yardımcı fonksiyonlar
const getCartItemsFromLocalStorage = (): CartProductType[] | null => {
  const cartItems = localStorage.getItem(CART_ITEMS_LOCAL_STORAGE_KEY);
  return cartItems ? JSON.parse(cartItems) : null;
};

const getPaymentIntentFromLocalStorage = (): string | null => {
  const paymentIntent = localStorage.getItem(PAYMENT_INTENT_LOCAL_STORAGE_KEY);
  return paymentIntent ? JSON.parse(paymentIntent) : null;
};

const setPaymentIntentToLocalStorage = (paymentIntent: string | null) => {
  localStorage.setItem(PAYMENT_INTENT_LOCAL_STORAGE_KEY, JSON.stringify(paymentIntent));
};

export const CartContextProvider = ({ children }: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  // Bu fonksiyonu useCallback ile sarmalayalım
  const setCartItemsToLocalStorage = useCallback((cartItems: CartProductType[] | null) => {
    localStorage.setItem(CART_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
}, []); 

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

// LocalStorage güncellemesini useEffect içine al
const handleAddProductToCart = useCallback((product: CartProductType) => {
  setCartProducts((prev) => {
    if (!prev) {
      const updatedCart = [product];
      toast.success("Product added to cart!"); // Önce toast mesajını göster
      return updatedCart;
    }

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

      const updatedCart = [
        ...prev.slice(0, existingProductIndex),
        updatedProduct,
        ...prev.slice(existingProductIndex + 1),
      ];

      toast.success("Product quantity updated in cart!"); // Önce toast mesajını göster
      return updatedCart;
    } else {
      if (product.quantity > product.stock) {
        toast.error("Not enough stock available for this quantity.");
        return prev;
      }
      const updatedCart = [...prev, product];

      toast.success("Product added to cart!"); // Önce toast mesajını göster
      return updatedCart;
    }
  });
}, []);

const handleRemoveProductFromCart = useCallback(
  (product: CartProductType) => {
    setCartProducts((prev) => {
      if (!prev) return null;

      const filteredProducts = prev.filter((item) => item.id !== product.id);

      toast.success("Product removed from cart"); // Önce toast mesajını göster
      return filteredProducts;
    });
  },
  []
);

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
    toast.success("Product quantity updated"); // Önce toast mesajını göster
    return updatedCart;
  });
}, []);

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

    toast.success("Product quantity updated"); // Önce toast mesajını göster
    return updatedCart;
  });
}, []);

const handleClearCart = useCallback(() => {
  setCartProducts(null);
  setCartTotalQty(0);
  setCartTotalAmount(0);
  toast.success("Cart cleared"); // Önce toast mesajını göster
}, []);

  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    setPaymentIntentToLocalStorage(val);
  }, []);

  // useEffect kullanarak localStorage güncellemesini yap
  useEffect(() => {
    if (cartProducts !== null) {
      setCartItemsToLocalStorage(cartProducts);
    }
  }, [cartProducts, setCartItemsToLocalStorage]);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    handleSetPaymentIntent,
    paymentIntent,
    setCartItemsToLocalStorage
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