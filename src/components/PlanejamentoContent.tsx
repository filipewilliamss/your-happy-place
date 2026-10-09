import { useState } from "react";
import { 
  ChevronDown, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  MoreVertical, 
  ArrowUp, 
  ArrowDown, 
  Scale, 
  PiggyBank,
  CheckCircle,
  Plus
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export function PlanejamentoContent() {
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [plannedBudget, setPlannedBudget] = useState("");
  const [categoryName, setCategoryName] = useState("Alimentação");
  
  const [planningActive, setPlanningActive] = useState(false);
  const [currentPlannedExpenses, setCurrentPlannedExpenses] = useState("0,00");
  const [plannedIncomes] = useState("10.300,00");

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plannedBudget.trim()) return;

    setCurrentPlannedExpenses(plannedBudget);
    setPlanningActive(true);
    setIsPlanningModalOpen(false);
  };

  const copyPreviousMonth = () => {
    setCurrentPlannedExpenses("8.500,00");
    setPlanningActive(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-colors">
            <span>Planejamento Mensal</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <button 
            className="text-slate-400 hover:text-blue-600 transition-colors p-1"
            title="Ajuda sobre planejamento"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </div>

        {/* Month Navigator */}
        <div className="flex items-center space-x-3">
          <button className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="border border-blue-200 bg-white px-4 py-1.5 rounded-full text-xs font-bold text-blue-600 shadow-xs">
            Outubro 2026
          </div>
          <button className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Right Tools & User Profile */}
        <div className="flex items-center space-x-3">
          <button 
            className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            title="Buscar"
          >
            <Search className="h-4 w-4" />
          </button>
          <button 
            className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            title="Mais opções"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              F
            </div>
            <span className="text-sm font-medium text-slate-700">Filipe Soares</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Grid: Center Card & Right Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Center Main Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center text-center min-h-[440px]">
            {/* Binoculars / Goal Planning Illustration */}
            <div className="mb-6">
              <svg width="180" height="140" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Stair bars in Blue Palette */}
                <rect x="40" y="100" width="22" height="40" rx="4" fill="#93C5FD" />
                <rect x="70" y="80" width="22" height="60" rx="4" fill="#3B82F6" />
                <rect x="100" y="60" width="22" height="80" rx="4" fill="#1D4ED8" />
                
                {/* Character */}
                <circle cx="120" cy="30" r="10" fill="#1E293B" />
                <path d="M128 32C138 32 142 26 142 26" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
                <path d="M110 40H130L126 75H114L110 40Z" fill="#10B981" />
                <path d="M114 75L108 105" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                <path d="M126 75L132 105" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>

            <p className="text-slate-600 font-medium text-sm mb-6 max-w-sm">
              {planningActive 
                ? `Planejamento ativo para este mês: R$ ${currentPlannedExpenses} definidos.`
                : "Nenhum orçamento definido para este mês."}
            </p>

            <button 
              onClick={() => setIsPlanningModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm hover:shadow-md mb-4"
            >
              Definir novo planejamento
            </button>

            <button 
              onClick={copyPreviousMonth}
              className="text-blue-600 hover:text-blue-800 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              Copiar planejamento do mês anterior
            </button>
          </div>
        </div>

        {/* Right Summary Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Receitas do mês
              </span>
              <p className="text-lg font-bold text-slate-900">R$ {plannedIncomes}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <ArrowUp className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Gastos planejados
              </span>
              <p className="text-lg font-bold text-slate-900">R$ {currentPlannedExpenses}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <ArrowDown className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Balanço planejado
              </span>
              <p className="text-lg font-bold text-slate-900">R$ 1.800,00</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Scale className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Economia planejada
              </span>
              <p className="text-lg font-bold text-slate-900">17.48%</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <PiggyBank className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Definir Novo Planejamento */}
      <Dialog open={isPlanningModalOpen} onOpenChange={setIsPlanningModalOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-slate-800">Definir planejamento</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveBudget} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Categoria</label>
              <select 
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="Todas as Categorias">Todas as Categorias (Geral)</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Casa">Casa</option>
                <option value="Transporte">Transporte</option>
                <option value="Educação">Educação</option>
                <option value="Lazer">Lazer</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Meta máxima de gastos</label>
              <input 
                type="text"
                placeholder="Ex: R$ 5.000,00"
                value={plannedBudget}
                onChange={(e) => setPlannedBudget(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => setIsPlanningModalOpen(false)}
                className="px-5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
              >
                Salvar Planejamento
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
