import { useState } from "react";
import { 
  Settings, 
  HelpCircle, 
  Landmark, 
  CreditCard, 
  Target, 
  Bookmark, 
  Tag, 
  UploadCloud, 
  MessageSquare, 
  DownloadCloud, 
  ChevronRight,
  PieChart,
  Calendar,
  Sparkles,
  Info
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

export function MaisContent() {
  const { navigateTo, openAiAssistant } = useFinance();
  const [activeTab, setActiveTab] = useState<"gerenciar" | "acompanhar" | "sobre">("gerenciar");

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Mais Opções</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateTo("configuracoes")}
            className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Configurações"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            className="p-2 rounded-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            title="Ajuda"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Capsule switcher */}
      <div className="bg-slate-100 p-1 rounded-full flex space-x-1 border border-slate-200">
        <button
          onClick={() => setActiveTab("gerenciar")}
          className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === "gerenciar"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Gerenciar
        </button>
        <button
          onClick={() => setActiveTab("acompanhar")}
          className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === "acompanhar"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Acompanhar
        </button>
        <button
          onClick={() => setActiveTab("sobre")}
          className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeTab === "sobre"
              ? "bg-white text-blue-600 shadow-xs font-bold"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Sobre
        </button>
      </div>

      {/* TAB 1: GERENCIAR */}
      {activeTab === "gerenciar" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          <MenuItem 
            icon={<Landmark className="h-5 w-5 text-blue-600" />}
            title="Contas" 
            onClick={() => navigateTo("contas")} 
          />
          <MenuItem 
            icon={<CreditCard className="h-5 w-5 text-teal-600" />}
            title="Cartões de crédito" 
            onClick={() => navigateTo("cartoes")} 
          />
          <MenuItem 
            icon={<Target className="h-5 w-5 text-indigo-500" />}
            title="Objetivos" 
            onClick={() => navigateTo("planejamento")} 
          />
          <MenuItem 
            icon={<Bookmark className="h-5 w-5 text-amber-500" />}
            title="Categorias" 
            onClick={() => navigateTo("relatorios")} 
          />
          <MenuItem 
            icon={<Tag className="h-5 w-5 text-pink-500" />}
            title="Tags" 
          />
          <MenuItem 
            icon={<UploadCloud className="h-5 w-5 text-sky-500" />}
            title="Importar dados" 
          />
          <MenuItem 
            icon={<MessageSquare className="h-5 w-5 text-emerald-500" />}
            title="Importar SMS" 
          />
          <MenuItem 
            icon={<DownloadCloud className="h-5 w-5 text-purple-500" />}
            title="Exportar relatórios" 
            onClick={() => navigateTo("relatorios")} 
          />
        </div>
      )}

      {/* TAB 2: ACOMPANHAR */}
      {activeTab === "acompanhar" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          <MenuItem 
            icon={<PieChart className="h-5 w-5 text-blue-600" />}
            title="Relatórios e Gráficos" 
            onClick={() => navigateTo("relatorios")} 
          />
          <MenuItem 
            icon={<Calendar className="h-5 w-5 text-emerald-600" />}
            title="Calendário de movimentações" 
            onClick={() => navigateTo("transacoes")} 
          />
          <MenuItem 
            icon={<Sparkles className="h-5 w-5 text-purple-600" />}
            title="Assistente de Inteligência Artificial" 
            onClick={() => openAiAssistant()}
          />
        </div>
      )}

      {/* TAB 3: SOBRE */}
      {activeTab === "sobre" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden p-4 space-y-4">
          <div className="flex items-center space-x-3 pb-2">
            <Info className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-800">FinanceApp Mobile</h3>
              <p className="text-xs text-slate-500">Versão web-2.174.0</p>
            </div>
          </div>
          <div className="pt-2 text-xs text-slate-500 space-y-2">
            <p>Seu aplicativo moderno de finanças e inteligência artificial.</p>
            <p className="font-medium text-blue-600 cursor-pointer hover:underline">
              Termos de Uso e Política de Privacidade
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ 
  icon, 
  title, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  onClick?: () => void; 
}) {
  return (
    <div 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }}
      className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer transition-colors group select-none"
    >
      <div className="flex items-center space-x-3.5">
        <div className="p-1 rounded-lg transition-transform group-hover:scale-105">
          {icon}
        </div>
        <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
          {title}
        </span>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
    </div>
  );
}
