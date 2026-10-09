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
import { AiFinancialAssistant } from "../components/AiFinancialAssistant";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { activeTab, setActiveTab } = useFinance();
  const [modalOpen, setModalOpen] = useState<"despesa" | "receita" | "cartao" | "transferencia" | null>(null);

  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 font-sans relative">
      <AppSidebar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
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
      </main>

      {/* Floating AI Financial Assistant with Voice & Text recognition */}
      <AiFinancialAssistant />
    </div>
  );
}
