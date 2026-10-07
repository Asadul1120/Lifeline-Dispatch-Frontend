import type { Metadata } from "next";
import PaymentResult from "@/components/modules/patient/payment-result";

export const metadata: Metadata = {
  title: "Checkout Complete | Lifeline Dispatch",
};

export default function PaymentSuccessPage() {
  return <PaymentResult status="success" />;
}
