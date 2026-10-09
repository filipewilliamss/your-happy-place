import { useState } from "react";
import { 
  Plus, 
  BarChart3, 
  MoreVertical, 
  Wallet, 
  Building2, 
  CreditCard,
  ChevronRight,
  Info,
  ChevronDown
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ContasContentProps {
  onOpenNewExpense?: () => void;
}

export function ContasContent({ onOpenNewExpense }: ContasContentProps) {
  const [isNewAccountOpen, setIsNewAccountOpen] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [accountType, setAccountType] = useState("Conta Corrente");

  // Sample accounts list that can be dynamically extended
  const [accounts, setAccounts] = useState([
    {
      id: "1",
      name: "Carteira",
      type: "wallet",
      currentBalance: "-57.695,90",
      predictedBalance: "-26.730,19",
      isNegative: true,
      color: "bg-blue-600",
    },
    {
      id: "2",
      name: "Carteira para pagar cont...",
      type: "card",
      currentBalance: "-1.113,09",
      predictedBalance: "-1.543,09",
      isNegative: true,
      color: "bg-indigo-600",
    },
    {
      id: "3",
      name: "Conta FL",
      type: "bank",
      currentBalance: "28.505,01",
      predictedBalance: "28.505,01",
      isNegative: false,
      color: "bg-blue-500",
    },
  ]);

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim()) return;

    setAccounts([
      ...accounts,
      {
        id: String(Date.now()),
        name: accountName,
        type: "bank",
        currentBalance: initialBalance || "0,00",
        predictedBalance: initialBalance || "0,00",
        isNegative: initialBalance.startsWith("-"),
        color: "bg-blue-600",
      },
    ]);
    setAccountName("");
    setInitialBalance("");
    setIsNewAccountOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Contas</h1>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsNewAccountOpen(true)}
            className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 shadow-sm transition-colors"
            title="Nova conta"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button 
            className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
            title="Relatórios de contas"
          >
            <BarChart3 className="h-5 w-5" />
          </button>
          <button 
            className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
            title="Mais opções"
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          <div className="h-6 w-px bg-slate-200 mx-2" />

          <button className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50">
            <span>outubro</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              F
            </div>
            <span className="text-sm font-medium text-slate-700">Filipe Soares</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Grid & Side Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Account Cards Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nova Conta Button Card */}
            <div 
              onClick={() => setIsNewAccountOpen(true)}
              className="bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-md min-h-[190px] group"
            >
              <div className="h-12 w-12 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-50 transition-colors">
                <Plus className="h-6 w-6" />
              </div>
              <span className="font-semibold text-blue-600 text-sm">Nova conta</span>
            </div>

            {/* Account Cards */}
            {accounts.map((acc) => (
              <div 
                key={acc.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 rounded-lg ${acc.color} flex items-center justify-center text-white shadow-sm`}>
                        {acc.type === "wallet" && <Wallet className="h-4 w-4" />}
                        {acc.type === "card" && <CreditCard className="h-4 w-4" />}
                        {acc.type === "bank" && <Building2 className="h-4 w-4" />}
                      </div>
                      <span className="font-bold text-slate-800 text-sm truncate max-w-[140px]">{acc.name}</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Saldo atual</span>
                      <span className={`font-semibold ${acc.isNegative ? "text-red-500" : "text-green-600"}`}>
                        R$ {acc.currentBalance}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 flex items-center">
                        Saldo previsto <Info className="h-3 w-3 ml-1 text-slate-400" />
                      </span>
                      <span className={`font-semibold ${acc.isNegative ? "text-red-500" : "text-green-600"}`}>
                        R$ {acc.predictedBalance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-center">
                  <button 
                    onClick={onOpenNewExpense}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide transition-colors"
                  >
                    Adicionar despesa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-2 pt-4">
            <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 text-xs">
              &lt;
            </button>
            <button className="h-8 w-8 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center text-xs shadow-sm">
              1
            </button>
            <button className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 text-xs">
              &gt;
            </button>
          </div>
        </div>

        {/* Right Section: Balance Summary Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-semibold text-slate-500 flex items-center mb-1">
                Saldo atual <ChevronRight className="h-3 w-3 ml-0.5" />
              </span>
              <p className="text-xl font-bold text-slate-900">R$ -30.303,95</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Wallet className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-semibold text-slate-500 flex items-center mb-1">
                Saldo previsto <ChevronRight className="h-3 w-3 ml-0.5" />
              </span>
              <p className="text-xl font-bold text-slate-900">R$ 231,76</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Nova Conta */}
      <Dialog open={isNewAccountOpen} onOpenChange={setIsNewAccountOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-slate-800">Nova conta</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateAccount} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Nome da conta</label>
              <input 
                type="text"
                placeholder="Ex: Nubank, Banco do Brasil..."
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Saldo inicial</label>
              <input 
                type="text"
                placeholder="R$ 0,00"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Tipo de conta</label>
              <select 
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="Conta Corrente">Conta Corrente</option>
                <option value="Poupança">Poupança</option>
                <option value="Carteira">Carteira / Dinheiro</option>
                <option value="Investimentos">Investimentos</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => setIsNewAccountOpen(false)}
                className="px-5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
              >
                Salvar Conta
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
