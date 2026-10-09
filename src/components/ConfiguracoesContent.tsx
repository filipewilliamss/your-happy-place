import { useState } from "react";
import { 
  ChevronDown, 
  Check, 
  Laptop, 
  Smartphone, 
  ShieldCheck, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export type ConfigSubTab = "preferencias" | "notificacoes" | "dashboard" | "seguranca";

interface DeviceItem {
  id: string;
  type: "desktop" | "mobile";
  name: string;
  time: string;
  location: string;
  isCurrent?: boolean;
}

const INITIAL_DEVICES: DeviceItem[] = [
  { id: "1", type: "desktop", name: "Edge Windows", isCurrent: true, time: "Agora", location: "Guarulhos, São Paulo" },
  { id: "2", type: "mobile", name: "iPhone", time: "há 4 anos", location: "Guarulhos, São Paulo" },
  { id: "3", type: "mobile", name: "Xiaomi Redmi Note 6 Pro", time: "há 4 anos", location: "Guarulhos, São Paulo" },
  { id: "4", type: "desktop", name: "Edge Windows", time: "há 4 anos", location: "São Paulo, São Paulo" },
  { id: "5", type: "desktop", name: "Edge Windows", time: "há 3 anos", location: "São Paulo, São Paulo" },
  { id: "6", type: "mobile", name: "iPhone", time: "há 4 anos", location: "Guarulhos, São Paulo" },
  { id: "7", type: "desktop", name: "Edge Windows", time: "há 9 meses", location: "São Paulo, São Paulo" },
  { id: "8", type: "mobile", name: "iPhone", time: "há 6 meses", location: "Guarulhos, São Paulo" },
];

export function ConfiguracoesContent() {
  const [activeTab, setActiveTab] = useState<ConfigSubTab>("preferencias");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // State: Preferências
  const [idioma, setIdioma] = useState("Português Brasil");
  const [moeda, setMoeda] = useState("Brazil");
  const [aparencia, setAparencia] = useState("Modo claro");

  // State: Alertas e notificações
  const [receberNotificacoes, setReceberNotificacoes] = useState(true);
  const [novidades, setNovidades] = useState(true);
  const [alertasFinanceiros, setAlertasFinanceiros] = useState(true);
  const [infoPremium, setInfoPremium] = useState(true);
  const [parcerias, setParcerias] = useState(true);

  // State: Dashboard Cards
  const [dashboardCards, setDashboardCards] = useState<Record<string, boolean>>({
    despesasCategoria: true,
    frequenciaGastos: false,
    balancoMensal: true,
    transacoesPendentes: false,
    resumoOrcamento: true,
    transacoesFavoritas: false,
    calendarioMovimentacoes: false,
    minhasContas: false,
    receitasCategoria: true,
    balancoSemestral: false,
    balancoTrimestral: false,
    infoCartao: true,
    objetivos: false,
    economiaMes: false,
    infoPerfil: false,
  });

  const toggleDashboardCard = (key: string) => {
    setDashboardCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // State: Segurança
  const [devices, setDevices] = useState<DeviceItem[]>(INITIAL_DEVICES);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [modalEmailOpen, setModalEmailOpen] = useState(false);
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("filipewilliamss@gmail.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectAllDevices = () => {
    if (selectedDevices.length === devices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(devices.map((d) => d.id));
    }
  };

  const toggleSelectDevice = (id: string) => {
    setSelectedDevices((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
  };

  const handleDisconnectSelected = () => {
    if (selectedDevices.length === 0) return;
    setDevices((prev) => prev.filter((d) => !selectedDevices.includes(d.id)));
    setSelectedDevices([]);
    showToast("Dispositivos selecionados desconectados com sucesso!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center space-x-3 text-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Configurações</h1>

        <div className="flex items-center space-x-6">
          {/* Capsule Tabs */}
          <div className="bg-white border border-slate-200 p-1 rounded-full flex space-x-1 shadow-sm">
            <button
              onClick={() => setActiveTab("preferencias")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "preferencias"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Preferências
            </button>
            <button
              onClick={() => setActiveTab("notificacoes")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "notificacoes"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Alertas e notificações
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("seguranca")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "seguranca"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Segurança
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-slate-300 flex items-center justify-center text-white font-semibold">
              F
            </div>
            <span className="text-sm font-medium text-slate-700">Filipe Soares</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* TAB 1: PREFERÊNCIAS */}
      {activeTab === "preferencias" && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">
                  Idioma
                </label>
                <div className="relative">
                  <select
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 appearance-none cursor-pointer pr-8"
                  >
                    <option value="Português Brasil">Português Brasil</option>
                    <option value="English (US)">English (US)</option>
                    <option value="Español">Español</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-slate-400 absolute right-1 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">
                  Aparência
                </label>
                <div className="relative">
                  <select
                    value={aparencia}
                    onChange={(e) => setAparencia(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 appearance-none cursor-pointer pr-8"
                  >
                    <option value="Modo claro">Modo claro</option>
                    <option value="Modo escuro">Modo escuro</option>
                    <option value="Automático (Sistema)">Automático (Sistema)</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-slate-400 absolute right-1 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-2">
                  Moeda
                </label>
                <div className="relative">
                  <select
                    value={moeda}
                    onChange={(e) => setMoeda(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 appearance-none cursor-pointer pr-8"
                  >
                    <option value="Brazil">Brazil (Real - R$)</option>
                    <option value="Estados Unidos">Estados Unidos (Dólar - $)</option>
                    <option value="União Europeia">União Europeia (Euro - €)</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-slate-400 absolute right-1 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => showToast("Preferências salvas com sucesso!")}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase px-8 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ALERTAS E NOTIFICAÇÕES */}
      {activeTab === "notificacoes" && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-800 mb-4">Email</h2>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-slate-700">Receber notificações</span>
              <ToggleSwitch 
                checked={receberNotificacoes} 
                onChange={() => setReceberNotificacoes(!receberNotificacoes)} 
              />
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-2">
            {/* Left */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="pr-4">
                  <h3 className="text-sm font-semibold text-slate-800">Novidades do FinanceApp</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Novas funcionalidades e as melhores dicas para transformar sua vida financeira para melhor.
                  </p>
                </div>
                <ToggleSwitch 
                  checked={receberNotificacoes && novidades} 
                  onChange={() => setNovidades(!novidades)} 
                  disabled={!receberNotificacoes}
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="pr-4">
                  <h3 className="text-sm font-semibold text-slate-800">Alertas financeiros</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Lembretes sobre datas de vencimento, gastos, transferências, pagamentos, desempenho, planejamento mensal e objetivos.
                  </p>
                </div>
                <ToggleSwitch 
                  checked={receberNotificacoes && alertasFinanceiros} 
                  onChange={() => setAlertasFinanceiros(!alertasFinanceiros)} 
                  disabled={!receberNotificacoes}
                />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="pr-4">
                  <h3 className="text-sm font-semibold text-slate-800">Informações sobre o Premium</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Confirmação de pagamento, ativação do Premium, promoções e novidades dos planos.
                  </p>
                </div>
                <ToggleSwitch 
                  checked={receberNotificacoes && infoPremium} 
                  onChange={() => setInfoPremium(!infoPremium)} 
                  disabled={!receberNotificacoes}
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="pr-4">
                  <h3 className="text-sm font-semibold text-slate-800">Parcerias FinanceApp</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Cupons, produtos financeiros, clube de benefício, condições especiais e conteúdos.
                  </p>
                </div>
                <ToggleSwitch 
                  checked={receberNotificacoes && parcerias} 
                  onChange={() => setParcerias(!parcerias)} 
                  disabled={!receberNotificacoes}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={() => showToast("Preferências de notificação salvas com sucesso!")}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase px-8 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-slate-800 mb-6">
              Quais cards você deseja que apareça no dashboard?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cards da esquerda */}
              <div className="space-y-3">
                <div className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Cards da esquerda
                </div>

                <DashboardCheckboxItem
                  label="Mostrar gráfico de despesas por categoria?"
                  checked={dashboardCards.despesasCategoria}
                  onChange={() => toggleDashboardCard("despesasCategoria")}
                />
                <DashboardCheckboxItem
                  label="Mostrar gráfico de frequência de gastos?"
                  checked={dashboardCards.frequenciaGastos}
                  onChange={() => toggleDashboardCard("frequenciaGastos")}
                />
                <DashboardCheckboxItem
                  label="Mostrar gráfico do balanço mensal?"
                  checked={dashboardCards.balancoMensal}
                  onChange={() => toggleDashboardCard("balancoMensal")}
                />
                <DashboardCheckboxItem
                  label="Mostrar transações pendentes?"
                  checked={dashboardCards.transacoesPendentes}
                  onChange={() => toggleDashboardCard("transacoesPendentes")}
                />
                <DashboardCheckboxItem
                  label="Mostrar resumo do orçamento do mês atual?"
                  checked={dashboardCards.resumoOrcamento}
                  onChange={() => toggleDashboardCard("resumoOrcamento")}
                />
                <DashboardCheckboxItem
                  label="Mostrar transações favoritas?"
                  checked={dashboardCards.transacoesFavoritas}
                  onChange={() => toggleDashboardCard("transacoesFavoritas")}
                />
                <DashboardCheckboxItem
                  label="Mostrar calendário de Movimentações?"
                  checked={dashboardCards.calendarioMovimentacoes}
                  onChange={() => toggleDashboardCard("calendarioMovimentacoes")}
                />
                <DashboardCheckboxItem
                  label="Mostrar minhas contas?"
                  checked={dashboardCards.minhasContas}
                  onChange={() => toggleDashboardCard("minhasContas")}
                />
              </div>

              {/* Cards da direita */}
              <div className="space-y-3">
                <div className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Cards da direita
                </div>

                <DashboardCheckboxItem
                  label="Mostrar gráfico de receitas por categoria?"
                  checked={dashboardCards.receitasCategoria}
                  onChange={() => toggleDashboardCard("receitasCategoria")}
                />
                <DashboardCheckboxItem
                  label="Mostrar gráfico do balanço semestral?"
                  checked={dashboardCards.balancoSemestral}
                  onChange={() => toggleDashboardCard("balancoSemestral")}
                />
                <DashboardCheckboxItem
                  label="Mostrar gráfico do balanço trimestral?"
                  checked={dashboardCards.balancoTrimestral}
                  onChange={() => toggleDashboardCard("balancoTrimestral")}
                />
                <DashboardCheckboxItem
                  label="Mostrar informações de cartão de crédito?"
                  checked={dashboardCards.infoCartao}
                  onChange={() => toggleDashboardCard("infoCartao")}
                />
                <DashboardCheckboxItem
                  label="Mostrar seus objetivos?"
                  checked={dashboardCards.objetivos}
                  onChange={() => toggleDashboardCard("objetivos")}
                />
                <DashboardCheckboxItem
                  label="Mostrar informações da economia no mês atual?"
                  checked={dashboardCards.economiaMes}
                  onChange={() => toggleDashboardCard("economiaMes")}
                />
                <DashboardCheckboxItem
                  label="Mostrar informações de perfil?"
                  checked={dashboardCards.infoPerfil}
                  onChange={() => toggleDashboardCard("infoPerfil")}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => showToast("Configurações do Dashboard salvas com sucesso!")}
              className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase px-8 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Salvar
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: SEGURANÇA */}
      {activeTab === "seguranca" && (
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Informações da conta</h2>
            
            <div className="space-y-4">
              {/* Card Mudar meu e-mail */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Mudar meu e-mail</h3>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                  Após solicitar a mudança, enviaremos uma confirmação para o novo e-mail cadastrado. Até a confirmação, sua conta FinanceApp continuará vinculada ao seu e-mail atual ({emailInput}).
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setModalEmailOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    Mudar E-mail
                  </button>
                </div>
              </div>

              {/* Card Mudar minha senha */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h3 className="text-sm font-bold text-slate-800">Mudar minha senha</h3>
                <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                  Dica: Se possível, use uma senha que contenha números, letras maiúsculas, minúsculas e caracteres especiais.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setModalPasswordOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-xs tracking-wider uppercase px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    Alterar Senha
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dispositivos conectados */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Dispositivos conectados</h2>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Meus dispositivos</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Você tem {devices.length} dispositivo(s) conectado(s). Se achar que algum deles não é seu, você pode "desconectar dispositivos" para finalizar as sessões abertas.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="select-all"
                  checked={selectedDevices.length === devices.length && devices.length > 0}
                  onChange={handleSelectAllDevices}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
                <label htmlFor="select-all" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                  Selecionar todos
                </label>
              </div>

              {/* Devices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {devices.map((device) => {
                  const isChecked = selectedDevices.includes(device.id);
                  return (
                    <div
                      key={device.id}
                      onClick={() => toggleSelectDevice(device.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? "border-blue-300 bg-blue-50/50"
                          : "border-slate-100 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                        />
                        <div className="text-slate-500">
                          {device.type === "desktop" ? (
                            <Laptop className="h-5 w-5" />
                          ) : (
                            <Smartphone className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-800">{device.name}</span>
                            {device.isCurrent && (
                              <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                Dispositivo atual
                              </span>
                            )}
                            {!device.isCurrent && device.time && (
                              <span className="text-[10px] text-slate-400 font-normal">
                                {device.time}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">{device.location}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination and Disconnect action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={handleDisconnectSelected}
                  disabled={selectedDevices.length === 0}
                  className={`text-xs font-semibold px-5 py-2.5 rounded-lg transition-all ${
                    selectedDevices.length > 0
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-sm cursor-pointer"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Desconectar dispositivos
                </button>

                <div className="flex items-center space-x-2 self-end sm:self-auto text-xs font-medium text-slate-600">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  {[1, 2, 3, 4].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-7 w-7 rounded-md flex items-center justify-center transition-all ${
                        currentPage === page
                          ? "bg-blue-600 text-white font-bold"
                          : "hover:bg-slate-100 text-slate-600"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
                    disabled={currentPage === 4}
                    className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MUDAR E-MAIL */}
      {modalEmailOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-base">Alterar E-mail</h3>
              </div>
              <button 
                onClick={() => setModalEmailOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-xs text-slate-500 mb-4">
              Digite seu novo endereço de e-mail. Enviaremos um link de confirmação para validar a alteração.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Novo E-mail</label>
                <input
                  type="email"
                  defaultValue={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  placeholder="exemplo@email.com"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setModalEmailOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setModalEmailOpen(false);
                    showToast("Link de confirmação enviado para o novo e-mail!");
                  }}
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                >
                  Confirmar Alteração
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: MUDAR SENHA */}
      {modalPasswordOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <KeyRound className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-slate-800 text-base">Alterar Senha</h3>
              </div>
              <button 
                onClick={() => setModalPasswordOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Senha atual</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nova senha</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  onClick={() => setModalPasswordOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setModalPasswordOpen(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    showToast("Senha alterada com sucesso!");
                  }}
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
                >
                  Salvar Nova Senha
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponents

function ToggleSwitch({ 
  checked, 
  onChange, 
  disabled = false 
}: { 
  checked: boolean; 
  onChange: () => void; 
  disabled?: boolean; 
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      } ${checked ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function DashboardCheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      onClick={onChange}
      className={`flex items-center space-x-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
        checked
          ? "border-blue-200 bg-blue-50/40 text-slate-900 shadow-xs"
          : "border-slate-100 bg-slate-50/70 text-slate-600 hover:bg-slate-100/80 hover:border-slate-200"
      }`}
    >
      <div
        className={`h-4 w-4 rounded flex items-center justify-center transition-all ${
          checked ? "bg-blue-600 text-white" : "border border-slate-300 bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3 stroke-[3]" />}
      </div>
      <span className="text-xs font-medium leading-tight">{label}</span>
    </div>
  );
}
