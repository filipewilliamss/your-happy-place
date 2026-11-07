import { useState } from "react";
import { 
  Plus, 
  MoreVertical, 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { MonthPicker } from "./MonthPicker";

import { useFinance } from "../context/FinanceContext";

export function CartoesContent() {
  const { cards, addCard } = useFinance();
  const [activeTab, setActiveTab] = useState<"abertas" | "fechadas">("fechadas");
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [limit, setLimit] = useState("");
  const [closingDay, setClosingDay] = useState("9");
  const [brand, setBrand] = useState("VISA");

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) return;

    const numLimit = parseFloat(limit.replace(/\D/g, "")) || 5000;
    addCard({
      brand,
      name: cardName,
      invoiceStatus: "Fatura zerada",
      totalInvoice: "0,00",
      dueDate: `${closingDay} de outubro de 2026`,
      usedAmount: 0,
      totalLimit: numLimit,
    });
    setCardName("");
    setLimit("");
    setIsNewCardModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Cartões de crédito</h1>

        <div className="flex items-center space-x-3">
          <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab("abertas")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "abertas"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Faturas abertas
            </button>
            <button
              onClick={() => setActiveTab("fechadas")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "fechadas"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Faturas fechadas
            </button>
          </div>

          <button 
            onClick={() => setIsNewCardModalOpen(true)}
            className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 shadow-sm transition-colors"
            title="Novo cartão"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button 
            className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
            title="Mais opções"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          <MonthPicker />

          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              F
            </div>
            <span className="text-sm font-medium text-slate-700">Filipe Soares</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Grid: Cards & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Cards */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Novo Cartão Button Card */}
            <div 
              onClick={() => setIsNewCardModalOpen(true)}
              className="bg-white rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-md min-h-[220px] group"
            >
              <div className="h-12 w-12 rounded-full border-2 border-blue-600 flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-50 transition-colors">
                <Plus className="h-6 w-6" />
              </div>
              <span className="font-semibold text-blue-600 text-sm">Novo cartão de crédito</span>
            </div>

            {/* Existing Cards */}
            {cards.map((card) => {
              const percentage = Math.round((card.usedAmount / card.totalLimit) * 100);
              return (
                <div 
                  key={card.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-black italic text-blue-800 text-base">{card.brand}</span>
                        <span className="font-semibold text-slate-800 text-sm">{card.name}</span>
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-xs text-slate-500 mb-1">{card.invoiceStatus}</div>
                    
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs text-slate-500">Total fatura</span>
                      <span className="text-sm font-bold text-red-500">R$ {card.totalInvoice}</span>
                    </div>

                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-xs text-slate-500">Vence hoje</span>
                      <span className="text-xs font-medium text-slate-700">{card.dueDate}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 mb-2">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>R$ {card.usedAmount.toLocaleString("pt-BR")},00 de R$ {card.totalLimit.toLocaleString("pt-BR")},00</span>
                        <span>{percentage}%</span>
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-500 font-medium">
                      Limite Disponível R$ {(card.totalLimit - card.usedAmount).toLocaleString("pt-BR")},00
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-center mt-3">
                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wide transition-colors">
                      Fatura Zerada
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section: Summary Side Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Sua próxima fatura vence em
              </span>
              <p className="text-base font-bold text-slate-900">
                {cards.length > 0 ? cards[0].dueDate : "Nenhum cartão cadastrado"}
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Limite Disponível
              </span>
              <p className="text-lg font-bold text-slate-900">
                R$ {cards.reduce((acc, c) => acc + (c.totalLimit - c.usedAmount), 0).toLocaleString("pt-BR")},00
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm shrink-0">
              <DollarSign className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Valor total
              </span>
              <p className="text-lg font-bold text-slate-900">
                R$ {cards.reduce((acc, c) => acc + c.usedAmount, 0).toLocaleString("pt-BR")},00
              </p>
            </div>
            <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-white shadow-sm shrink-0">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Novo Cartão de Crédito */}
      <Dialog open={isNewCardModalOpen} onOpenChange={setIsNewCardModalOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white rounded-2xl p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-semibold text-slate-800">Novo cartão de crédito</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateCard} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Nome do cartão</label>
              <input 
                type="text"
                placeholder="Ex: Nubank Ultravioleta, C6 Black..."
                value={cardName}
                onChange={(e) => setAccountName ? setCardName(e.target.value) : setCardName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Bandeira</label>
              <select 
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
              >
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
                <option value="ELO">ELO</option>
                <option value="AMEX">AMERICAN EXPRESS</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Limite total</label>
              <input 
                type="text"
                placeholder="R$ 5.000,00"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1">Dia de vencimento da fatura</label>
              <input 
                type="number"
                min="1"
                max="31"
                value={closingDay}
                onChange={(e) => setClosingDay(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => setIsNewCardModalOpen(false)}
                className="px-5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
              >
                Salvar Cartão
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
