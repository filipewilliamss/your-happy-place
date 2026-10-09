import { useState, useRef, useEffect } from "react";
import { 
  Calculator, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Bookmark, 
  Landmark, 
  Paperclip, 
  Info, 
  ChevronRight,
  ChevronDown,
  CreditCard,
  X,
  Check,
  Home,
  Utensils,
  Car,
  DollarSign,
  HeartPulse,
  Gamepad2,
  GraduationCap,
  ShoppingBag,
  MoreHorizontal,
  Wallet,
  Sparkles,
  ArrowRightLeft
} from "lucide-react";
import { useFinance, ModalType, Transaction } from "../context/FinanceContext";

const CATEGORIES = [
  { name: "Casa", icon: Home, color: "bg-blue-500", text: "text-blue-500" },
  { name: "Alimentação", icon: Utensils, color: "bg-orange-500", text: "text-orange-500" },
  { name: "Transporte", icon: Car, color: "bg-amber-500", text: "text-amber-500" },
  { name: "Salário", icon: DollarSign, color: "bg-green-500", text: "text-green-500" },
  { name: "Saúde", icon: HeartPulse, color: "bg-rose-500", text: "text-rose-500" },
  { name: "Lazer", icon: Gamepad2, color: "bg-purple-500", text: "text-purple-500" },
  { name: "Educação", icon: GraduationCap, color: "bg-indigo-500", text: "text-indigo-500" },
  { name: "Compras", icon: ShoppingBag, color: "bg-pink-500", text: "text-pink-500" },
  { name: "Outros", icon: MoreHorizontal, color: "bg-slate-500", text: "text-slate-500" },
];

const ACCOUNTS = [
  { name: "Carteira", icon: Wallet, color: "text-slate-700" },
  { name: "Conta FL", icon: Landmark, color: "text-blue-600" },
  { name: "Cartão dia 9", icon: CreditCard, color: "text-teal-600" },
];

const CURRENCIES = ["BRL", "USD", "EUR"];

interface TransactionModalsProps {
  modalOpen?: ModalType;
  setModalOpen?: (type: ModalType) => void;
}

