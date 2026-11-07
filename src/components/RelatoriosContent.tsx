import { useState } from "react";
import { 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  BarChart2, 
  Filter, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  MoreHorizontal, 
  GraduationCap, 
  FileText
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  LineChart, 
  Line 
} from "recharts";

import { MonthPicker } from "./MonthPicker";
import { useFinance } from "../context/FinanceContext";

const MONTH_NAMES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function RelatoriosContent() {
  const { transactions, metrics, selectedMonth, selectedYear, setSelectedMonth } = useFinance();
  const [chartType, setChartType] = useState<"pie" | "line" | "bar">("pie");
  const [filterCategory, setFilterCategory] = useState("Despesas por categorias");

  // Dynamic grouping by category
  const expenseTransactions = transactions.filter((t) => t.isExpense);
  const totalExpense = expenseTransactions.reduce((acc, t) => acc + t.rawAmount, 0);

  const categoryMap = new Map<string, number>();
  expenseTransactions.forEach((t) => {
    categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.rawAmount);
  });

  const categoriesData = Array.from(categoryMap.entries()).map(([name, value]) => {
    const percent = totalExpense > 0 ? `${((value / totalExpense) * 100).toFixed(1)}%` : "0%";
    return {
      name,
      value,
      percent,
      color: name === "Alimentação" ? "#f97316" : name === "Casa" ? "#0284c7" : name === "Transporte" ? "#f59e0b" : "#64748b",
      icon: Home,
    };
  });

  const barData = categoriesData.map((c) => ({ name: c.name, valor: c.value }));
  const lineData = expenseTransactions.map((t) => ({ day: t.date.slice(0, 5), total: t.rawAmount }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Relatórios</h1>

        {/* Center / Right controls */}
        <div className="flex items-center space-x-4">
          {/* Chart Type Toggle Pill */}
          <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setChartType("pie")}
              className={`p-2 rounded-full transition-all ${
                chartType === "pie"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Gráfico de Pizza/Donut"
            >
              <PieChartIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`p-2 rounded-full transition-all ${
                chartType === "line"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Gráfico de Linha"
            >
              <LineChartIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`p-2 rounded-full transition-all ${
                chartType === "bar"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Gráfico de Barras"
            >
              <BarChart2 className="h-4 w-4" />
            </button>
          </div>

          {/* Filter Dropdown & MonthPicker */}
          <div className="flex items-center space-x-2">
            <MonthPicker />

            <button className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
              <span>{filterCategory}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
            <button 
              className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
              title="Filtrar"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>

          {/* User profile */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              F
            </div>
            <span className="text-sm font-medium text-slate-700">Filipe Soares</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Report Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">
        {/* Month Navigator */}
        <div className="flex items-center justify-center space-x-4">
          <button 
            onClick={() => setSelectedMonth((selectedMonth - 1 + 12) % 12)}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Mês anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="border border-blue-200 bg-white px-5 py-1.5 rounded-full text-xs font-bold text-blue-600 shadow-xs capitalize">
            {MONTH_NAMES[selectedMonth]} {selectedYear}
          </div>
          <button 
            onClick={() => setSelectedMonth((selectedMonth + 1) % 12)}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Próximo mês"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Content depending on chartType */}
        {chartType === "pie" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Donut Chart */}
            <div className="h-80 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoriesData.length > 0 ? categoriesData : [{ name: "Vazio", value: 100, color: "#e2e8f0" }]}
                    innerRadius="65%"
                    outerRadius="88%"
                    paddingAngle={categoriesData.length > 0 ? 3 : 0}
                    dataKey="value"
                    stroke="none"
                  >
                    {(categoriesData.length > 0 ? categoriesData : [{ name: "Vazio", value: 100, color: "#e2e8f0" }]).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-800">{metrics.despesas}</span>
                <span className="text-xs text-slate-400 font-medium">Total</span>
              </div>
            </div>

            {/* Categories Breakdown List */}
            <div className="space-y-5">
              <h3 className="text-base font-bold text-slate-700 mb-4">Despesas por categorias</h3>
              {categoriesData.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  Nenhuma despesa registrada para este mês.
                </div>
              ) : (
                categoriesData.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="h-10 w-10 rounded-full flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: cat.color }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800">{cat.name}</div>
                          <div className="text-xs text-slate-400">{cat.percent}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold text-red-500">
                          R$ {cat.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-xs text-slate-400">{cat.percent}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {chartType === "bar" && (
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Bar dataKey="valor" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartType === "line" && (
          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
