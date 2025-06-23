import React from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import CardPlantao from "./CardPlantao";
import { Plus } from "lucide-react";

export default function Calendario({ currentMonth, plantoes, funcionariosMap, onSelectPlantao, onAddPlantao }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = [];
  let day = startDate;
  
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <div className="p-2 lg:p-4">
      <div className="grid grid-cols-7 text-center font-semibold text-slate-600 text-xs lg:text-sm">
        {weekDays.map(dayName => (
          <div key={dayName} className="py-2">{dayName}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5 lg:gap-1">
        {days.map((date) => {
          const plantoesDoDia = plantoes.filter(p => isSameDay(new Date(p.data_inicio), date));
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isToday = isSameDay(date, new Date());

          return (
            <div 
              key={date.toString()}
              className={`relative flex flex-col p-1 lg:p-2 min-h-[80px] lg:min-h-[120px] rounded-lg border transition-colors ${
                isCurrentMonth ? 'bg-white/50 border-slate-200/80' : 'bg-slate-50/50 border-slate-100/80 text-slate-400'
              }`}
            >
              <div className="flex justify-between items-center mb-1 lg:mb-2">
                <span className={`font-medium text-xs lg:text-sm ${isToday ? 'bg-blue-500 text-white rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-xs' : ''}`}>
                  {format(date, "d")}
                </span>
                <button 
                  onClick={() => onAddPlantao(date)}
                  className="p-0.5 lg:p-1 rounded-full text-slate-400 hover:bg-blue-100 hover:text-blue-600 transition-colors opacity-0 hover:opacity-100"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>

              <div className="space-y-0.5 lg:space-y-1 overflow-y-auto flex-1">
                {plantoesDoDia.map(plantao => (
                  <CardPlantao
                    key={plantao.id}
                    plantao={plantao}
                    funcionario={funcionariosMap[plantao.funcionario_id]}
                    onSelect={() => onSelectPlantao(plantao)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
