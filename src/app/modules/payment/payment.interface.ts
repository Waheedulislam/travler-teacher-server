export interface IBooking {
  teacherId: string;
  email: string;
  amount: number;
  stripeSessionId: string;
  paymentStatus: "paid" | "unpaid";
  createdAt?: Date;
  updatedAt?: Date;
}
