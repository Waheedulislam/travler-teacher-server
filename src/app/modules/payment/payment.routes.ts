import express from "express";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/create-checkout-session", PaymentController.createPaymentIntent);
router.get(
  "/session-details",
  PaymentController.getSessionDetails as express.RequestHandler
);

export const paymentRoutes = router;
