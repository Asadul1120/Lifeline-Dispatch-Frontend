import type { Metadata } from "next";
import PaymentResult from "@/components/modules/patient/payment-result";

export const metadata: Metadata = {
  title: "Checkout Cancelled | Lifeline Dispatch",
};

export default function PaymentCancelPage() {
  return <PaymentResult status="cancel" />;
}
