// controllers/paymentController.ts
import { Request, Response } from "express";
import { PaymentService } from "./payment.services";

const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { teacherName, price, teacherId } = req.body;
    const session = await PaymentService.createStripeSession({
      teacherName,
      price,
      teacherId,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    res.status(500).json({ message: "Failed to create Stripe session" });
  }
};

const getSessionDetails = async (req: Request, res: Response) => {
  const sessionId = req.query.session_id as string;
  console.log(sessionId);
  if (!sessionId) {
    return res.status(400).json({ message: "session_id is required" });
  }

  try {
    const sessionDetails = await PaymentService.fetchSessionDetails(sessionId);
    res.json(sessionDetails);
    console.log("details:", sessionDetails);
  } catch (error) {
    console.error("Error fetching session details:", error);
    return res.status(500).json({ message: "Failed to fetch session details" });
  }
};

export const PaymentController = {
  createPaymentIntent,
  getSessionDetails,
};
