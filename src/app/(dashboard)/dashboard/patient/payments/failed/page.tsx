import type { Metadata } from "next";
import PaymentResult from "@/components/modules/patient/payment-result";

export const metadata: Metadata = {
  title: "Payment Failed | Lifeline Dispatch",
};

export default function PaymentFailedPage() {
  return <PaymentResult status="failed" />;
}
