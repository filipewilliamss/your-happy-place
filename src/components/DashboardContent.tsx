import { 
  ChevronDown, 
  Landmark, 
  ArrowUp, 
  ArrowDown, 
  CreditCard, 
  ArrowRight,
  Flag,
  LayoutTemplate
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFinance } from "../context/FinanceContext";
import { MonthPicker } from "./MonthPicker";

export function DashboardContent() {
  const { metrics } = useFinance();

  return (
    <div className="max-w-6xl mx-auto">
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
          value={metrics.saldoAtual} 
        />
        <KpiCard 
          icon={<ArrowUp className="h-6 w-6 text-white" />} 
          iconBg="bg-green-500"
          title="Receitas" 
          value={metrics.receitas} 
        />
        <KpiCard 
          icon={<ArrowDown className="h-6 w-6 text-white" />} 
          iconBg="bg-red-500"
          title="Despesas" 
          value={metrics.despesas} 
        />
        <KpiCard 
          icon={<CreditCard className="h-6 w-6 text-white" />} 
          iconBg="bg-teal-600"
          title="Cartão de crédito" 
          value="R$ 0,00" 
        />
      </div>

      <div className="mb-6">
        <a href="#" className="text-sm font-medium text-blue-600 flex items-center hover:underline">
          Meu Desempenho
          <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>

      {/* Row 1: Donut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Despesas por categoria">
          <div className="h-64 flex flex-col items-center justify-center relative">
            <DonutChart value={metrics.despesas} color="#0ea5e9" />
          </div>
          <div className="text-center mt-2">
            <button className="text-xs font-semibold text-blue-600 uppercase">Ver Mais</button>
          </div>
        </ChartCard>
        
        <ChartCard title="Receitas por categoria">
          <div className="h-64 flex flex-col items-center justify-center relative">
            <DonutChart value={metrics.receitas} color="#0ea5e9" />
          </div>
          <div className="text-center mt-2">
            <button className="text-xs font-semibold text-blue-600 uppercase">Ver Mais</button>
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
            <button className="text-xs font-semibold text-blue-600 uppercase">Ver Mais</button>
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
            <button className="text-xs font-semibold text-teal-700 uppercase">Ver Mais</button>
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-colors">
            Definir meu planejamento
          </button>
        </div>
      </div>

      {/* Bottom Layout Management */}
      <div className="flex flex-col items-center justify-center pb-20 text-slate-400">
        <LayoutTemplate className="h-8 w-8 mb-2" />
        <span className="text-xs font-semibold uppercase tracking-wider">Gerenciar Tela Inicial</span>
      </div>
    </div>
  );
}

// Subcomponents

function KpiCard({ icon, iconBg, title, value }: { icon: React.ReactNode, iconBg: string, title: string, value: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`h-12 w-12 rounded-full ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
          <p className="text-slate-800 font-bold text-lg">{value}</p>
        </div>
      </div>
      <ChevronDown className="h-5 w-5 text-slate-300 -rotate-90" />
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
