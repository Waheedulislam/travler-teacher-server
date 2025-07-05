// services/stripeService.ts
import Stripe from "stripe";
import config from "../../config";
const stripe = new Stripe(config.stripe_secret_key!);

interface CreateSessionProps {
  teacherName: string;
  price: number;
  teacherId: string;
}

const createStripeSession = async ({
  teacherName,
  price,
  teacherId,
}: CreateSessionProps) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd", // USD currency
          product_data: {
            name: `Book a tour with ${teacherName}`,
          },
          unit_amount: price * 100, // Stripe takes price in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${config.client_url}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.client_url}/teacher/${teacherId}`,
  });

  return session;
};

const fetchSessionDetails = async (sessionId: string) => {
  // Expand payment_intent and customer details
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent", "customer"],
  });

  return session;
};

export const PaymentService = {
  createStripeSession,
  fetchSessionDetails,
};
