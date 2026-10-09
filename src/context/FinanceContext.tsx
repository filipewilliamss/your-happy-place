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

interface FinanceContextType {
  transactions: Transaction[];
  accounts: Account[];
  cards: CreditCardItem[];
  chatMessages: ChatMessage[];
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
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "09/10/2026",
      desc: "Supermercado Semar",
      category: "Alimentação",
      categoryColor: "bg-orange-500",
      account: "Carteira",
      amount: "-452,30",
      rawAmount: 452.30,
      isExpense: true,
      paid: true,
    },
    {
      id: "2",
      date: "08/10/2026",
      desc: "Salário Mensal",
      category: "Salário",
      categoryColor: "bg-green-500",
      account: "Conta FL",
      amount: "10.300,00",
      rawAmount: 10300.00,
      isExpense: false,
      paid: true,
    },
    {
      id: "3",
      date: "08/10/2026",
      desc: "Aluguel Apartamento",
      category: "Casa",
      categoryColor: "bg-blue-500",
      account: "Conta FL",
      amount: "-3.200,00",
      rawAmount: 3200.00,
      isExpense: true,
      paid: true,
    },
    {
      id: "4",
      date: "07/10/2026",
      desc: "Combustível Posto Ipiranga",
      category: "Transporte",
      categoryColor: "bg-amber-500",
      account: "Carteira",
      amount: "-220,00",
      rawAmount: 220.00,
      isExpense: true,
      paid: true,
    },
    {
      id: "5",
      date: "06/10/2026",
      desc: "Freelance Desenvolvimento",
      category: "Serviços",
      categoryColor: "bg-teal-500",
      account: "Conta FL",
      amount: "2.500,00",
      rawAmount: 2500.00,
      isExpense: false,
      paid: true,
    },
  ]);

  const [accounts, setAccounts] = useState<Account[]>([
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

  const [cards, setCards] = useState<CreditCardItem[]>([
    {
      id: "1",
      brand: "VISA",
      name: "Cartão dia 9",
      invoiceStatus: "Fatura zerada",
      totalInvoice: "0,00",
      dueDate: "9 de outubro de 2026",
      usedAmount: 0,
      totalLimit: 15000,
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text: "👋 Olá, Filipe! Sou seu Assistente Financeiro Inteligente.\n\nVocê pode me mandar uma mensagem de texto ou **falar por áudio** clicando no microfone 🎙️!\n\nExemplos do que você pode falar:\n• *'Almocei 45 reais no débito hoje'*\n• *'Comprei um tênis de 300 reais em 3x no cartão'* \n• *'Recebi 1.500 de freela hoje'* \n• *'Gasolina 120 reais ontem'*",
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
    const saldo = -30303.95 + bal; // baseline + movement

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

    // 2. Detect value / amount
    let detectedAmount = 0;
    // Look for R$ 100, 100 reais, 100,50, 100.00
    const currencyMatch = lower.match(/(?:r\$\s*|reais\s*)?(\d+(?:[.,]\d{1,2})?)(?:\s*reais|\s*conto)?/i);
    if (currencyMatch) {
      // Find numbers that are likely not the installment multiplier
      const cleanNumStr = currencyMatch[1].replace(",", ".");
      detectedAmount = parseFloat(cleanNumStr) || 0;
    }

    // Fallback number extraction
    if (detectedAmount === 0 || (installmentsCount > 1 && detectedAmount === installmentsCount)) {
      const numbers = lower.match(/\b\d+(?:[.,]\d{1,2})?\b/g);
      if (numbers) {
        for (const num of numbers) {
          const val = parseFloat(num.replace(",", "."));
          if (val !== installmentsCount) {
            detectedAmount = val;
            break;
          }
        }
      }
    }

    if (detectedAmount === 0) {
      detectedAmount = 50.0; // smart default if unspecified
    }

    // 3. Detect transaction type
    let type: TransactionType = "despesa";
    let isExpense = true;
    let account = "Carteira";

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
    }

    // 4. Detect Category
    let category = "Outros";
    let categoryColor = "bg-slate-500";

    if (/almoç|jant|lanche|comida|restaurante|ifood|mercado|supermercado|feira|café|pizza|hamburguer|padaria/i.test(lower)) {
      category = "Alimentação";
      categoryColor = "bg-orange-500";
    } else if (/uber|99|gasolina|combustível|posto|pedágio|carro|moto|estacionamento|passagem|ônibus/i.test(lower)) {
      category = "Transporte";
      categoryColor = "bg-amber-500";
    } else if (/aluguel|condomínio|luz|energia|água|internet|gás|casa|reforma|móveis|iptu/i.test(lower)) {
      category = "Casa";
      categoryColor = "bg-blue-500";
    } else if (/salário|freela|pagamento|comissão|venda|rendimento/i.test(lower)) {
      category = "Salário";
      categoryColor = "bg-green-500";
    } else if (/farmácia|remédio|médico|dentista|hospital|exame|academia|saúde/i.test(lower)) {
      category = "Saúde";
      categoryColor = "bg-rose-500";
    } else if (/cinema|netflix|spotify|jogo|game|viagem|show|festa|lazer|cerveja|bar/i.test(lower)) {
      category = "Lazer";
      categoryColor = "bg-purple-500";
    } else if (/curso|faculdade|livro|escola|educação|mensalidade/i.test(lower)) {
      category = "Educação";
      categoryColor = "bg-indigo-500";
    } else if (/tênis|roupa|celular|computador|compra|shopping/i.test(lower)) {
      category = "Compras";
      categoryColor = "bg-pink-500";
    }

    // 5. Detect Date
    let dateStr = "09/10/2026";
    if (lower.includes("ontem")) {
      dateStr = "08/10/2026";
    } else if (lower.includes("anteontem")) {
      dateStr = "07/10/2026";
    } else if (lower.includes("hoje")) {
      dateStr = "09/10/2026";
    }

    // 6. Generate Clean Description
    // Clean common helper verbs and amount keywords
    let cleanDesc = userText
      .replace(/r\$\s*\d+([.,]\d+)?/gi, "")
      .replace(/\d+([.,]\d+)?\s*(reais|conto)?/gi, "")
      .replace(/em\s*\d+\s*(x|vezes|parcelas)/gi, "")
      .replace(/(hoje|ontem|anteontem|no cartão|no débito|no crédito|na carteira|no pix)/gi, "")
      .replace(/(gastei|comprei|paguei|recebi|coloquei|foi)\s+(um|uma|com|de|no|na)?/gi, "")
      .trim();

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
  saldoAtual: "R$ -30.303,95",
  receitas: "R$ 10.300,00",
  despesas: "R$ 14.121,20",
  balanco: "R$ -3.821,20",
  totalReceitasNum: 10300,
  totalDespesasNum: 14121.20,
};

const defaultContextValue: FinanceContextType = {
  transactions: [],
  accounts: [],
  cards: [],
  chatMessages: [],
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

