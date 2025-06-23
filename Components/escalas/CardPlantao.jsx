import React from "react";
import { format } from "date-fns";

const setorColors = {
  uti_geral: "bg-blue-500",
  uti_cardiaca: "bg-red-500",
  uti_neurologia: "bg-purple-500",
  uti_pediatrica: "bg-green-500",
  uti_neonatal: "bg-yellow-500"
};

export default function CardPlantao({ plantao, funcionario, onSelect }) {
  const nomeCurto = funcionario?.nome_completo?.split(' ').slice(0, 2).join(' ') || "Desconhecido";
  
  return (
    <div 
      onClick={onSelect}
      className="p-1 lg:p-1.5 rounded-md text-xs cursor-pointer hover:shadow-md transition-shadow"
      style={{ backgroundColor: setorColors[plantao.setor] ? `${setorColors[plantao.setor].replace('500', '100')}` : '#f1f5f9' }}
    >
      <div 
        className="font-semibold text-xs lg:text-sm leading-tight"
        style={{ color: setorColors[plantao.setor] ? `${setorColors[plantao.setor].replace('500', '800')}` : '#1e293b' }}
      >
        {nomeCurto}
      </div>
      <div 
        className="text-xs leading-tight"
        style={{ color: setorColors[plantao.setor] ? `${setorColors[plantao.setor].replace('500', '600')}` : '#64748b' }}
      >
        {format(new Date(plantao.data_inicio), 'HH:mm')} - {format(new Date(plantao.data_fim), 'HH:mm')}
      </div>
    </div>
  );
}
