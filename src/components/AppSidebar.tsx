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
  Wallet
} from "lucide-react";

export function AppSidebar() {
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
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 flex items-center justify-center font-medium transition-colors shadow-sm">
            <Plus className="h-5 w-5 mr-2" />
            Novo
          </button>
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
