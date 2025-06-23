import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function FiltrosEscala({ filters, onFiltersChange, funcionarios }) {
  const setores = [
    { value: "todos", label: "Todos os Setores" },
    { value: "uti_geral", label: "UTI Geral" },
    { value: "uti_cardiaca", label: "UTI Cardíaca" },
    { value: "uti_neurologia", label: "UTI Neurologia" },
    { value: "uti_pediatrica", label: "UTI Pediátrica" },
    { value: "uti_neonatal", label: "UTI Neonatal" }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="flex items-center gap-2 min-w-max">
      <Filter className="w-4 h-4 text-slate-500 flex-shrink-0" />
      
      <Select value={filters.setor} onValueChange={(value) => handleFilterChange('setor', value)}>
        <SelectTrigger className="w-[160px] lg:w-[180px] bg-white/80">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {setores.map((setor) => (
            <SelectItem key={setor.value} value={setor.value}>
              {setor.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.funcionario} onValueChange={(value) => handleFilterChange('funcionario', value)}>
        <SelectTrigger className="w-[180px] lg:w-[220px] bg-white/80">
          <SelectValue placeholder="Todos os Funcionários" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos os Funcionários</SelectItem>
          {funcionarios.map((func) => (
            <SelectItem key={func.id} value={func.id}>
              {func.nome_completo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
