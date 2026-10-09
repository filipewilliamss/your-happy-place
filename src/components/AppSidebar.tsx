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

export type NavTab = "dashboard" | "contas" | "transacoes" | "cartoes" | "planejamento" | "relatorios" | "configuracoes";

interface AppSidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  modalOpen: "despesa" | "receita" | "cartao" | "transferencia" | null;
  setModalOpen: (type: "despesa" | "receita" | "cartao" | "transferencia" | null) => void;
}

export function AppSidebar({ activeTab, onSelectTab, modalOpen, setModalOpen }: AppSidebarProps) {
  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between z-10">
      <div>
        {/* Generic Logo in Blue and White */}
        <div 
          onClick={() => onSelectTab("dashboard")}
          className="flex items-center p-6 mb-2 cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white mr-3 shadow-sm group-hover:bg-blue-700 transition-colors">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-blue-600">FinanceApp</span>
        </div>

        {/* Action Button "+ Novo" with Dropdown */}
        <div className="px-6 mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 flex items-center justify-center font-medium transition-colors shadow-sm focus:outline-none">
                <Plus className="h-5 w-5 mr-2" />
                Novo
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-52 p-2 bg-white rounded-xl shadow-lg border-slate-100">
              <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg hover:bg-slate-50" onClick={() => setModalOpen("despesa")}>
                <TrendingDown className="h-4 w-4 mr-3 text-red-500" />
                <span className="text-slate-700 font-medium text-sm">Despesa</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg hover:bg-slate-50" onClick={() => setModalOpen("receita")}>
                <TrendingUp className="h-4 w-4 mr-3 text-green-500" />
                <span className="text-slate-700 font-medium text-sm">Receita</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg hover:bg-slate-50" onClick={() => setModalOpen("cartao")}>
                <CreditCard className="h-4 w-4 mr-3 text-teal-600" />
                <span className="text-slate-700 font-medium text-sm">Despesa cartão</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 cursor-pointer rounded-lg hover:bg-slate-50" onClick={() => setModalOpen("transferencia")}>
                <RefreshCcw className="h-4 w-4 mr-3 text-blue-500" />
                <span className="text-slate-700 font-medium text-sm">Transferência</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1">
          <NavItem 
            icon={<Home className="h-5 w-5" />} 
            label="Dashboard" 
            active={activeTab === "dashboard"} 
            onClick={() => onSelectTab("dashboard")} 
          />
          <NavItem 
            icon={<Landmark className="h-5 w-5" />} 
            label="Contas" 
            active={activeTab === "contas"} 
            onClick={() => onSelectTab("contas")} 
          />
          <NavItem 
            icon={<ArrowRightLeft className="h-5 w-5" />} 
            label="Transações" 
            active={activeTab === "transacoes"} 
            onClick={() => onSelectTab("transacoes")} 
          />
          <NavItem 
            icon={<CreditCard className="h-5 w-5" />} 
            label="Cartões de crédito" 
            active={activeTab === "cartoes"} 
            onClick={() => onSelectTab("cartoes")} 
          />
          <NavItem 
            icon={<Flag className="h-5 w-5" />} 
            label="Planejamento" 
            active={activeTab === "planejamento"} 
            onClick={() => onSelectTab("planejamento")} 
          />
          <NavItem 
            icon={<PieChart className="h-5 w-5" />} 
            label="Relatórios" 
            active={activeTab === "relatorios"} 
            onClick={() => onSelectTab("relatorios")} 
          />
          <NavItem 
            icon={<MoreHorizontal className="h-5 w-5" />} 
            label="Mais opções" 
          />
          <NavItem 
            icon={<Settings className="h-5 w-5" />} 
            label="Configurações" 
            active={activeTab === "configuracoes"} 
            onClick={() => onSelectTab("configuracoes")} 
          />
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

function NavItem({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
        active 
          ? "text-blue-600 bg-blue-50 font-semibold" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
}
