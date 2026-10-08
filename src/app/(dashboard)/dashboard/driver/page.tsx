import type { Metadata } from "next";

import DriverDashboard from "@/components/modules/driver/driver-dashboard";

export const metadata: Metadata = {
  title: "Driver Dashboard | Lifeline Dispatch",
  description: "Manage assigned ambulance trips with Lifeline Dispatch.",
};

export default function DriverDashboardPage() {
  return <DriverDashboard />;
}
