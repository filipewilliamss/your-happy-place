import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Wallet, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  CheckCircle2, 
  Circle, 
  Home, 
  Briefcase, 
  ShoppingBag, 
  Car, 
  Utensils, 
  CreditCard, 
  Building2, 
  Trash2, 
  Plus,
  Sparkles
} from "lucide-react";
import { useFinance } from "../context/FinanceContext";

import { MonthPicker } from "./MonthPicker";

interface TransacoesContentProps {
  onOpenNewTransaction?: () => void;
}

const MONTH_NAMES_UPPER = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];

export function TransacoesContent({ onOpenNewTransaction }: TransacoesContentProps) {
  const { transactions, togglePaid, deleteTransaction, metrics, selectedMonth, selectedYear, setSelectedMonth } = useFinance();
  const [filterType, setFilterType] = useState<"todos" | "despesas" | "receitas">("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);


  const filteredTransactions = transactions.filter((t) => {
    if (filterType === "despesas" && !t.isExpense) return false;
    if (filterType === "receitas" && t.isExpense) return false;
    if (searchQuery.trim() && !t.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-slate-800">Transações</h1>
          <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setFilterType("todos")}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                filterType === "todos"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType("despesas")}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                filterType === "despesas"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Despesas
            </button>
            <button
              onClick={() => setFilterType("receitas")}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                filterType === "receitas"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Receitas
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {showSearch ? (
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar transação..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="pl-8 pr-4 py-1.5 rounded-full border border-blue-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 shadow-sm"
              />
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          ) : (
            <button 
              onClick={() => setShowSearch(true)}
              className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
              title="Buscar"
            >
              <Search className="h-4 w-4" />
            </button>
          )}

          <button 
            className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
            title="Filtrar"
          >
            <Filter className="h-4 w-4" />
          </button>

          <MonthPicker />

          <button 
            onClick={onOpenNewTransaction}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Nova</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
            <Wallet className="h-5 w-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400 font-medium">Saldo atual</div>
            <div className="text-sm font-bold text-slate-800 truncate">{metrics.saldoAtual}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
            <ArrowUpCircle className="h-5 w-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400 font-medium">Receitas</div>
            <div className="text-sm font-bold text-green-600 truncate">{metrics.receitas}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0">
            <ArrowDownCircle className="h-5 w-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400 font-medium">Despesas</div>
            <div className="text-sm font-bold text-red-500 truncate">{metrics.despesas}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white shrink-0">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400 font-medium">Balanço</div>
            <div className="text-sm font-bold text-slate-800 truncate">{metrics.balanco}</div>
          </div>
        </div>
      </div>

      {/* Month Navigator Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 flex items-center justify-center space-x-4 shadow-sm">
        <button 
          onClick={() => setSelectedMonth((selectedMonth - 1 + 12) % 12)}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          title="Mês anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-bold text-sm tracking-wider uppercase text-blue-600">
          {MONTH_NAMES_UPPER[selectedMonth]} {selectedYear}
        </span>
        <button 
          onClick={() => setSelectedMonth((selectedMonth + 1) % 12)}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          title="Próximo mês"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Transactions Table/List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredTransactions.length === 0 ? (
            <div className="p-16 text-center text-slate-400 text-sm flex flex-col items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ArrowDownCircle className="h-6 w-6" />
              </div>
              <p className="font-semibold text-slate-600 mb-1">Nenhuma transação cadastrada</p>
              <p className="text-xs text-slate-400 max-w-sm">
                Clique no botão <strong>"+ Nova"</strong> acima ou fale com o <strong>Assistente FinAI</strong> no microfone 🎙️ para adicionar seu primeiro gasto ou receita!
              </p>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div 
                key={tx.id} 
                className="flex items-center justify-between p-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {/* Status Toggle Button */}
                  <button 
                    onClick={() => togglePaid(tx.id)}
                    className="focus:outline-none"
                    title={tx.paid ? "Marcado como pago" : "Pendente"}
                  >
                    {tx.paid ? (
                      <CheckCircle2 className={`h-5 w-5 ${tx.isExpense ? "text-red-500" : "text-green-500"}`} />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="text-xs text-slate-400 font-medium w-20">
                    {tx.date}
                  </div>

                  {/* Category Badge Icon */}
                  <div className={`h-8 w-8 rounded-full ${tx.categoryColor} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                    {tx.category === "Alimentação" && <Utensils className="h-4 w-4" />}
                    {tx.category === "Salário" && <Briefcase className="h-4 w-4" />}
                    {tx.category === "Casa" && <Home className="h-4 w-4" />}
                    {tx.category === "Transporte" && <Car className="h-4 w-4" />}
                    {tx.category === "Serviços" && <ShoppingBag className="h-4 w-4" />}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-800">{tx.desc}</div>
                    <div className="text-xs text-slate-400 flex items-center space-x-2">
                      <span className="font-medium">{tx.category}</span>
                      <span>•</span>
                      <span>{tx.account}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-bold ${tx.isExpense ? "text-red-500" : "text-green-600"}`}>
                    R$ {tx.amount}
                  </span>

                  <button 
                    onClick={() => deleteTransaction(tx.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    title="Excluir transação"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
