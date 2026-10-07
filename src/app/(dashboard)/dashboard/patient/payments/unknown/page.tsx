import type { Metadata } from "next";
import PaymentResult from "@/components/modules/patient/payment-result";

export const metadata: Metadata = {
  title: "Payment Status | Lifeline Dispatch",
};

export default function PaymentUnknownPage() {
  return <PaymentResult status="unknown" />;
}
