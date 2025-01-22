import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent,cartProducts } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsloading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    console.log("CheckoutForm useEffect triggered");
    console.log("Stripe:", stripe);
    console.log("clientSecret:", clientSecret);
    if (!stripe || !clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit triggered");

    if (!stripe || !elements) {
      console.log("Stripe or Elements is null");
      return;
    }

    setIsloading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          // Gerekirse ek parametreleri buradan geçebilirsiniz.
        },
      })
      .then((result) => {
        console.log("Confirm Payment Result:", result);
        if (!result.error) {
          toast.success("Checkout Success");

          // Ödeme başarılı, şimdi stokları güncelle
          updateStock(cartProducts);

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsloading(false);
      });
  };

  const updateStock = async (products: CartProductType[] | null) => {
    if (!products) return;

    try {
      const response = await fetch('/api/update-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(products),
      });

      if (!response.ok) {
        throw new Error('Failed to update stock');
      }

      console.log('Stock updated successfully');
    } catch (error) {
      console.error('Error updating stock:', error);
      toast.error('Failed to update stock');
    }
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["TR"],
        }}
      />
      <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
        label={isLoading ? "Loading..." : "Pay Now"}
        disabled={isLoading || !stripe || !elements}
        onClick={handleSubmit}
      />
    </form>
  );
};

export default CheckoutForm;
