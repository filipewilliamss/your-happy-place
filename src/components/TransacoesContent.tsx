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
  Check,
  Circle, 
  Bell,
  Clock,
  Pencil,
  Home, 
  Briefcase, 
  ShoppingBag, 
  Car, 
  Utensils, 
  HeartPulse,
  Gamepad2,
  GraduationCap,
  MoreHorizontal,
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
  const { 
    transactions, 
    togglePaid, 
    deleteTransaction, 
    openEditTransaction,
    openTransactionModal,
    metrics, 
    selectedMonth, 
    selectedYear, 
    setSelectedMonth,
    transactionFilter: filterType,
    setTransactionFilter: setFilterType,
    formatMasked,
  } = useFinance();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const isOverdue = (dateStr: string, isPaid: boolean): boolean => {
    if (isPaid) return false;
    const parts = dateStr.split("/");
    if (parts.length !== 3) return false;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const txDate = new Date(year, month, day, 23, 59, 59);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return txDate < today;
  };

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
            <div className="text-sm font-bold text-slate-800 truncate">{formatMasked(metrics.saldoAtual)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
            <ArrowUpCircle className="h-5 w-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400 font-medium">Receitas</div>
            <div className="text-sm font-bold text-green-600 truncate">{formatMasked(metrics.receitas)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0">
            <ArrowDownCircle className="h-5 w-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400 font-medium">Despesas</div>
            <div className="text-sm font-bold text-red-500 truncate">{formatMasked(metrics.despesas)}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white shrink-0">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="truncate">
            <div className="text-xs text-slate-400 font-medium">Balanço</div>
            <div className="text-sm font-bold text-slate-800 truncate">{formatMasked(metrics.balanco)}</div>
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
            filteredTransactions.map((tx) => {
              const overdue = isOverdue(tx.date, tx.paid);
              return (
                <div 
                  key={tx.id} 
                  className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-slate-50/80 transition-colors gap-2 sm:gap-4"
                >
                  <div className="flex items-center space-x-2.5 sm:space-x-4 min-w-0 flex-1">
                    {/* Status Toggle Button - Green & White check if paid, Red bell if overdue, Red circle if pending */}
                    <button 
                      onClick={() => togglePaid(tx.id)}
                      className={`h-7 w-7 rounded-full flex items-center justify-center shadow-xs transition-all cursor-pointer shrink-0 active:scale-90 ${
                        tx.paid
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white ring-2 ring-emerald-100"
                          : overdue
                          ? "bg-red-600 hover:bg-red-700 text-white animate-pulse ring-2 ring-red-200"
                          : "bg-red-500 hover:bg-red-600 text-white ring-2 ring-red-100"
                      }`}
                      title={
                        tx.paid
                          ? "Pago (Clique para desmarcar)"
                          : overdue
                          ? "Vencido! Clique para marcar como pago"
                          : "Pendente (Clique para marcar como pago)"
                      }
                    >
                      {tx.paid ? (
                        <Check className="h-4 w-4 stroke-[3] text-white" />
                      ) : overdue ? (
                        <Bell className="h-3.5 w-3.5 fill-white text-white" />
                      ) : (
                        <Circle className="h-3.5 w-3.5 fill-white text-white" />
                      )}
                    </button>

                    <div className="text-[11px] sm:text-xs text-slate-400 font-medium w-16 sm:w-20 shrink-0">
                      {tx.date}
                    </div>

                    {/* Category Badge Icon */}
                    <div className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl ${tx.categoryColor} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                      {tx.category === "Alimentação" && <Utensils className="h-4 w-4" />}
                      {tx.category === "Salário" && <Briefcase className="h-4 w-4" />}
                      {tx.category === "Casa" && <Home className="h-4 w-4" />}
                      {tx.category === "Transporte" && <Car className="h-4 w-4" />}
                      {tx.category === "Saúde" && <HeartPulse className="h-4 w-4" />}
                      {tx.category === "Lazer" && <Gamepad2 className="h-4 w-4" />}
                      {tx.category === "Educação" && <GraduationCap className="h-4 w-4" />}
                      {tx.category === "Compras" && <ShoppingBag className="h-4 w-4" />}
                      {(!["Alimentação", "Salário", "Casa", "Transporte", "Saúde", "Lazer", "Educação", "Compras"].includes(tx.category)) && <MoreHorizontal className="h-4 w-4" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{tx.desc}</span>
                        {tx.installments && (
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded shrink-0">
                            {tx.installments.current}/{tx.installments.total}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                        <span className="font-medium">{tx.category}</span>
                        <span>•</span>
                        <span>{tx.account}</span>
                        <span>•</span>
                        {tx.paid ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                            <Check className="h-2.5 w-2.5 stroke-[3]" /> Pago
                          </span>
                        ) : overdue ? (
                          <span className="text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 animate-pulse">
                            <Bell className="h-2.5 w-2.5 fill-red-700" /> Vencido
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                            Pendente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Amount and Action buttons: Marcar como pago, Editar, Excluir */}
                  <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
                    <div className="text-right">
                      <span className={`text-xs sm:text-base font-bold ${tx.isExpense ? "text-red-500" : "text-green-600"}`}>
                        {formatMasked("R$ " + tx.amount)}
                      </span>
                      {tx.ignoreTransaction && (
                        <span className="block text-[9px] text-slate-400 font-medium">Ignorado</span>
                      )}
                    </div>

                    {/* Actions cluster */}
                    <div className="flex items-center space-x-0.5 sm:space-x-1 pl-1.5 sm:pl-2 border-l border-slate-100">
                      {/* Botão Marcar como pago / alternar */}
                      <button 
                        onClick={() => togglePaid(tx.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          tx.paid 
                            ? "text-emerald-600 hover:bg-emerald-50" 
                            : overdue
                            ? "text-red-600 hover:bg-red-50"
                            : "text-red-500 hover:bg-red-50"
                        }`}
                        title={tx.paid ? "Desmarcar pagamento" : "Marcar como pago"}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>

                      {/* Botão Editar */}
                      <button 
                        onClick={() => openEditTransaction(tx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Editar transação"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      {/* Botão Excluir */}
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Excluir transação"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
