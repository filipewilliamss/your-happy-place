import { Eye, EyeOff, Crown } from "lucide-react";
import { useFinance } from "../context/FinanceContext";
import { MonthPicker } from "./MonthPicker";

export function MobileTopHeader() {
  const { hideBalance, toggleHideBalance, navigateTo } = useFinance();

  return (
    <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-slate-100">
      {/* User Avatar with Crown */}
      <div 
        onClick={() => navigateTo("configuracoes")}
        className="relative cursor-pointer select-none"
      >
        <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
          F
        </div>
        <div className="absolute -top-1 -right-1 bg-amber-400 text-amber-950 p-0.5 rounded-full shadow-xs">
          <Crown className="h-3 w-3 fill-amber-950 stroke-none" />
        </div>
      </div>

      {/* Center: Month Picker */}
      <div className="flex items-center">
        <MonthPicker />
      </div>

      {/* Right Actions: Eye Toggle */}
      <div className="flex items-center">
        <button
          onClick={toggleHideBalance}
          className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          title={hideBalance ? "Mostrar saldos" : "Ocultar saldos"}
          aria-label={hideBalance ? "Mostrar saldos" : "Ocultar saldos"}
        >
          {hideBalance ? <EyeOff className="h-5 w-5 text-blue-600" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}
