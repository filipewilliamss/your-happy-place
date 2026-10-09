import React, { createContext, useContext, useState, useMemo } from "react";

export type TransactionType = "despesa" | "receita" | "cartao" | "transferencia";

export interface Transaction {
  id: string;
  date: string;
  desc: string;
  category: string;
  categoryColor: string;
  account: string;
  amount: string;
  rawAmount: number;
  isExpense: boolean;
  paid: boolean;
  installments?: {
    current: number;
    total: number;
  };
}

export interface Account {
  id: string;
  name: string;
  type: "wallet" | "card" | "bank";
  currentBalance: string;
  predictedBalance: string;
  isNegative: boolean;
  color: string;
}

export interface CreditCardItem {
  id: string;
  brand: string;
  name: string;
  invoiceStatus: string;
  totalInvoice: string;
  dueDate: string;
  usedAmount: number;
  totalLimit: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  parsedAction?: {
    type: TransactionType;
    desc: string;
    amount: number;
    category: string;
    date: string;
    account: string;
    installmentsCount?: number;
  };
}

export type NavTab = "dashboard" | "contas" | "transacoes" | "cartoes" | "planejamento" | "relatorios" | "configuracoes" | "mais";
export type TransactionFilterType = "todos" | "despesas" | "receitas";

interface FinanceContextType {
  transactions: Transaction[];
  accounts: Account[];
  cards: CreditCardItem[];
  chatMessages: ChatMessage[];
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (m: number) => void;
  setSelectedYear: (y: number) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  transactionFilter: TransactionFilterType;
  setTransactionFilter: (filter: TransactionFilterType) => void;
  navigateTo: (tab: NavTab, options?: { transactionFilter?: TransactionFilterType }) => void;
  hideBalance: boolean;
  toggleHideBalance: () => void;
  formatMasked: (val: string) => string;
  isAiAssistantOpen: boolean;
  setIsAiAssistantOpen: (open: boolean) => void;
  openAiAssistant: () => void;
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  togglePaid: (id: string) => void;
  deleteTransaction: (id: string) => void;
  addAccount: (acc: Omit<Account, "id">) => void;
  addCard: (card: Omit<CreditCardItem, "id">) => void;
  processAiCommand: (userText: string) => Promise<ChatMessage>;
  metrics: {
    saldoAtual: string;
    receitas: string;
    despesas: string;
    balanco: string;
    totalReceitasNum: number;
    totalDespesasNum: number;
  };
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [transactionFilter, setTransactionFilter] = useState<TransactionFilterType>("todos");
  const [selectedMonth, setSelectedMonth] = useState<number>(9); // 9 = Outubro
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [hideBalance, setHideBalance] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);

  const toggleHideBalance = () => setHideBalance((prev) => !prev);
  const formatMasked = (val: string) => (hideBalance ? "••••••" : val);
  const openAiAssistant = () => setIsAiAssistantOpen(true);

  const navigateTo = (tab: NavTab, options?: { transactionFilter?: TransactionFilterType }) => {
    if (options?.transactionFilter) {
      setTransactionFilter(options.transactionFilter);
    }
    setActiveTab(tab);
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [accounts, setAccounts] = useState<Account[]>([]);

  const [cards, setCards] = useState<CreditCardItem[]>([]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "👋 Olá, bem-vindo(a) à sua nova conta no FinanceApp!\n\nSeu painel está zerado e pronto para você começar do zero.\n\nVocê pode me mandar uma mensagem de texto ou **falar por áudio** no microfone 🎙️ para adicionar suas primeiras transações (ex: *'Recebi 3.000 de salário hoje'* ou *'Almoço 35 reais no débito'*).",
      timestamp: "Agora",
    },
  ]);

  const addTransaction = (tx: Omit<Transaction, "id">) => {
    const newTx: Transaction = {
      ...tx,
      id: String(Date.now() + Math.random()),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const togglePaid = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, paid: !t.paid } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const addAccount = (acc: Omit<Account, "id">) => {
    setAccounts((prev) => [...prev, { ...acc, id: String(Date.now()) }]);
  };

  const addCard = (card: Omit<CreditCardItem, "id">) => {
    setCards((prev) => [...prev, { ...card, id: String(Date.now()) }]);
  };

  // Metrics calculation
  const metrics = useMemo(() => {
    let rec = 0;
    let desp = 0;

    transactions.forEach((t) => {
      if (t.isExpense) {
        desp += t.rawAmount;
      } else {
        rec += t.rawAmount;
      }
    });

    const bal = rec - desp;
    const saldo = bal; // zero baseline for new clean account

    return {
      saldoAtual: `R$ ${saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      receitas: `R$ ${rec.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      despesas: `R$ ${desp.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      balanco: `R$ ${bal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      totalReceitasNum: rec,
      totalDespesasNum: desp,
    };
  }, [transactions]);

  // AI Natural Language Parsing for Brazilian Portuguese Financial Records
  const processAiCommand = async (userText: string): Promise<ChatMessage> => {
    const now = new Date();
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text: userText,
      timestamp: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    const lower = userText.toLowerCase();

    // 1. Detect installments (ex: "3x", "em 3 vezes", "10x de 50", "3 parcelas")
    let installmentsCount = 1;
    const installmentMatch = lower.match(/(?:em\s+)?(\d+)\s*(?:x|vezes|parcelas)/i);
    if (installmentMatch) {
      installmentsCount = parseInt(installmentMatch[1], 10) || 1;
    }

    // 2. Intelligent extraction for financial values in Brazilian Portuguese
    const parseNum = (str: string): number => {
      if (!str) return 0;
      let clean = str.trim();
      if (clean.includes(",") && clean.includes(".")) {
        clean = clean.replace(/\./g, "").replace(",", ".");
      } else if (clean.includes(",")) {
        clean = clean.replace(",", ".");
      }
      const val = parseFloat(clean);
      return isNaN(val) ? 0 : val;
    };

    let detectedAmount = 0;
    let matchedCurrencyToken = "";

    // Priority 1: Currency symbol prefix (R$, $, BRL)
    // Ex: "R$65,30", "R$ 65,30", "r$ 1.500,00", "$ 45"
    const prefixMatch = userText.match(/(?:r\$|\$|brl)\s*(\d{1,3}(?:\.\d{3})*(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)/i);
    if (prefixMatch) {
      const val = parseNum(prefixMatch[1]);
      if (val > 0) {
        detectedAmount = val;
        matchedCurrencyToken = prefixMatch[0];
      }
    }

    // Priority 2: Compound "X reais e Y centavos" or "X reais e Y"
    // Ex: "65 reais e 30 centavos", "65 reais e 30"
    if (detectedAmount === 0) {
      const compoundMatch = lower.match(/(\d+)\s*(?:reais|real)\s*e\s*(\d{1,2})(?:\s*centavos?)?/i);
      if (compoundMatch) {
        const mainPart = parseInt(compoundMatch[1], 10);
        const centsPart = parseInt(compoundMatch[2], 10);
        const decimalVal = compoundMatch[2].length === 1 ? centsPart / 10 : centsPart / 100;
        detectedAmount = mainPart + decimalVal;
        matchedCurrencyToken = compoundMatch[0];
      }
    }

    // Priority 3: Currency word suffix (reais, real, conto, pila, pau)
    // Ex: "65,30 reais", "65 reais", "50 conto", "100 pila"
    if (detectedAmount === 0) {
      const suffixMatch = lower.match(/(\d{1,3}(?:\.\d{3})*(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)\s*(?:reais|real|conto|pila|pau)\b/i);
      if (suffixMatch) {
        const val = parseNum(suffixMatch[1]);
        if (val > 0) {
          detectedAmount = val;
          matchedCurrencyToken = suffixMatch[0];
        }
      }
    }

    // Priority 4: Preposition + number expressing value (no valor de, por, custou, gastei, paguei)
    if (detectedAmount === 0) {
      const prepMatch = lower.match(/(?:no\s+valor\s+de|valor\s+de|custou|saiu\s+por|por|paguei|gastei)\s+(?:r\$)?\s*(\d{1,3}(?:\.\d{3})*(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)/i);
      if (prepMatch) {
        const val = parseNum(prepMatch[1]);
        const restAfter = lower.slice(prepMatch.index! + prepMatch[0].length).trim();
        const isBrandNumber = val === 99 && /^(?:food|pop|t[aá]xi|taxi|moto|app)/i.test(restAfter);
        if (val > 0 && val !== installmentsCount && !isBrandNumber) {
          detectedAmount = val;
          matchedCurrencyToken = prepMatch[0];
        }
      }
    }

    // Priority 5: Decimal numbers with comma or dot (e.g. "65,30" or "65.30")
    // In speech & writing, brand numbers & quantities are almost never decimals ("99 Food", "2 pizzas"). A decimal number is a financial amount!
    if (detectedAmount === 0) {
      const decimalRegex = /\b(\d{1,3}(?:\.\d{3})*,\d{1,2}|\d+[.,]\d{1,2})\b/g;
      let decMatch;
      while ((decMatch = decimalRegex.exec(lower)) !== null) {
        const val = parseNum(decMatch[1]);
        if (val > 0 && val !== installmentsCount) {
          detectedAmount = val;
          matchedCurrencyToken = decMatch[0];
          break;
        }
      }
    }

    // Priority 6: Fallback for integers - scan all numbers in the text excluding brand names, installment counts, dates
    if (detectedAmount === 0) {
      const allNumRegex = /\b(\d+(?:\.\d+)?)\b/g;
      let candidateMatch;
      const candidates: { amount: number; token: string; priority: number }[] = [];

      while ((candidateMatch = allNumRegex.exec(lower)) !== null) {
        const val = parseNum(candidateMatch[1]);
        const token = candidateMatch[0];
        const startIndex = candidateMatch.index;
        const endIndex = startIndex + token.length;

        const textAfter = lower.slice(endIndex).trim();
        const textBefore = lower.slice(Math.max(0, startIndex - 10), startIndex).trim();

        // Skip 99 when it's part of 99 Food / 99 Pop / 99 Táxi etc.
        if (val === 99 && (/^(?:food|pop|t[aá]xi|taxi|moto|app)/i.test(textAfter) || /(?:no|na|app)\s*$/i.test(textBefore))) {
          continue;
        }

        // Skip installment counts
        if (val === installmentsCount && installmentsCount > 1) {
          continue;
        }
        if (/^\s*(?:x|vezes|parcelas)/i.test(textAfter)) {
          continue;
        }

        // Skip dates like "dia 15"
        if (/(?:dia|data)\s*$/i.test(textBefore)) {
          continue;
        }

        candidates.push({ amount: val, token, priority: val > 10 ? 2 : 1 });
      }

      if (candidates.length > 0) {
        candidates.sort((a, b) => b.priority - a.priority || b.amount - a.amount);
        detectedAmount = candidates[0].amount;
        matchedCurrencyToken = candidates[0].token;
      }
    }

    if (detectedAmount === 0) {
      detectedAmount = 50.0; // smart default if unspecified
    }

    // 3. Detect transaction type and account
    let type: TransactionType = "despesa";
    let isExpense = true;
    let account = "Conta FL";

    if (
      lower.includes("recebi") ||
      lower.includes("receita") ||
      lower.includes("salário") ||
      lower.includes("freela") ||
      lower.includes("depósito") ||
      lower.includes("pagaram") ||
      lower.includes("ganhei")
    ) {
      type = "receita";
      isExpense = false;
      account = "Conta FL";
    } else if (
      lower.includes("transferi") ||
      lower.includes("transferência") ||
      lower.includes("mandei pix") ||
      lower.includes("transferir")
    ) {
      type = "transferencia";
      account = "Conta FL";
    } else if (
      lower.includes("cartão") ||
      lower.includes("crédito") ||
      lower.includes("fatura") ||
      installmentsCount > 1
    ) {
      type = "cartao";
      account = "Cartão dia 9";
    } else if (
      lower.includes("carteira") ||
      lower.includes("dinheiro") ||
      lower.includes("em espécie")
    ) {
      account = "Carteira";
    }

    // 4. Detect Category (Smart priority: 99 Food / iFood -> Alimentação, 99 Pop / Táxi / Uber -> Transporte)
    let category = "Outros";
    let categoryColor = "bg-slate-500";

    if (/99\s*food|ifood|rappi|delivery|almoç|jant|lanche|comida|restaurante|mercado|supermercado|feira|café|pizza|hamburguer|padaria|a[çc]a[ií]|churrasco/i.test(lower)) {
      category = "Alimentação";
      categoryColor = "bg-orange-500";
    } else if (/99\s*(?:pop|t[aá]xi|taxi|moto|corrida)|uber|gasolina|combust[ií]vel|posto|ped[aá]gio|carro|moto|estacionamento|passagem|[oô]nibus|metr[oô]/i.test(lower)) {
      category = "Transporte";
      categoryColor = "bg-amber-500";
    } else if (/aluguel|condom[ií]nio|luz|energia|[aá]gua|internet|g[aá]s|casa|reforma|m[oó]veis|iptu/i.test(lower)) {
      category = "Casa";
      categoryColor = "bg-blue-500";
    } else if (/sal[aá]rio|freela|pagamento|comiss[aã]o|venda|rendimento/i.test(lower)) {
      category = "Salário";
      categoryColor = "bg-green-500";
    } else if (/farm[aá]cia|rem[eé]dio|m[eé]dico|dentista|hospital|exame|academia|sa[uú]de/i.test(lower)) {
      category = "Saúde";
      categoryColor = "bg-rose-500";
    } else if (/cinema|netflix|spotify|jogo|game|viagem|show|festa|lazer|cerveja|bar|chope/i.test(lower)) {
      category = "Lazer";
      categoryColor = "bg-purple-500";
    } else if (/curso|faculdade|livro|escola|educa[cç][aã]o|mensalidade/i.test(lower)) {
      category = "Educação";
      categoryColor = "bg-indigo-500";
    } else if (/t[eê]nis|roupa|camisa|cal[cç]a|celular|computador|compra|shopping/i.test(lower)) {
      category = "Compras";
      categoryColor = "bg-pink-500";
    }

    // 5. Detect Date (Dynamic calculation)
    const today = new Date();
    let targetDate = new Date(today);
    if (lower.includes("anteontem")) {
      targetDate.setDate(today.getDate() - 2);
    } else if (lower.includes("ontem")) {
      targetDate.setDate(today.getDate() - 1);
    }
    const dayStr = String(targetDate.getDate()).padStart(2, "0");
    const monthStr = String(targetDate.getMonth() + 1).padStart(2, "0");
    const yearStr = targetDate.getFullYear();
    const dateStr = `${dayStr}/${monthStr}/${yearStr}`;

    // 6. Generate Clean Description (Preserve brand names like 99 Food while removing values and filler verbs)
    let cleanDesc = userText;

    if (matchedCurrencyToken) {
      cleanDesc = cleanDesc.replace(matchedCurrencyToken, " ");
    } else {
      cleanDesc = cleanDesc.replace(/(?:r\$|\$)\s*\d+([.,]\d+)?/gi, " ");
    }

    cleanDesc = cleanDesc.replace(/(?:em\s+)?\d+\s*(?:x|vezes|parcelas)\b/gi, " ");
    cleanDesc = cleanDesc.replace(/\b(hoje|ontem|anteontem)\b/gi, " ");
    cleanDesc = cleanDesc.replace(/\b(no\s+cartão(?:\s+de\s+crédito)?|no\s+crédito|no\s+débito|na\s+carteira|no\s+pix|em\s+dinheiro|à\s+vista)\b/gi, " ");
    cleanDesc = cleanDesc.replace(/\b(gastei|comprei|paguei|recebi|coloquei|foi)\s+(?:um|uma|com|de|no|na|pro|pra)?\b/gi, " ");
    cleanDesc = cleanDesc.replace(/\b(reais|real|centavos?|conto|pila|pau)\b/gi, " ");
    cleanDesc = cleanDesc.replace(/r\$/gi, " ");

    cleanDesc = cleanDesc.replace(/\s+/g, " ").trim();
    cleanDesc = cleanDesc.replace(/^(?:de|com|no|na|em|por|para|pra|pro)\s+/i, "").trim();
    cleanDesc = cleanDesc.replace(/\s+(?:de|com|no|na|em|por|para|pra|pro)$/i, "").trim();

    if (!cleanDesc || cleanDesc.length < 2) {
      cleanDesc = category === "Salário" ? "Entrada financeira" : `Gasto em ${category}`;
    }
    // Capitalize first letter
    cleanDesc = cleanDesc.charAt(0).toUpperCase() + cleanDesc.slice(1);

    // 7. Insert Transaction(s)
    const newItems: Transaction[] = [];

    if (installmentsCount > 1) {
      const perInstallment = detectedAmount / installmentsCount;
      const formattedPerInst = perInstallment.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      for (let i = 1; i <= installmentsCount; i++) {
        const monthOffset = (10 + (i - 1)) % 12 || 12;
        const formattedMonth = String(monthOffset).padStart(2, "0");
        const instDate = `09/${formattedMonth}/2026`;

        const instTx: Transaction = {
          id: String(Date.now() + i),
          date: instDate,
          desc: `${cleanDesc} (${i}/${installmentsCount})`,
          category,
          categoryColor,
          account,
          amount: isExpense ? `-${formattedPerInst}` : formattedPerInst,
          rawAmount: perInstallment,
          isExpense,
          paid: i === 1,
          installments: {
            current: i,
            total: installmentsCount,
          },
        };
        newItems.push(instTx);
      }
    } else {
      const formattedAmount = detectedAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      newItems.push({
        id: String(Date.now()),
        date: dateStr,
        desc: cleanDesc,
        category,
        categoryColor,
        account,
        amount: isExpense ? `-${formattedAmount}` : formattedAmount,
        rawAmount: detectedAmount,
        isExpense,
        paid: true,
      });
    }

    setTransactions((prev) => [...newItems, ...prev]);

    // AI response message formatting
    const formattedTotal = detectedAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    let aiResponseText = "";

    if (installmentsCount > 1) {
      const perInst = (detectedAmount / installmentsCount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      aiResponseText = `✅ Entendido! Já adicionei sua compra parcelada:\n\n• **Item**: ${cleanDesc}\n• **Total**: ${formattedTotal} em **${installmentsCount}x de ${perInst}**\n• **Categoria**: ${category}\n• **Forma de Pagamento**: ${account}\n• **Primeira parcela**: ${dateStr}\n\nAs ${installmentsCount} parcelas foram organizadas nos meses corretos na fatura do seu cartão! 💳`;
    } else if (!isExpense) {
      aiResponseText = `🎉 Maravilha! Registrei sua receita com sucesso:\n\n• **Descrição**: ${cleanDesc}\n• **Valor**: ${formattedTotal}\n• **Categoria**: ${category}\n• **Conta creditada**: ${account}\n• **Data**: ${dateStr}`;
    } else {
      aiResponseText = `✅ Anotado! Registrei sua despesa:\n\n• **Descrição**: ${cleanDesc}\n• **Valor**: ${formattedTotal}\n• **Categoria**: ${category}\n• **Conta**: ${account}\n• **Data**: ${dateStr}\n\nO saldo e os relatórios foram atualizados automaticamente!`;
    }

    const aiMsg: ChatMessage = {
      id: String(Date.now() + 10),
      sender: "ai",
      text: aiResponseText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      parsedAction: {
        type,
        desc: cleanDesc,
        amount: detectedAmount,
        category,
        date: dateStr,
        account,
        installmentsCount: installmentsCount > 1 ? installmentsCount : undefined,
      },
    };

    setChatMessages((prev) => [...prev, aiMsg]);
    return aiMsg;
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        accounts,
        cards,
        chatMessages,
        selectedMonth,
        selectedYear,
        setSelectedMonth,
        setSelectedYear,
        activeTab,
        setActiveTab,
        transactionFilter,
        setTransactionFilter,
        navigateTo,
        hideBalance,
        toggleHideBalance,
        formatMasked,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        openAiAssistant,
        addTransaction,
        togglePaid,
        deleteTransaction,
        addAccount,
        addCard,
        processAiCommand,
        metrics,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

const defaultMetrics = {
  saldoAtual: "R$ 0,00",
  receitas: "R$ 0,00",
  despesas: "R$ 0,00",
  balanco: "R$ 0,00",
  totalReceitasNum: 0,
  totalDespesasNum: 0,
};

const defaultContextValue: FinanceContextType = {
  transactions: [],
  accounts: [],
  cards: [],
  chatMessages: [],
  selectedMonth: 9,
  selectedYear: 2026,
  setSelectedMonth: () => {},
  setSelectedYear: () => {},
  activeTab: "dashboard",
  setActiveTab: () => {},
  transactionFilter: "todos",
  setTransactionFilter: () => {},
  navigateTo: () => {},
  hideBalance: false,
  toggleHideBalance: () => {},
  formatMasked: (val: string) => val,
  isAiAssistantOpen: false,
  setIsAiAssistantOpen: () => {},
  openAiAssistant: () => {},
  addTransaction: () => {},
  togglePaid: () => {},
  deleteTransaction: () => {},
  addAccount: () => {},
  addCard: () => {},
  processAiCommand: async () => ({ id: "0", sender: "ai", text: "", timestamp: "" }),
  metrics: defaultMetrics,
};

export function useFinance() {
  const ctx = useContext(FinanceContext);
  return ctx || defaultContextValue;
}

