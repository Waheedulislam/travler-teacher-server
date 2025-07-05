import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    teacherId: { type: String, required: true },
    email: { type: String },
    amount: { type: Number },
    stripeSessionId: { type: String },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

export const PaymentModel = mongoose.model("Payment", paymentSchema);
