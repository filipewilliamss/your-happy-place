import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
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
  Receipt
} from "lucide-react";

type ModalType = "despesa" | "receita" | "cartao" | "transferencia" | null;

interface TransactionModalsProps {
  modalOpen: ModalType;
  setModalOpen: (type: ModalType) => void;
}

export function TransactionModals({ modalOpen, setModalOpen }: TransactionModalsProps) {
  const onOpenChange = (open: boolean) => {
    if (!open) setModalOpen(null);
  };

  return (
    <>
      {/* Despesa */}
      <Dialog open={modalOpen === "despesa"} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold text-slate-800">Nova Despesa</DialogTitle>
            </DialogHeader>

            <div className="flex items-center justify-between border-b-2 border-red-500 pb-2 mb-6">
              <div className="flex items-center space-x-3 text-red-500">
                <Calculator className="h-5 w-5 text-slate-400" />
                <span className="text-2xl font-light">R$ 0,00</span>
              </div>
              <div className="flex items-center text-xs font-semibold text-slate-500 cursor-pointer">
                BRL <ChevronDown className="h-3 w-3 ml-1" />
              </div>
            </div>

            <div className="space-y-5">
              <FormRow icon={<CheckCircle2 className="h-5 w-5 text-slate-400" />}>
                <div className="flex justify-between items-center w-full">
                  <span className="text-slate-500 text-sm">Foi paga</span>
                  <div className="w-10 h-5 bg-red-200 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                  </div>
                </div>
              </FormRow>

              <FormRow icon={<Calendar className="h-5 w-5 text-slate-400" />}>
                <div className="flex space-x-2">
                  <Badge className="bg-red-500 text-white border-transparent">Hoje</Badge>
                  <Badge>Ontem</Badge>
                  <Badge>Outros...</Badge>
                </div>
              </FormRow>

              <FormRow icon={<FileText className="h-5 w-5 text-slate-400" />} border>
                <div className="w-full text-slate-400 text-sm">Descrição</div>
              </FormRow>

              <FormRow icon={<Bookmark className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2 border border-blue-400 rounded-full px-3 py-1 text-sm text-slate-700">
                    <HomeIcon className="h-3.5 w-3.5 text-blue-500" />
                    <span>Casa</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <FormRow icon={<Landmark className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2 border border-blue-400 rounded-full px-3 py-1 text-sm text-slate-700">
                    <DollarIcon className="h-3.5 w-3.5 text-blue-500" />
                    <span>Carteira</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <FormRow icon={<Paperclip className="h-5 w-5 text-slate-400" />}>
                <div className="text-slate-400 text-sm">Anexar Arquivo</div>
              </FormRow>

              <FormRow icon={<Info className="h-5 w-5 text-slate-400" />}>
                <div className="flex justify-between items-center w-full">
                  <span className="text-slate-500 text-sm">Ignorar transação</span>
                  <div className="w-10 h-5 bg-slate-200 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </FormRow>

              <div className="flex justify-end pt-2">
                <button className="flex items-center font-bold text-slate-800 text-sm">
                  Mais detalhes <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button className="text-sm font-bold text-slate-300">SALVAR E CRIAR NOVA</button>
                <button className="bg-slate-200 text-slate-400 font-bold px-8 py-2.5 rounded-full text-sm">SALVAR</button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Receita */}
      <Dialog open={modalOpen === "receita"} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold text-slate-800">Nova receita</DialogTitle>
            </DialogHeader>

            <div className="flex items-center justify-between border-b-2 border-green-500 pb-2 mb-6">
              <div className="flex items-center space-x-3 text-green-500">
                <Calculator className="h-5 w-5 text-slate-400" />
                <span className="text-2xl font-light">R$ 0,00</span>
              </div>
              <div className="flex items-center text-xs font-semibold text-slate-500 cursor-pointer">
                BRL <ChevronDown className="h-3 w-3 ml-1" />
              </div>
            </div>

            <div className="space-y-5">
              <FormRow icon={<CheckCircle2 className="h-5 w-5 text-slate-400" />}>
                <div className="flex justify-between items-center w-full">
                  <span className="text-slate-500 text-sm">Foi recebida</span>
                  <div className="w-10 h-5 bg-green-200 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </FormRow>

              <FormRow icon={<Calendar className="h-5 w-5 text-slate-400" />}>
                <div className="flex space-x-2">
                  <Badge className="bg-green-500 text-white border-transparent">Hoje</Badge>
                  <Badge>Ontem</Badge>
                  <Badge>Outros...</Badge>
                </div>
              </FormRow>

              <FormRow icon={<FileText className="h-5 w-5 text-slate-400" />} border>
                <div className="w-full text-slate-400 text-sm">Descrição</div>
              </FormRow>

              <FormRow icon={<Bookmark className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2 border border-green-500 rounded-full px-3 py-1 text-sm text-slate-700">
                    <DollarIcon className="h-3.5 w-3.5 text-green-600" />
                    <span>Freelancer</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <FormRow icon={<Landmark className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2 border border-blue-400 rounded-full px-3 py-1 text-sm text-slate-700">
                    <DollarIcon className="h-3.5 w-3.5 text-blue-500" />
                    <span>Carteira</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <FormRow icon={<Paperclip className="h-5 w-5 text-slate-400" />}>
                <div className="text-slate-400 text-sm">Anexar Arquivo</div>
              </FormRow>

              <FormRow icon={<Info className="h-5 w-5 text-slate-400" />}>
                <div className="flex justify-between items-center w-full">
                  <span className="text-slate-500 text-sm">Ignorar transação</span>
                  <div className="w-10 h-5 bg-slate-200 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </FormRow>

              <div className="flex justify-end pt-2">
                <button className="flex items-center font-bold text-slate-800 text-sm">
                  Mais detalhes <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button className="text-sm font-bold text-slate-300">SALVAR E CRIAR NOVA</button>
                <button className="bg-slate-200 text-slate-400 font-bold px-8 py-2.5 rounded-full text-sm">SALVAR</button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Despesa Cartão */}
      <Dialog open={modalOpen === "cartao"} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold text-slate-800">Nova despesa cartão de crédito</DialogTitle>
            </DialogHeader>

            <div className="flex items-center justify-between border-b-2 border-teal-600 pb-2">
              <div className="flex items-center space-x-3 text-teal-600">
                <Calculator className="h-5 w-5 text-slate-400" />
                <span className="text-2xl font-light">R$ 0,00</span>
              </div>
              <div className="flex items-center text-xs font-semibold text-slate-500 cursor-pointer">
                BRL <ChevronDown className="h-3 w-3 ml-1" />
              </div>
            </div>
            <div className="text-xs text-orange-500 mt-1 mb-6">Deve ter um valor diferente de 0</div>

            <div className="space-y-5">
              <FormRow icon={<Calendar className="h-5 w-5 text-slate-400" />}>
                <div className="flex space-x-2">
                  <Badge className="bg-teal-700 text-white border-transparent">Hoje</Badge>
                  <Badge>Ontem</Badge>
                  <Badge>Outros...</Badge>
                </div>
              </FormRow>

              <FormRow icon={<FileText className="h-5 w-5 text-slate-400" />} border>
                <div className="w-full text-slate-400 text-sm">Descrição</div>
              </FormRow>

              <FormRow icon={<Bookmark className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2 border border-blue-400 rounded-full px-3 py-1 text-sm text-slate-700">
                    <HomeIcon className="h-3.5 w-3.5 text-blue-500" />
                    <span>Casa</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <FormRow icon={<CreditCard className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2 border border-slate-300 rounded-full px-3 py-1 text-sm text-slate-700">
                    <span className="font-bold text-blue-800 italic text-[10px]">VISA</span>
                    <span>Cartão dia 9</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <FormRow icon={<Receipt className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center space-x-2 border border-slate-300 rounded-full px-3 py-1 text-sm text-slate-700">
                    <span>9 de out de 2026</span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <FormRow icon={<Info className="h-5 w-5 text-slate-400" />}>
                <div className="flex justify-between items-center w-full">
                  <span className="text-slate-500 text-sm">Ignorar transação</span>
                  <div className="w-10 h-5 bg-slate-200 rounded-full flex items-center px-1">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </FormRow>

              <div className="flex justify-end pt-2">
                <button className="flex items-center font-bold text-slate-800 text-sm">
                  Mais detalhes <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button className="text-sm font-bold text-slate-300">SALVAR E CRIAR NOVA</button>
                <button className="bg-slate-200 text-slate-400 font-bold px-8 py-2.5 rounded-full text-sm">SALVAR</button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Transferência */}
      <Dialog open={modalOpen === "transferencia"} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white rounded-2xl">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold text-slate-800">Nova transferência</DialogTitle>
            </DialogHeader>

            <div className="flex items-center justify-between border-b-2 border-blue-500 pb-2 mb-6">
              <div className="flex items-center space-x-3 text-blue-500">
                <Calculator className="h-5 w-5 text-slate-400" />
                <span className="text-2xl font-light">R$ 0,00</span>
              </div>
              <div className="flex items-center text-xs font-semibold text-slate-500 cursor-pointer">
                BRL <ChevronDown className="h-3 w-3 ml-1" />
              </div>
            </div>

            <div className="space-y-5">
              <FormRow icon={<Calendar className="h-5 w-5 text-slate-400" />}>
                <div className="flex space-x-2">
                  <Badge className="bg-blue-500 text-white border-transparent">Hoje</Badge>
                  <Badge>Ontem</Badge>
                  <Badge>Outros...</Badge>
                </div>
              </FormRow>

              <FormRow icon={<Landmark className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <span className="text-slate-400 text-sm">Conta de origem</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <FormRow icon={<Landmark className="h-5 w-5 text-slate-400" />} border>
                <div className="flex justify-between items-center w-full">
                  <span className="text-slate-400 text-sm">Conta de destino</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              </FormRow>

              <div className="flex justify-end pt-2">
                <button className="flex items-center font-bold text-slate-800 text-sm">
                  Mais detalhes <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button className="text-sm font-bold text-slate-300">SALVAR E CRIAR NOVA</button>
                <button className="bg-slate-200 text-slate-400 font-bold px-8 py-2.5 rounded-full text-sm">SALVAR</button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Helpers

function FormRow({ icon, children, border }: { icon: React.ReactNode, children: React.ReactNode, border?: boolean }) {
  return (
    <div className={`flex items-center space-x-4 pb-2 ${border ? 'border-b border-slate-200' : ''}`}>
      <div className="w-6 flex justify-center">
        {icon}
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium border border-slate-200 text-slate-600 bg-slate-100 ${className}`}>
      {children}
    </div>
  );
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function DollarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" x2="12" y1="2" y2="22"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  );
}
