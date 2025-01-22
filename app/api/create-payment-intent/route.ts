import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import getCurrentUser from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  // En yakın tam sayıya yuvarla
  return totalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;

  console.log("Request Body:", body); // Ekleyin

  // Yuvarlanmış total değerini 100 ile çarp
  const total = calculateOrderAmount(items) * 100;

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  try {
    if (payment_intent_id) {
      console.log("Retrieving existing payment intent:", payment_intent_id);
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );

      if (current_intent) {
        console.log("Updating payment intent:", payment_intent_id);
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          {
            amount: total,
          }
        );

        console.log(
          "Retrieving existing order with paymentIntentId:",
          payment_intent_id
        );
        const existing_order = await prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        });

        if (existing_order) {
          // Hata döndür, sipariş zaten var
          return NextResponse.json(
            { error: "This payment intent has already been processed." },
            { status: 400 }
          );
        } else {
          // Sipariş yoksa yeni sipariş oluştur
          console.log("Creating new order with existing payment intent");
          orderData.paymentIntentId = payment_intent_id; // payment_intent_id'yi tekrar ekleyin
          const new_order = await prisma.order.create({
            data: orderData,
          });
          return NextResponse.json({
            paymentIntent: updated_intent,
            order: new_order,
          });
        }
      } else {
        return NextResponse.json(
          { error: "Payment intent not found" },
          { status: 404 }
        );
      }
    } else {
      console.log("Creating new payment intent");
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      orderData.paymentIntentId = paymentIntent.id;

      console.log("Creating new order");
      const new_order = await prisma.order.create({
        data: orderData,
      });

      console.log("New order:", new_order);

      return NextResponse.json({
        paymentIntent: paymentIntent, // paymentIntent'i doğrudan döndürün
        order: new_order,
      });
    }
  } catch (error: any) {
    console.error("Error object:", error);
    console.error("Error stack:", error.stack);
    console.error("Error in payment processing", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}