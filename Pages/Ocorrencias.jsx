import React, { useState, useEffect } from "react";
import { Ocorrencia } from "@/entities/Ocorrencia";
import { Funcionario } from "@/entities/Funcionario";
import { Button } from "@/components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";

import TabelaOcorrencias from "../components/ocorrencias/TabelaOcorrencias";
import ModalOcorrencia from "../components/ocorrencias/ModalOcorrencia";

export default function Ocorrencias() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOcorrencia, setEditingOcorrencia] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [ocorrenciasData, funcionariosData] = await Promise.all([
      Ocorrencia.list("-data_ocorrencia"),
      Funcionario.list()
    ]);
    setOcorrencias(ocorrenciasData);
    setFuncionarios(funcionariosData);
  };

  const handleOpenModal = (ocorrencia = null) => {
    setEditingOcorrencia(ocorrencia);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOcorrencia(null);
  };

  const handleSubmit = async (data) => {
    if (editingOcorrencia) {
      await Ocorrencia.update(editingOcorrencia.id, data);
    } else {
      await Ocorrencia.create(data);
    }
    loadData();
    handleCloseModal();
  };

  const funcionariosMap = React.useMemo(() => 
    funcionarios.reduce((acc, func) => {
      acc[func.id] = func;
      return acc;
    }, {}), 
  [funcionarios]);

  return (
    <div className="p-3 lg:p-6 space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Painel de Ocorrências Internas
            </h1>
            <p className="text-sm lg:text-base text-slate-600">
              Registre e acompanhe incidentes e eventos internos da UTI.
            </p>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-orange-500 hover:bg-orange-600 w-full lg:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Nova Ocorrência
          </Button>
        </div>
        
        <TabelaOcorrencias 
          ocorrencias={ocorrencias} 
          funcionariosMap={funcionariosMap} 
          onEdit={handleOpenModal} 
        />
      </div>

      {isModalOpen && (
        <ModalOcorrencia
          ocorrencia={editingOcorrencia}
          funcionarios={funcionarios}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}
