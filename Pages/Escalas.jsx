import React, { useState, useEffect, useMemo } from "react";
import { Plantao } from "@/entities/Plantao";
import { Funcionario } from "@/entities/Funcionario";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, eachDayOfInterval, isSameMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

import FiltrosEscala from "../components/escalas/FiltrosEscala";
import Calendario from "../components/escalas/Calendario";
import ModalPlantao from "../components/escalas/ModalPlantao";

export default function Escalas() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [plantoes, setPlantoes] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [filters, setFilters] = useState({ setor: "todos", funcionario: "todos" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlantao, setSelectedPlantao] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    loadFuncionarios();
    loadPlantoes();
  }, []);

  const loadPlantoes = async () => {
    const data = await Plantao.list("-data_inicio");
    setPlantoes(data);
  };

  const loadFuncionarios = async () => {
    const data = await Funcionario.filter({ status: "ativo" });
    setFuncionarios(data);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleOpenModal = (plantao = null, date = null) => {
    setSelectedPlantao(plantao);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlantao(null);
    setSelectedDate(null);
  };

  const handleSubmitPlantao = async (plantaoData) => {
    if (selectedPlantao) {
      await Plantao.update(selectedPlantao.id, plantaoData);
    } else {
      await Plantao.create(plantaoData);
    }
    loadPlantoes();
    handleCloseModal();
  };

  const filteredPlantoes = useMemo(() => {
    return plantoes.filter(p => {
      const setorMatch = filters.setor === 'todos' || p.setor === filters.setor;
      const funcionarioMatch = filters.funcionario === 'todos' || p.funcionario_id === filters.funcionario;
      return setorMatch && funcionarioMatch;
    });
  }, [plantoes, filters]);

  const funcionariosMap = useMemo(() => {
    return funcionarios.reduce((acc, func) => {
      acc[func.id] = func;
      return acc;
    }, {});
  }, [funcionarios]);

  return (
    <div className="p-3 lg:p-6 space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Gestão de Escalas e Plantões
            </h1>
            <p className="text-sm lg:text-base text-slate-600">
              Visualize, crie e gerencie as escalas da equipe.
            </p>
          </div>
          <Button 
            onClick={() => handleOpenModal(null, new Date())}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg w-full lg:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Plantão
          </Button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
          <header className="p-3 lg:p-4 border-b border-slate-200/60 flex flex-col gap-4">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-lg lg:text-xl font-semibold text-slate-800 capitalize w-40 lg:w-48 text-center">
                {format(currentMonth, "MMMM yyyy", { locale: ptBR })}
              </h2>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="overflow-x-auto">
              <FiltrosEscala 
                filters={filters} 
                onFiltersChange={setFilters} 
                funcionarios={funcionarios} 
              />
            </div>
          </header>

          <Calendario
            currentMonth={currentMonth}
            plantoes={filteredPlantoes}
            funcionariosMap={funcionariosMap}
            onSelectPlantao={(plantao) => handleOpenModal(plantao)}
            onAddPlantao={(date) => handleOpenModal(null, date)}
          />
        </div>
      </div>
      
      {isModalOpen && (
        <ModalPlantao
          plantao={selectedPlantao}
          date={selectedDate}
          funcionarios={funcionarios}
          onCancel={handleCloseModal}
          onSubmit={handleSubmitPlantao}
        />
      )}
    </div>
  );
}
