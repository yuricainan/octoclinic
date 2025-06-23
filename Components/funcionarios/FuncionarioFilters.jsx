import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FuncionarioFilters({ filters, onFiltersChange }) {
  const setores = [
    { value: "todos", label: "Todos os Setores" },
    { value: "uti_geral", label: "UTI Geral" },
    { value: "uti_cardiaca", label: "UTI Cardíaca" },
    { value: "uti_neurologia", label: "UTI Neurologia" },
    { value: "uti_pediatrica", label: "UTI Pediátrica" },
    { value: "uti_neonatal", label: "UTI Neonatal" }
  ];

  const funcoes = [
    { value: "todos", label: "Todas as Funções" },
    { value: "medico", label: "Médico" },
    { value: "enfermeiro", label: "Enfermeiro" },
    { value: "tecnico_enfermagem", label: "Técnico de Enfermagem" },
    { value: "auxiliar_enfermagem", label: "Auxiliar de Enfermagem" },
    { value: "fisioterapeuta", label: "Fisioterapeuta" },
    { value: "nutricionista", label: "Nutricionista" }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select value={filters.setor} onValueChange={(value) => handleFilterChange('setor', value)}>
        <SelectTrigger className="bg-white/80">
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

      <Select value={filters.funcao} onValueChange={(value) => handleFilterChange('funcao', value)}>
        <SelectTrigger className="bg-white/80">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {funcoes.map((funcao) => (
            <SelectItem key={funcao.value} value={funcao.value}>
              {funcao.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