export function TransactionModals({ modalOpen: propModalOpen, setModalOpen: propSetModalOpen }: TransactionModalsProps) {
  const { 
    modalOpen: ctxModalOpen, 
    setModalOpen: ctxSetModalOpen,
    editingTransaction,
    setEditingTransaction,
    addTransaction,
    updateTransaction
  } = useFinance();

  const activeModal = propModalOpen !== undefined ? propModalOpen : ctxModalOpen;
  const setOpen = propSetModalOpen || ctxSetModalOpen;

  // Form states
  const [amountInput, setAmountInput] = useState<string>("");
  const [currency, setCurrency] = useState<string>("BRL");
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [isPaid, setIsPaid] = useState<boolean>(true);
  const [dateStr, setDateStr] = useState<string>("");
  const [dateMode, setDateMode] = useState<"hoje" | "ontem" | "outro">("hoje");
  const [showCustomDatePicker, setShowCustomDatePicker] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Casa");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [account, setAccount] = useState<string>("Carteira");
  const [destAccount, setDestAccount] = useState<string>("Conta FL");
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [destAccountDropdownOpen, setDestAccountDropdownOpen] = useState(false);
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [ignoreTransaction, setIgnoreTransaction] = useState<boolean>(false);
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [installments, setInstallments] = useState<number>(1);
  const [tags, setTags] = useState<string>("");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format Date to DD/MM/YYYY
  const formatBrazilianDate = (d: Date): string => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Sync state when modal opens or editingTransaction changes
  useEffect(() => {
    if (!activeModal) {
      setSuccessToast(null);
      return;
    }

    const today = new Date();
    const todayStr = formatBrazilianDate(today);

    if (editingTransaction) {
      setAmountInput(String(editingTransaction.rawAmount).replace(".", ","));
      setDescription(editingTransaction.desc);
      setCategory(editingTransaction.category);
      setAccount(editingTransaction.account);
      setDateStr(editingTransaction.date);
      setIsPaid(editingTransaction.paid);
      setNotes(editingTransaction.notes || "");
      setTags(editingTransaction.tags || "");
      setAttachmentName(editingTransaction.attachmentName || null);
      setIgnoreTransaction(editingTransaction.ignoreTransaction || false);
      setInstallments(editingTransaction.installments?.total || 1);
      setDateMode("outro");
    } else {
      // New transaction defaults
      setAmountInput("");
      setDescription("");
      setDateStr(todayStr);
      setDateMode("hoje");
      setShowCustomDatePicker(false);
      setIsPaid(true);
      setAttachmentName(null);
      setIgnoreTransaction(false);
      setShowMoreDetails(false);
      setNotes("");
      setInstallments(1);
      setTags("");

      if (activeModal === "receita") {
        setCategory("Salário");
        setAccount("Conta FL");
      } else if (activeModal === "cartao") {
        setCategory("Alimentação");
        setAccount("Cartão dia 9");
      } else if (activeModal === "transferencia") {
        setCategory("Outros");
        setAccount("Carteira");
        setDestAccount("Conta FL");
      } else {
        setCategory("Casa");
        setAccount("Carteira");
      }
    }
  }, [activeModal, editingTransaction]);

  if (!activeModal) return null;

  const isEditing = Boolean(editingTransaction);

  const handleClose = () => {
    setOpen(null);
    setEditingTransaction(null);
    setShowCustomDatePicker(false);
    setCategoryDropdownOpen(false);
    setAccountDropdownOpen(false);
    setCurrencyDropdownOpen(false);
    setSuccessToast(null);
  };

  // Date selection
  const handleSelectToday = () => {
    const today = new Date();
    setDateStr(formatBrazilianDate(today));
    setDateMode("hoje");
    setShowCustomDatePicker(false);
  };

  const handleSelectYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setDateStr(formatBrazilianDate(yesterday));
    setDateMode("ontem");
    setShowCustomDatePicker(false);
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // YYYY-MM-DD
    if (val) {
      const [y, m, d] = val.split("-");
      setDateStr(`${d}/${m}/${y}`);
      setDateMode("outro");
    }
  };

  // File Attachment
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachmentName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Colors and labels by Modal Type
  const theme = {
    despesa: {
      title: isEditing ? "Editar Despesa" : "Nova Despesa",
      colorClass: "text-red-500",
      borderClass: "border-red-500",
      switchBg: "bg-red-500",
      activeBadgeBg: "bg-red-500 text-white",
      statusLabel: "Foi paga",
      saveBtnBg: "bg-red-500 hover:bg-red-600 text-white",
    },
    receita: {
      title: isEditing ? "Editar Receita" : "Nova Receita",
      colorClass: "text-green-600",
      borderClass: "border-green-600",
      switchBg: "bg-green-500",
      activeBadgeBg: "bg-green-600 text-white",
      statusLabel: "Foi recebida",
      saveBtnBg: "bg-green-600 hover:bg-green-700 text-white",
    },
    cartao: {
      title: isEditing ? "Editar Despesa Cartão" : "Despesa Cartão",
      colorClass: "text-teal-600",
      borderClass: "border-teal-600",
      switchBg: "bg-teal-600",
      activeBadgeBg: "bg-teal-600 text-white",
      statusLabel: "Fatura paga",
      saveBtnBg: "bg-teal-600 hover:bg-teal-700 text-white",
    },
    transferencia: {
      title: isEditing ? "Editar Transferência" : "Transferência",
      colorClass: "text-blue-600",
      borderClass: "border-blue-600",
      switchBg: "bg-blue-600",
      activeBadgeBg: "bg-blue-600 text-white",
      statusLabel: "Já transferido",
      saveBtnBg: "bg-blue-600 hover:bg-blue-700 text-white",
    },
  }[activeModal];

  // Parse amount
  const parseAmountNumber = (str: string): number => {
    const clean = str.replace(/[^\d.,]/g, "").replace(",", ".");
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : val;
  };

  // Save handler
  const handleSave = (closeAfter: boolean) => {
    const rawVal = parseAmountNumber(amountInput);
    const amountVal = rawVal > 0 ? rawVal : 0;
    const finalDesc = description.trim() || (activeModal === "receita" ? "Receita avulsa" : `Gasto em ${category}`);

    const selectedCategoryObj = CATEGORIES.find((c) => c.name === category) || CATEGORIES[0];
    const categoryColor = selectedCategoryObj.color;
    const formattedAmount = amountVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const isExpense = activeModal !== "receita";

    if (isEditing && editingTransaction) {
      updateTransaction(editingTransaction.id, {
        rawAmount: amountVal,
        amount: isExpense ? `-${formattedAmount}` : formattedAmount,
        desc: finalDesc,
        category,
        categoryColor,
        account: activeModal === "transferencia" ? `${account} -> ${destAccount}` : account,
        date: dateStr,
        paid: isPaid,
        attachmentName: attachmentName || undefined,
        notes: notes || undefined,
        tags: tags || undefined,
        ignoreTransaction,
        installments: installments > 1 ? { current: 1, total: installments } : undefined,
      });
      handleClose();
      return;
    }

    // Creating new transaction(s)
    if (installments > 1 && isExpense) {
      const perInstallment = amountVal / installments;
      const formattedPerInst = perInstallment.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      for (let i = 1; i <= installments; i++) {
        // Calculate installment date
        const parts = dateStr.split("/");
        const baseDay = parseInt(parts[0] || "09", 10);
        const baseMonth = parseInt(parts[1] || "10", 10) - 1;
        const baseYear = parseInt(parts[2] || "2026", 10);
        const instDateObj = new Date(baseYear, baseMonth + (i - 1), baseDay);
        const instFormattedDate = formatBrazilianDate(instDateObj);

        addTransaction({
          date: instFormattedDate,
          desc: `${finalDesc} (${i}/${installments})`,
          category,
          categoryColor,
          account: activeModal === "transferencia" ? `${account} -> ${destAccount}` : account,
          amount: `-${formattedPerInst}`,
          rawAmount: perInstallment,
          isExpense: true,
          paid: i === 1 ? isPaid : false,
          installments: { current: i, total: installments },
          attachmentName: i === 1 ? attachmentName || undefined : undefined,
          notes: notes || undefined,
          tags: tags || undefined,
          ignoreTransaction,
        });
      }
    } else {
      addTransaction({
        date: dateStr,
        desc: finalDesc,
        category,
        categoryColor,
        account: activeModal === "transferencia" ? `${account} -> ${destAccount}` : account,
        amount: isExpense ? `-${formattedAmount}` : formattedAmount,
        rawAmount: amountVal,
        isExpense,
        paid: isPaid,
        attachmentName: attachmentName || undefined,
        notes: notes || undefined,
        tags: tags || undefined,
        ignoreTransaction,
      });
    }

    if (closeAfter) {
      handleClose();
    } else {
      // SALVAR E CRIAR NOVA
      setAmountInput("");
      setDescription("");
      setAttachmentName(null);
      setNotes("");
      setTags("");
      setSuccessToast("Transação salva! Pronto para adicionar a próxima.");
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.name === category) || CATEGORIES[0];
  const CategoryIcon = selectedCategoryObj.icon;

  const selectedAccountObj = ACCOUNTS.find((a) => a.name === account) || ACCOUNTS[0];
  const AccountIcon = selectedAccountObj.icon;

  const selectedDestAccountObj = ACCOUNTS.find((a) => a.name === destAccount) || ACCOUNTS[1];
  const DestAccountIcon = selectedDestAccountObj.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {theme.title}
          </h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="px-6 py-2 overflow-y-auto space-y-4 flex-1">
          {/* Success Banner */}
          {successToast && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center space-x-2 animate-in fade-in duration-150">
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Amount Input Row */}
          <div className={`flex items-center justify-between border-b-2 ${theme.borderClass} pb-2 pt-1 transition-colors relative`}>
            <div className="flex items-center space-x-2 flex-1">
              <Calculator className="h-5 w-5 text-slate-400 shrink-0" />
              <span className={`text-xl font-medium ${theme.colorClass}`}>R$</span>
              <input
                type="text"
                inputMode="decimal"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value)}
                placeholder="0,00"
                autoFocus={!isEditing}
                className={`w-full text-2xl font-semibold ${theme.colorClass} placeholder:text-slate-300 focus:outline-none bg-transparent`}
              />
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer select-none"
              >
                <span>{currency}</span>
                <ChevronDown className="h-3 w-3 ml-1" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 top-8 z-30 bg-white border border-slate-200 rounded-xl shadow-lg p-1 w-24">
                  {CURRENCIES.map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => {
                        setCurrency(cur);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors ${
                        currency === cur ? "text-blue-600 font-bold bg-blue-50" : "text-slate-700"
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Status Row (Foi paga / Foi recebida) */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-3 text-slate-700">
              <CheckCircle2 className="h-5 w-5 text-slate-400 shrink-0" />
              <span className="text-sm font-medium">{theme.statusLabel}</span>
            </div>

            {/* Functional Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={isPaid}
              onClick={() => setIsPaid(!isPaid)}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                isPaid ? theme.switchBg : "bg-slate-200"
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                  isPaid ? "translate-x-5.5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Date Selector Row */}
          <div className="flex items-center space-x-3 py-1">
            <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <button
                type="button"
                onClick={handleSelectToday}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  dateMode === "hoje"
                    ? theme.activeBadgeBg + " border-transparent shadow-xs"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Hoje
              </button>
              <button
                type="button"
                onClick={handleSelectYesterday}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  dateMode === "ontem"
                    ? theme.activeBadgeBg + " border-transparent shadow-xs"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                Ontem
              </button>
              <button
                type="button"
                onClick={() => setShowCustomDatePicker(!showCustomDatePicker)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center space-x-1 ${
                  dateMode === "outro"
                    ? theme.activeBadgeBg + " border-transparent shadow-xs"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                }`}
              >
                <span>{dateMode === "outro" ? dateStr : "Outros..."}</span>
              </button>
            </div>
          </div>

          {/* Custom Date Input (when 'Outros...' is clicked) */}
          {showCustomDatePicker && (
            <div className="pl-8 pb-1 animate-in fade-in duration-150">
              <label className="text-[11px] text-slate-500 font-medium block mb-1">Escolha a data:</label>
              <input
                type="date"
                onChange={handleCustomDateChange}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Description Input Row */}
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-2.5 pt-1">
            <FileText className="h-5 w-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição"
              className="w-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Category Selector Row */}
          <div className="relative border-b border-slate-100 pb-2.5 pt-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <Bookmark className="h-5 w-5 text-slate-400 shrink-0" />
                <button
                  type="button"
                  onClick={() => {
                    setCategoryDropdownOpen(!categoryDropdownOpen);
                    setAccountDropdownOpen(false);
                  }}
                  className="flex items-center space-x-2 border border-blue-400/80 bg-blue-50/50 hover:bg-blue-100/60 rounded-full px-3.5 py-1 text-sm text-slate-700 transition-colors cursor-pointer group"
                >
                  <CategoryIcon className={`h-3.5 w-3.5 ${selectedCategoryObj.text}`} />
                  <span className="font-medium text-xs sm:text-sm">{category}</span>
                </button>
              </div>

              <button 
                type="button"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Category Dropdown List */}
            {categoryDropdownOpen && (
              <div className="absolute left-8 right-0 top-12 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 max-h-52 overflow-y-auto grid grid-cols-2 gap-1 animate-in fade-in duration-150">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => {
                        setCategory(cat.name);
                        setCategoryDropdownOpen(false);
                      }}
                      className={`flex items-center space-x-2 p-2 rounded-xl text-left transition-colors cursor-pointer text-xs ${
                        isSelected
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700 font-medium"
                      }`}
                    >
                      <div className={`h-6 w-6 rounded-lg ${cat.color} flex items-center justify-center text-white shrink-0`}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="truncate">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Account / Payment Method Row */}
          <div className="relative border-b border-slate-100 pb-2.5 pt-1">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <Landmark className="h-5 w-5 text-slate-400 shrink-0" />
                <button
                  type="button"
                  onClick={() => {
                    setAccountDropdownOpen(!accountDropdownOpen);
                    setCategoryDropdownOpen(false);
                  }}
                  className="flex items-center space-x-2 border border-blue-400/80 bg-blue-50/50 hover:bg-blue-100/60 rounded-full px-3.5 py-1 text-sm text-slate-700 transition-colors cursor-pointer"
                >
                  <AccountIcon className={`h-3.5 w-3.5 ${selectedAccountObj.color}`} />
                  <span className="font-medium text-xs sm:text-sm">{account}</span>
                </button>
              </div>

              <button 
                type="button"
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Account Dropdown List */}
            {accountDropdownOpen && (
              <div className="absolute left-8 right-0 top-12 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1 animate-in fade-in duration-150">
                {ACCOUNTS.map((acc) => {
                  const Icon = acc.icon;
                  const isSelected = account === acc.name;
                  return (
                    <button
                      key={acc.name}
                      type="button"
                      onClick={() => {
                        setAccount(acc.name);
                        setAccountDropdownOpen(false);
                      }}
                      className={`flex items-center space-x-2.5 w-full p-2 rounded-xl text-left transition-colors cursor-pointer text-xs ${
                        isSelected
                          ? "bg-blue-50 text-blue-700 font-bold"
                          : "hover:bg-slate-50 text-slate-700 font-medium"
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${acc.color}`} />
                      <span>{acc.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* For Transferencia: Destination Account Row */}
          {activeModal === "transferencia" && (
            <div className="relative border-b border-slate-100 pb-2.5 pt-1 animate-in fade-in duration-150">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <ArrowRightLeft className="h-5 w-5 text-blue-500 shrink-0" />
                  <span className="text-xs text-slate-400 mr-1">Para:</span>
                  <button
                    type="button"
                    onClick={() => setDestAccountDropdownOpen(!destAccountDropdownOpen)}
                    className="flex items-center space-x-2 border border-blue-400/80 bg-blue-50/50 hover:bg-blue-100/60 rounded-full px-3.5 py-1 text-sm text-slate-700 transition-colors cursor-pointer"
                  >
                    <DestAccountIcon className={`h-3.5 w-3.5 ${selectedDestAccountObj.color}`} />
                    <span className="font-medium text-xs sm:text-sm">{destAccount}</span>
                  </button>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>

              {destAccountDropdownOpen && (
                <div className="absolute left-8 right-0 top-12 z-30 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 space-y-1">
                  {ACCOUNTS.map((acc) => {
                    const Icon = acc.icon;
                    return (
                      <button
                        key={acc.name}
                        type="button"
                        onClick={() => {
                          setDestAccount(acc.name);
                          setDestAccountDropdownOpen(false);
                        }}
                        className="flex items-center space-x-2.5 w-full p-2 rounded-xl text-left hover:bg-slate-50 text-slate-700 font-medium text-xs"
                      >
                        <Icon className={`h-4 w-4 ${acc.color}`} />
                        <span>{acc.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Attachment Row */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-3 flex-1">
              <Paperclip className="h-5 w-5 text-slate-400 shrink-0" />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="file-upload-input"
              />
              {attachmentName ? (
                <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-700 font-medium truncate max-w-[260px]">
                  <span className="truncate">{attachmentName}</span>
                  <button
                    type="button"
                    onClick={handleRemoveAttachment}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="file-upload-input"
                  className="text-slate-400 hover:text-blue-600 text-sm cursor-pointer transition-colors"
                >
                  Anexar Arquivo
                </label>
              )}
            </div>
          </div>

          {/* Ignore Transaction Row */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-3 text-slate-700">
              <Info className="h-5 w-5 text-slate-400 shrink-0" />
              <span className="text-sm font-medium">Ignorar transação</span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={ignoreTransaction}
              onClick={() => setIgnoreTransaction(!ignoreTransaction)}
              className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                ignoreTransaction ? "bg-blue-600" : "bg-slate-200"
              }`}
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${
                  ignoreTransaction ? "translate-x-5.5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* "Mais detalhes >" Toggle Button */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => setShowMoreDetails(!showMoreDetails)}
              className="flex items-center font-bold text-slate-800 text-xs sm:text-sm hover:text-blue-600 transition-colors cursor-pointer select-none"
            >
              <span>Mais detalhes</span>
              <ChevronRight
                className={`h-4 w-4 ml-1 transition-transform ${
                  showMoreDetails ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>

          {/* Expanded More Details Fields */}
          {showMoreDetails && (
            <div className="space-y-3 pt-2 pb-1 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Parcelamento (if not Transferência) */}
              {activeModal !== "transferencia" && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Parcelamento</label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>À vista (1x)</option>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>Parcelado em {num}x</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Observações / Notas */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Observações adicionais</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Alguma nota ou lembrete sobre essa transação..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Tags / Marcadores</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Ex: #férias #uber #trabalho"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 bg-slate-50/50 mt-1">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                CANCELAR
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                className={`font-bold px-7 py-2.5 rounded-full text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer ${theme.saveBtnBg}`}
              >
                SALVAR ALTERAÇÕES
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleSave(false)}
                className="text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer tracking-wider uppercase"
              >
                SALVAR E CRIAR NOVA
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                className={`font-bold px-8 py-2.5 rounded-full text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer tracking-wider uppercase ${theme.saveBtnBg}`}
              >
                SALVAR
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
