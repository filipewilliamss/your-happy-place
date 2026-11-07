import { useState } from "react";
import { 
  Home, 
  ArrowRightLeft, 
  Flag, 
  MoreHorizontal, 
  Plus, 
  TrendingDown, 
  TrendingUp, 
  CreditCard, 
  RefreshCcw,
  Sparkles,
  X
} from "lucide-react";
import { useFinance, NavTab } from "../context/FinanceContext";

interface MobileBottomNavProps {
  onOpenModal: (type: "despesa" | "receita" | "cartao" | "transferencia") => void;
}

export function MobileBottomNav({ onOpenModal }: MobileBottomNavProps) {
  const { activeTab, setActiveTab, openAiAssistant } = useFinance();
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  const handleSelectTab = (tab: NavTab) => {
    setQuickActionOpen(false);
    setActiveTab(tab);
  };

  const handleTriggerAction = (type: "despesa" | "receita" | "cartao" | "transferencia") => {
    setQuickActionOpen(false);
    onOpenModal(type);
  };

  return (
    <>
      {/* Quick Action Backdrop & Bottom Sheet Menu */}
      {quickActionOpen && (
        <div 
          onClick={() => setQuickActionOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden animate-in fade-in duration-150 flex flex-col justify-end"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl p-6 pb-24 shadow-2xl border-t border-slate-100 animate-in slide-in-from-bottom-6 duration-200 space-y-4"
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-bold text-slate-800 text-base">Nova Transação</h3>
              <button 
                onClick={() => setQuickActionOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Destaque Principal: Assistente IA */}
            <button
              onClick={() => {
                setQuickActionOpen(false);
                openAiAssistant();
              }}
              className="w-full flex items-center p-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md active:scale-[0.99] transition-all text-left group cursor-pointer border border-blue-500"
            >
              <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center mr-3.5 shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="block text-xs font-bold text-white uppercase tracking-wider">Assistente Financeiro IA</span>
                  <span className="text-[9px] bg-white/25 text-white px-2 py-0.5 rounded-full font-bold">Voz & Texto</span>
                </div>
                <span className="text-xs text-blue-100 font-normal">Fale por áudio ou digite para adicionar rápido</span>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleTriggerAction("despesa")}
                className="flex items-center p-3.5 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-100 transition-all text-left group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-red-500 text-white flex items-center justify-center mr-3 shadow-xs group-hover:scale-105 transition-transform">
                  <TrendingDown className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800">Despesa</span>
                  <span className="text-[10px] text-slate-500">Saída de valor</span>
                </div>
              </button>

              <button
                onClick={() => handleTriggerAction("receita")}
                className="flex items-center p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 transition-all text-left group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mr-3 shadow-xs group-hover:scale-105 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800">Receita</span>
                  <span className="text-[10px] text-slate-500">Entrada de valor</span>
                </div>
              </button>

              <button
                onClick={() => handleTriggerAction("cartao")}
                className="flex items-center p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-100 transition-all text-left group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-teal-600 text-white flex items-center justify-center mr-3 shadow-xs group-hover:scale-105 transition-transform">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800">Despesa cartão</span>
                  <span className="text-[10px] text-slate-500">Fatura de cartão</span>
                </div>
              </button>

              <button
                onClick={() => handleTriggerAction("transferencia")}
                className="flex items-center p-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-100 transition-all text-left group cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mr-3 shadow-xs group-hover:scale-105 transition-transform">
                  <RefreshCcw className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800">Transferência</span>
                  <span className="text-[10px] text-slate-500">Entre contas</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-lg select-none">
        <div className="flex items-center justify-around relative">
          {/* Tab 1: Principal */}
          <button
            onClick={() => handleSelectTab("dashboard")}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "text-blue-600 font-bold bg-blue-50/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Home className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Principal</span>
          </button>

          {/* Tab 2: Transações */}
          <button
            onClick={() => handleSelectTab("transacoes")}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === "transacoes"
                ? "text-blue-600 font-bold bg-blue-50/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <ArrowRightLeft className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Transações</span>
          </button>

          {/* Center Floating Action Button (+) */}
          <div className="flex flex-col items-center -mt-6">
            <button
              onClick={() => setQuickActionOpen(!quickActionOpen)}
              className={`h-13 w-13 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-200 border-4 border-slate-50 cursor-pointer ${
                quickActionOpen
                  ? "bg-slate-800 rotate-45 scale-95"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
              title="Novo item"
              aria-label="Adicionar nova transação"
            >
              <Plus className="h-6 w-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Tab 3: Planejamento */}
          <button
            onClick={() => handleSelectTab("planejamento")}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === "planejamento"
                ? "text-blue-600 font-bold bg-blue-50/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Flag className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Planejamento</span>
          </button>

          {/* Tab 4: Mais */}
          <button
            onClick={() => handleSelectTab("mais")}
            className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === "mais"
                ? "text-blue-600 font-bold bg-blue-50/80"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <MoreHorizontal className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Mais</span>
          </button>
        </div>
      </nav>
    </>
  );
}
