import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "../components/AppSidebar";
import { useFinance } from "../context/FinanceContext";
import { DashboardContent } from "../components/DashboardContent";
import { ContasContent } from "../components/ContasContent";
import { TransacoesContent } from "../components/TransacoesContent";
import { CartoesContent } from "../components/CartoesContent";
import { PlanejamentoContent } from "../components/PlanejamentoContent";
import { RelatoriosContent } from "../components/RelatoriosContent";
import { ConfiguracoesContent } from "../components/ConfiguracoesContent";
import { MaisContent } from "../components/MaisContent";
import { MobileTopHeader } from "../components/MobileTopHeader";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { TransactionModals } from "../components/TransactionModals";
import { AiFinancialAssistant } from "../components/AiFinancialAssistant";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { activeTab, setActiveTab } = useFinance();
  const [modalOpen, setModalOpen] = useState<"despesa" | "receita" | "cartao" | "transferencia" | null>(null);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-slate-50 text-slate-900 font-sans relative">
      {/* Mobile Sticky Top Header */}
      <MobileTopHeader />

      {/* Desktop Sidebar (Hidden on mobile) */}
      <AppSidebar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-28 md:pb-8 min-h-screen overflow-y-auto">
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "contas" && (
          <ContasContent onOpenNewExpense={() => setModalOpen("despesa")} />
        )}
        {activeTab === "transacoes" && (
          <TransacoesContent onOpenNewTransaction={() => setModalOpen("despesa")} />
        )}
        {activeTab === "cartoes" && <CartoesContent />}
        {activeTab === "planejamento" && <PlanejamentoContent />}
        {activeTab === "relatorios" && <RelatoriosContent />}
        {activeTab === "configuracoes" && <ConfiguracoesContent />}
        {activeTab === "mais" && <MaisContent />}
      </main>

      {/* Transaction Modals for both Mobile and Desktop */}
      <TransactionModals modalOpen={modalOpen} setModalOpen={setModalOpen} />

      {/* Mobile Bottom Navigation Bar (Hidden on desktop) */}
      <MobileBottomNav onOpenModal={setModalOpen} />

      {/* Floating AI Financial Assistant with Voice & Text recognition */}
      <AiFinancialAssistant />
    </div>
  );
}
