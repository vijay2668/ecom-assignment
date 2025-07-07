"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartProvider } from "@/contexts/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Suspense>
          <Header />
          {children}
          <Footer />
        </Suspense>
      </CartProvider>
    </QueryClientProvider>
  );
}
