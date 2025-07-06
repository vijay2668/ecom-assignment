"use client";
import { MainContent } from "@/components/MainContent";
import { Sidebar } from "@/components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-full mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Sidebar />
          </div>
          {/* Main Content */}
          <MainContent />
        </div>
      </div>
    </QueryClientProvider>
  );
}
