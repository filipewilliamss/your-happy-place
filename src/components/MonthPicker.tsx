import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useFinance } from "../context/FinanceContext";

const MONTH_NAMES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

const MONTH_ABBR = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export function MonthPicker() {
  const { selectedMonth, selectedYear, setSelectedMonth, setSelectedYear } = useFinance();
  const [open, setOpen] = useState(false);
  const [tempYear, setTempYear] = useState(selectedYear);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const toggleOpen = () => {
    if (!open) {
      setTempYear(selectedYear);
    }
    setOpen(!open);
  };

  const handleSelectMonth = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
    setSelectedYear(tempYear);
    setOpen(false);
  };

  const handleSetCurrentMonth = () => {
    const now = new Date();
    setSelectedMonth(now.getMonth());
    setSelectedYear(now.getFullYear());
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Button */}
      <button 
        onClick={toggleOpen}
        className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="capitalize">{MONTH_NAMES[selectedMonth]}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Pop-up Box matching reference image */}
      {open && (
        <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 w-[280px] bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Bar with Year and Navigation Chevrons */}
          <div className="bg-blue-600 text-white px-5 py-3.5 flex items-center justify-between">
            <button 
              type="button"
              onClick={() => setTempYear((prev) => prev - 1)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
              title="Ano anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="text-lg font-bold tracking-wider">
              {tempYear}
            </span>

            <button 
              type="button"
              onClick={() => setTempYear((prev) => prev + 1)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
              title="Próximo ano"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* 4x3 Month Grid */}
          <div className="grid grid-cols-4 gap-y-6 gap-x-2 p-6 bg-white text-center">
            {MONTH_ABBR.map((abbr, index) => {
              const isSelected = index === selectedMonth && tempYear === selectedYear;

              return (
                <button
                  type="button"
                  key={abbr}
                  onClick={() => handleSelectMonth(index)}
                  className={`py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? "text-blue-600 font-extrabold bg-blue-50 scale-105"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {abbr}
                </button>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between px-6 pb-5 pt-1 bg-white">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider transition-colors cursor-pointer"
            >
              CANCELAR
            </button>

            <button
              type="button"
              onClick={handleSetCurrentMonth}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider transition-colors cursor-pointer"
            >
              MÊS ATUAL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
