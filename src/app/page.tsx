import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col h-full mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
