import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "../components/AppSidebar";
import { DashboardContent } from "../components/DashboardContent";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 font-sans">
      <AppSidebar />
      <main className="flex-1 ml-64 p-8">
        <DashboardContent />
      </main>
    </div>
  );
}
