import { useState } from "react";
import { 
  Home, 
  Landmark, 
  ArrowRightLeft, 
  CreditCard, 
  Flag, 
  PieChart, 
  MoreHorizontal, 
  Settings, 
  HelpCircle,
  Plus,
  Wallet,
  TrendingDown,
  TrendingUp,
  RefreshCcw
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TransactionModals } from "./TransactionModals";

export function AppSidebar() {
  const [modalOpen, setModalOpen] = useState<"despesa" | "receita" | "cartao" | "transferencia" | null>(null);

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-white border-r border-slate-200 flex flex-col justify-between z-10">
      <div>
        {/* Logo */}
        <div className="flex items-center p-6 mb-2">
          <Wallet className="h-8 w-8 text-blue-600 mr-3" />
          <span className="text-2xl font-bold text-blue-600">FinanceApp</span>
        </div>

        {/* Action Button */}
        <div className="px-6 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 flex items-center justify-center font-medium transition-colors shadow-sm">
                <Plus className="h-5 w-5 mr-2" />
                Novo
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-52 p-2 bg-white rounded-xl shadow-lg border-slate-100">
              <DropdownMenuItem className="py-3 cursor-pointer rounded-lg hover:bg-slate-50" onClick={() => setModalOpen("despesa")}>
                <TrendingDown className="h-4 w-4 mr-3 text-red-500" />
                <span className="text-slate-700 font-medium">Despesa</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer rounded-lg hover:bg-slate-50" onClick={() => setModalOpen("receita")}>
                <TrendingUp className="h-4 w-4 mr-3 text-green-500" />
                <span className="text-slate-700 font-medium">Receita</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer rounded-lg hover:bg-slate-50" onClick={() => setModalOpen("cartao")}>
                <CreditCard className="h-4 w-4 mr-3 text-teal-600" />
                <span className="text-slate-700 font-medium">Despesa cartão</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 cursor-pointer rounded-lg hover:bg-slate-50" onClick={() => setModalOpen("transferencia")}>
                <RefreshCcw className="h-4 w-4 mr-3 text-blue-500" />
                <span className="text-slate-700 font-medium">Transferência</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1">
          <NavItem icon={<Home className="h-5 w-5" />} label="Dashboard" active />
          <NavItem icon={<Landmark className="h-5 w-5" />} label="Contas" />
          <NavItem icon={<ArrowRightLeft className="h-5 w-5" />} label="Transações" />
          <NavItem icon={<CreditCard className="h-5 w-5" />} label="Cartões de crédito" />
          <NavItem icon={<Flag className="h-5 w-5" />} label="Planejamento" />
          <NavItem icon={<PieChart className="h-5 w-5" />} label="Relatórios" />
          <NavItem icon={<MoreHorizontal className="h-5 w-5" />} label="Mais opções" />
          <NavItem icon={<Settings className="h-5 w-5" />} label="Configurações" />
        </nav>
      </div>

      {/* Footer Nav */}
      <div className="p-3 mb-4">
        <NavItem icon={<HelpCircle className="h-5 w-5" />} label="Central de Ajuda" />
        <div className="text-center text-xs text-slate-400 mt-4">
          web-2.174.0
        </div>
      </div>

      {/* Modals rendered here */}
      <TransactionModals modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </aside>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? "text-blue-600 bg-blue-50" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </a>
  );
}
