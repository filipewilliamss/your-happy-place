import { 
  ChevronDown, 
  ChevronRight,
  Landmark, 
  ArrowUp, 
  ArrowDown, 
  CreditCard, 
  ArrowRight, 
  Flag,
  LayoutTemplate,
  Eye,
  EyeOff,
  Plus
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFinance } from "../context/FinanceContext";
import { MonthPicker } from "./MonthPicker";

export function DashboardContent() {
  const { 
    transactions,
    metrics, 
    navigateTo, 
    accounts, 
    cards, 
    hideBalance, 
    toggleHideBalance, 
    formatMasked 
  } = useFinance();

  const pendingExpenses = transactions.filter((t) => t.isExpense && !t.paid);
  const pendingExpensesTotal = pendingExpenses.reduce((sum, t) => sum + t.rawAmount, 0);

  const pendingIncomes = transactions.filter((t) => !t.isExpense && !t.paid);
  const pendingIncomesTotal = pendingIncomes.reduce((sum, t) => sum + t.rawAmount, 0);

  const cardExpenses = transactions.filter((t) => t.account.includes("Cartão") && t.isExpense);
  const cardExpensesTotal = cardExpenses.reduce((sum, t) => sum + t.rawAmount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* MOBILE DASHBOARD VIEW (Matching Reference Images 1 & 2) */}
      <div className="md:hidden space-y-6">
        {/* Main Balance */}
        <div className="flex flex-col items-center justify-center text-center pt-2 pb-2">
          <span className="text-xs font-medium text-slate-500 mb-1">Saldo atual em contas</span>
          <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatMasked(metrics.saldoAtual)}
          </div>
          <button 
            onClick={toggleHideBalance}
            className="mt-1.5 text-slate-400 hover:text-slate-600 p-1 rounded-full transition-colors"
            title={hideBalance ? "Mostrar saldos" : "Ocultar saldos"}
          >
            {hideBalance ? <EyeOff className="h-4 w-4 text-blue-600" /> : <Eye className="h-4 w-4" />}
          </button>

          {/* Receitas e Despesas Pills */}
          <div className="grid grid-cols-2 gap-3 w-full mt-4">
            <div 
              onClick={() => navigateTo("transacoes", { transactionFilter: "receitas" })}
              className="flex items-center space-x-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs cursor-pointer active:scale-98 transition-transform"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <ArrowUp className="h-4 w-4" />
              </div>
              <div className="text-left overflow-hidden">
                <span className="text-[10px] text-slate-400 block font-medium">Receitas</span>
                <span className="text-xs font-bold text-emerald-600 truncate block">
                  {formatMasked(metrics.receitas)}
                </span>
              </div>
            </div>

            <div 
              onClick={() => navigateTo("transacoes", { transactionFilter: "despesas" })}
              className="flex items-center space-x-2.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs cursor-pointer active:scale-98 transition-transform"
            >
              <div className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
                <ArrowDown className="h-4 w-4" />
              </div>
              <div className="text-left overflow-hidden">
                <span className="text-[10px] text-slate-400 block font-medium">Despesas</span>
                <span className="text-xs font-bold text-red-600 truncate block">
                  {formatMasked(metrics.despesas)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pendências e alertas */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-700">Pendências e alertas</h2>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => navigateTo("transacoes", { transactionFilter: "despesas" })}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer active:scale-98 transition-transform"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <ArrowDown className="h-3.5 w-3.5" />
                </div>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pendingExpenses.length}
                </span>
              </div>
              <span className="text-xs text-slate-500 block mb-0.5">Despesas pendentes</span>
              <span className="text-sm font-bold text-red-600">
                {formatMasked("R$ " + pendingExpensesTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}
              </span>
            </div>

            <div 
              onClick={() => navigateTo("transacoes", { transactionFilter: "receitas" })}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs cursor-pointer active:scale-98 transition-transform"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center">
                  <ArrowUp className="h-3.5 w-3.5" />
                </div>
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {pendingIncomes.length}
                </span>
              </div>
              <span className="text-xs text-slate-500 block mb-0.5">Receitas pendentes</span>
              <span className="text-sm font-bold text-emerald-600">
                {formatMasked("R$ " + pendingIncomesTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}
              </span>
            </div>
          </div>
        </div>

        {/* Contas */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-700">Contas</h2>
            <button 
              onClick={() => navigateTo("contas")}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Ver todas
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
            {accounts.length === 0 ? (
              <div className="text-center py-4">
                <Landmark className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">Nenhuma conta cadastrada</p>
                <button 
                  onClick={() => navigateTo("contas")}
                  className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  + Nova conta
                </button>
              </div>
            ) : (
              accounts.slice(0, 3).map((acc) => (
                <div key={acc.id} className="flex justify-between items-center py-1.5 border-b border-slate-50 last:border-none">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: acc.color }}>
                      <Landmark className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">{acc.name}</span>
                      <span className={`text-xs font-semibold ${acc.isNegative ? "text-red-500" : "text-emerald-600"}`}>
                        {formatMasked(acc.currentBalance)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigateTo("contas")}
                    className="text-blue-600 p-1 hover:bg-blue-50 rounded-full"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs font-bold text-slate-800">
              <span>Total</span>
              <span>{formatMasked(metrics.saldoAtual)}</span>
            </div>
          </div>
        </div>

        {/* Cartões de crédito */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-700">Cartões de crédito</h2>
            <button 
              onClick={() => navigateTo("cartoes")}
              className="text-xs font-semibold text-teal-600 hover:underline"
            >
              Ver todos
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-3">
            <div className="flex space-x-2 border-b border-slate-100 pb-2">
              <button className="text-xs font-bold px-3 py-1 bg-teal-600 text-white rounded-full">
                Faturas abertas
              </button>
              <button className="text-xs font-medium px-3 py-1 text-slate-500">
                Faturas fechadas
              </button>
            </div>

            {cards.length === 0 ? (
              <div className="text-center py-4">
                <CreditCard className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 mb-3">Nenhum cartão cadastrado</p>
                <button 
                  onClick={() => navigateTo("cartoes")}
                  className="text-xs font-bold text-teal-700 bg-teal-50 px-4 py-2 rounded-full hover:bg-teal-100 transition-colors"
                >
                  + Novo cartão
                </button>
              </div>
            ) : (
              cards.slice(0, 2).map((c) => (
                <div key={c.id} className="flex justify-between items-center py-2 border-b border-slate-50">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{c.name}</span>
                    <span className="text-[10px] text-slate-400">Fecha em {c.dueDate}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800">{formatMasked(c.totalInvoice)}</span>
                </div>
              ))
            )}

            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs font-bold text-slate-800">
              <span>Total</span>
              <span>{formatMasked("R$ 0,00")}</span>
            </div>
          </div>
        </div>

        {/* Despesas por categoria */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-700">Despesas por categoria</h2>
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="h-52 flex flex-col items-center justify-center relative">
              <DonutChart value={formatMasked(metrics.despesas)} color="#0ea5e9" />
            </div>
            <div className="text-center mt-3">
              <button 
                onClick={() => navigateTo("transacoes", { transactionFilter: "despesas" })}
                className="text-xs font-bold text-blue-600 uppercase hover:underline"
              >
                Ver Mais Detalhes
              </button>
            </div>
          </div>
        </div>

        {/* Planejamento mensal CTA */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
          <Flag className="h-7 w-7 text-blue-600" />
          <p className="text-slate-800 font-bold text-sm">
            Planejamento do Mês
          </p>
          <p className="text-slate-500 text-xs">
            Defina metas para cada categoria e assuma o controle do seu dinheiro.
          </p>
          <button 
            onClick={() => navigateTo("planejamento")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            Definir Planejamento
          </button>
        </div>
      </div>

      {/* DESKTOP DASHBOARD VIEW */}
      <div className="hidden md:block space-y-6">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          
          <div className="flex items-center space-x-6">
            <MonthPicker />

            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-white font-semibold">
                F
              </div>
              <span className="text-sm font-medium text-slate-700">Filipe Soares</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <KpiCard 
            icon={<Landmark className="h-6 w-6 text-white" />} 
            iconBg="bg-blue-500"
            title="Saldo atual" 
            value={formatMasked(metrics.saldoAtual)}
            onClick={() => navigateTo("contas")}
          />
          <KpiCard 
            icon={<ArrowUp className="h-6 w-6 text-white" />} 
            iconBg="bg-green-500"
            title="Receitas" 
            value={formatMasked(metrics.receitas)}
            onClick={() => navigateTo("transacoes", { transactionFilter: "receitas" })}
          />
          <KpiCard 
            icon={<ArrowDown className="h-6 w-6 text-white" />} 
            iconBg="bg-red-500"
            title="Despesas" 
            value={formatMasked(metrics.despesas)}
            onClick={() => navigateTo("transacoes", { transactionFilter: "despesas" })}
          />
          <KpiCard 
            icon={<CreditCard className="h-6 w-6 text-white" />} 
            iconBg="bg-teal-600"
            title="Cartão de crédito" 
            value={formatMasked("R$ " + cardExpensesTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}
            onClick={() => navigateTo("cartoes")}
          />
        </div>

      <div className="mb-6">
        <button 
          onClick={() => navigateTo("relatorios")}
          className="text-sm font-medium text-blue-600 flex items-center hover:text-blue-700 hover:underline group cursor-pointer focus:outline-none"
        >
          Meu Desempenho
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Row 1: Donut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Despesas por categoria">
          <div className="h-64 flex flex-col items-center justify-center relative">
            <DonutChart value={metrics.despesas} color="#0ea5e9" />
          </div>
          <div className="text-center mt-2">
            <button 
              onClick={() => navigateTo("transacoes", { transactionFilter: "despesas" })}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 uppercase cursor-pointer"
            >
              Ver Mais
            </button>
          </div>
        </ChartCard>
        
        <ChartCard title="Receitas por categoria">
          <div className="h-64 flex flex-col items-center justify-center relative">
            <DonutChart value={metrics.receitas} color="#0ea5e9" />
          </div>
          <div className="text-center mt-2">
            <button 
              onClick={() => navigateTo("transacoes", { transactionFilter: "receitas" })}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 uppercase cursor-pointer"
            >
              Ver Mais
            </button>
          </div>
        </ChartCard>
      </div>

      {/* Row 2: Balanço and Cartões */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Balanço mensal">
          <div className="flex h-56 items-center">
            <div className="w-1/3 flex justify-center items-end space-x-2 h-32">
              <div 
                className="w-4 bg-green-500 rounded-t-sm transition-all"
                style={{ height: metrics.totalReceitasNum > 0 ? "100%" : "4px" }}
              ></div>
              <div 
                className="w-4 bg-red-500 rounded-t-sm transition-all"
                style={{ height: metrics.totalDespesasNum > 0 ? "100%" : "4px" }}
              ></div>
            </div>
            <div className="w-2/3 flex flex-col justify-center space-y-4 px-4">
               <div className="flex justify-between text-sm">
                 <span className="text-slate-600 font-medium">Receitas</span>
                 <span className="text-green-600 font-semibold">{metrics.receitas}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-slate-600 font-medium">Despesas</span>
                 <span className="text-red-500 font-semibold">{metrics.despesas}</span>
               </div>
               <div className="h-px bg-slate-200 w-full my-1"></div>
               <div className="flex justify-between text-sm">
                 <span className="text-slate-800 font-semibold">Balanço</span>
                 <span className="text-slate-800 font-semibold">{metrics.balanco}</span>
               </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <button 
              onClick={() => navigateTo("relatorios")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 uppercase cursor-pointer"
            >
              Ver Mais
            </button>
          </div>
        </ChartCard>

        <ChartCard title="Cartões de crédito">
          <div className="flex space-x-2 border-b border-slate-100 pb-2 mb-4">
            <button className="text-xs font-medium px-3 py-1 text-slate-500">Faturas abertas</button>
            <button className="text-xs font-semibold px-3 py-1 bg-teal-700 text-white rounded-full">Faturas fechadas</button>
          </div>
          
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CreditCard className="h-10 w-10 text-slate-300 mb-2" />
            <p className="text-xs text-slate-500 font-medium mb-1">Nenhum cartão com fatura aberta</p>
            <span className="text-[11px] text-slate-400">Limite total disponível: R$ 0,00</span>
          </div>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
            <span className="text-sm font-bold text-slate-800">TOTAL</span>
            <span className="text-sm font-bold text-slate-800">R$ 0,00</span>
          </div>

          <div className="text-center mt-4">
            <button 
              onClick={() => navigateTo("cartoes")}
              className="text-xs font-semibold text-teal-700 hover:text-teal-800 uppercase cursor-pointer"
            >
              Ver Mais
            </button>
          </div>
        </ChartCard>
      </div>

      {/* Row 3: Planejamento */}
      <div className="mb-12">
        <h2 className="text-lg font-semibold text-slate-600 mb-4">Planejamento mensal</h2>
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
          <Flag className="h-8 w-8 text-slate-400 mb-4" />
          <p className="text-slate-800 font-medium max-w-sm mb-2">
            Opa! Você ainda não possui um planejamento definido para este mês.
          </p>
          <p className="text-slate-500 text-sm mb-6">
            Melhore seu controle financeiro agora!
          </p>
          <button 
            onClick={() => navigateTo("planejamento")}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            Definir meu planejamento
          </button>
        </div>
      </div>

      {/* Bottom Layout Management */}
      <div 
        onClick={() => navigateTo("configuracoes")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigateTo("configuracoes");
          }
        }}
        className="flex flex-col items-center justify-center pb-20 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors group select-none"
      >
        <LayoutTemplate className="h-8 w-8 mb-2 group-hover:scale-105 transition-transform" />
        <span className="text-xs font-semibold uppercase tracking-wider group-hover:underline">Gerenciar Tela Inicial</span>
      </div>
      </div>
    </div>
  );
}

// Subcomponents

function KpiCard({ 
  icon, 
  iconBg, 
  title, 
  value, 
  onClick 
}: { 
  icon: React.ReactNode; 
  iconBg: string; 
  title: string; 
  value: string; 
  onClick?: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] group focus:outline-none focus:ring-2 focus:ring-blue-500/20 select-none"
    >
      <div className="flex items-center space-x-4">
        <div className={`h-12 w-12 rounded-full ${iconBg} flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-sm`}>
          {icon}
        </div>
        <div>
          <h3 className="text-slate-500 text-sm font-medium group-hover:text-slate-700 transition-colors">{title}</h3>
          <p className="text-slate-800 font-bold text-lg">{value}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200" />
    </div>
  );
}

function ChartCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-600 mb-4">{title}</h2>
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        {children}
      </div>
    </div>
  );
}

function DonutChart({ value, color }: { value: string, color: string }) {
  const isZero = value === "R$ 0,00" || value === "R$ 0";
  const data = isZero
    ? [{ name: 'Empty', value: 100, color: '#e2e8f0' }]
    : [
        { name: 'Main', value: 85, color: color },
        { name: 'Other1', value: 10, color: '#64748b' },
        { name: 'Other2', value: 5, color: '#a855f7' },
      ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={isZero ? 0 : 2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-lg font-bold text-slate-800">{value}</span>
        <span className="text-xs text-slate-400">Total</span>
      </div>
    </div>
  );
}
