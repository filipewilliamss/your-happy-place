import { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Sparkles, 
  Mic, 
  MicOff, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  Check, 
  CreditCard, 
  Calendar, 
  Tag, 
  ArrowUpRight,
  TrendingDown,
  Volume2
} from "lucide-react";
import { useFinance, ChatMessage } from "../context/FinanceContext";

export function AiFinancialAssistant() {
  const { chatMessages, processAiCommand } = useFinance();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "pt-BR";

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputValue(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setSpeechError("Permissão do microfone negada. Verifique as configurações do navegador.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      setSpeechError("Reconhecimento de voz não suportado neste navegador. Digite seu gasto abaixo!");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setSpeechError(null);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isProcessing) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setInputValue("");
    setIsProcessing(true);

    try {
      await processAiCommand(textToSend);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPrompts = [
    "Almoço 45 reais no débito hoje",
    "Comprei tênis de 300 em 3x no cartão",
    "Recebi 1.500 de freela hoje",
    "Gasolina 120 reais na carteira ontem",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center space-x-3">
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-200 shadow-md text-xs font-semibold text-blue-700 hidden sm:flex items-center space-x-1.5 animate-bounce">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Fale ou digite seu gasto com IA</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="h-13 w-13 md:h-14 md:w-14 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 relative group cursor-pointer"
            title="Abrir Assistente Financeiro IA"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25"></div>
            <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-18 md:inset-x-auto md:bottom-6 md:right-6 z-50 w-auto md:w-full md:max-w-[420px] h-[560px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xs">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm tracking-wide">FinAI Assistente</h3>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                </div>
                <p className="text-[11px] text-blue-100 font-medium">Reconhecimento de voz e despesas</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white"
              title="Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-xs ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
                  }`}
                >
                  {msg.text}

                  {/* Render Visual Card for Parsed AI Actions */}
                  {msg.parsedAction && (
                    <div className="mt-3 pt-3 border-t border-slate-100 bg-blue-50/50 rounded-xl p-2.5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <span className="flex items-center text-blue-700">
                          <Check className="h-3.5 w-3.5 mr-1 text-green-600" />
                          Lançamento Registrado
                        </span>
                        <span className="text-blue-900 font-bold">
                          R$ {msg.parsedAction.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-white border border-slate-200 text-slate-600">
                          <Tag className="h-3 w-3 mr-1 text-blue-500" />
                          {msg.parsedAction.category}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-white border border-slate-200 text-slate-600">
                          <CreditCard className="h-3 w-3 mr-1 text-slate-400" />
                          {msg.parsedAction.account}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-white border border-slate-200 text-slate-600">
                          <Calendar className="h-3 w-3 mr-1 text-slate-400" />
                          {msg.parsedAction.date}
                        </span>
                        {msg.parsedAction.installmentsCount && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 border border-indigo-200 text-indigo-700">
                            {msg.parsedAction.installmentsCount}x parcelado
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center space-x-2 text-xs text-blue-600 bg-blue-50 p-3 rounded-2xl border border-blue-200 w-fit">
                <Sparkles className="h-4 w-4 animate-spin text-blue-600" />
                <span>IA processando e organizando seu lançamento...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-[11px] font-medium text-slate-600 transition-colors border border-slate-200/60"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Voice Feedback Banner */}
          {isListening && (
            <div className="px-4 py-2 bg-rose-50 border-t border-rose-200 flex items-center justify-between text-xs text-rose-700 font-medium animate-pulse">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                <span>Ouvindo com atenção... Pode falar!</span>
              </div>
              <button 
                onClick={toggleVoiceRecording}
                className="text-[10px] font-bold text-rose-800 underline uppercase"
              >
                Parar
              </button>
            </div>
          )}

          {speechError && (
            <div className="px-4 py-1.5 bg-amber-50 border-t border-amber-200 text-[11px] text-amber-700">
              {speechError}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            {/* Mic Button */}
            <button
              onClick={toggleVoiceRecording}
              className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "bg-rose-500 text-white ring-4 ring-rose-200 scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
              title={isListening ? "Parar gravação" : "Falar por áudio"}
            >
              <Mic className="h-5 w-5" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              placeholder={isListening ? "Fale agora no microfone..." : "Digite ou fale sua despesa..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-slate-100 px-4 py-2.5 rounded-full text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-200"
            />

            {/* Send Button */}
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isProcessing}
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center transition-colors shadow-xs"
              title="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
