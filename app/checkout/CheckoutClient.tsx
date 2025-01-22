"use client";
import { useCart } from "@/hooks/useCart";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

console.log(
  "Stripe Publishable Key:",
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

stripePromise.then((stripe) => {
  console.log("Stripe instance:", stripe);
});

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [stripeLoaded, setStripeLoaded] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   if (!cartProducts || cartProducts.length === 0 || paymentIntent) {
  //     if (!cartProducts || cartProducts.length === 0) {
  //       handleSetPaymentIntent(null);
  //       setClientSecret("");
  //     }
  //     return;
  //   }

  //   if (paymentIntent) {
  //     return;
  //   }

  //   console.log("CheckoutClient useEffect triggered");
  //   console.log("cartProducts:", cartProducts);
  //   console.log("paymentIntent:", paymentIntent);
  //   setLoading(true);
  //   setError(false);

  //   fetch("/api/create-payment-intent", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       items: cartProducts,
  //       payment_intent_id: paymentIntent, // Önceki paymentIntentId'yi gönder
  //     }),
  //   })
  //     .then((res) => {
  //       console.log("Fetch Response:", res);
  //       setLoading(false);
  //       if (res.status === 401) {
  //         return router.push("/login");
  //       }

  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("Fetch Data:", data);

  //       // Sunucudan gelen yanıtta 'paymentIntent' ve 'client_secret' kontrolü
  //       if (data.paymentIntent && data.paymentIntent.client_secret) {
  //         console.log(
  //           "Client Secret from API:",
  //           data.paymentIntent.client_secret
  //         );
  //         setClientSecret(data.paymentIntent.client_secret);
  //         handleSetPaymentIntent(data.paymentIntent.id);
  //       } else {
  //         // Eğer client_secret yoksa, bir hata mesajı göster
  //         console.error("Error: client_secret not found in response");
  //         toast.error("Payment intent does not contain client secret");
  //       }
  //     })
  //     .catch((error) => {
  //       setError(true);
  //       console.error("Error:", error);
  //       toast.error("Error creating payment intent");
  //     });
  // }, [cartProducts, paymentIntent, handleSetPaymentIntent, router]);

  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0 || paymentIntent) {
      if (!cartProducts || cartProducts.length === 0) {
        handleSetPaymentIntent(null);
        setClientSecret("");
      }
      return;
    }

    // clientSecret kontrolü eklendi
    if (!clientSecret) {
      console.log("CheckoutClient useEffect triggered");
      console.log("cartProducts:", cartProducts);
      console.log("paymentIntent:", paymentIntent);
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          console.log("Fetch Response:", res);
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          console.log("Fetch Data:", data);

          if (data.paymentIntent && data.paymentIntent.client_secret) {
            console.log(
              "Client Secret from API:",
              data.paymentIntent.client_secret
            );
            setClientSecret(data.paymentIntent.client_secret);
            handleSetPaymentIntent(data.paymentIntent.id);
          } else {
            console.error("Error: client_secret not found in response");
            toast.error("Payment intent does not contain client secret");
          }
        })
        .catch((error) => {
          setError(true);
          console.error("Error:", error);
          toast.error("Error creating payment intent");
        });
    }
  }, [
    cartProducts,
    paymentIntent,
    handleSetPaymentIntent,
    router,
    clientSecret,
  ]);

  useEffect(() => {
    if (clientSecret) {
      console.log("clientSecret updated:", clientSecret);
    }
  }, [clientSecret]);

  const options: StripeElementsOptions = {
    clientSecret: clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  useEffect(() => {
    stripePromise.then(() => setStripeLoaded(true));
  }, []);

  return (
    <div className="w-full">
      {stripeLoaded && clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-rose-500">Error occurred</div>}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View your orders"
              onClick={() => router.push("/orders")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
