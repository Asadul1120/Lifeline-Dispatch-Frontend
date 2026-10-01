import type { ReactNode } from "react";
import Footer from "@/components/share/Footer";
import Header from "@/components/share/Header";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
