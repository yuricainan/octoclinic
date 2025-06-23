import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { RegistroFalta } from "@/entities/RegistroFalta";
import { TrocaPlantao } from "@/entities/TrocaPlantao";
import { Funcionario } from "@/entities/Funcionario";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Repeat } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TabelaFaltas from "../components/registros/TabelaFaltas";
import TabelaTrocas from "../components/registros/TabelaTrocas";
import ModalRegistroFalta from "../components/registros/ModalRegistroFalta";
import ModalSolicitarTroca from "../components/registros/ModalSolicitarTroca";

export default function Registros() {
  const [user, setUser] = useState(null);
  const [faltas, setFaltas] = useState([]);
  const [trocas, setTrocas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [isGestor, setIsGestor] = useState(false);
  
  const [modalFaltaOpen, setModalFaltaOpen] = useState(false);
  const [modalTrocaOpen, setModalTrocaOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setIsGestor(currentUser.role === 'admin' || currentUser.perfil === 'gestor');
      
      const [faltasData, trocasData, funcionariosData] = await Promise.all([
        RegistroFalta.list("-data_falta"),
        TrocaPlantao.list("-data_solicitacao"),
        Funcionario.list()
      ]);

      setFaltas(faltasData);
      setTrocas(trocasData);
      setFuncionarios(funcionariosData);
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
    }
  };

  const funcionariosMap = React.useMemo(() => 
    funcionarios.reduce((acc, func) => {
      acc[func.id] = func;
      return acc;
    }, {}), 
  [funcionarios]);

  const handleOpenModal = (type, record = null) => {
    setEditingRecord(record);
    if (type === 'falta') setModalFaltaOpen(true);
    if (type === 'troca') setModalTrocaOpen(true);
  };

  const handleCloseModals = () => {
    setModalFaltaOpen(false);
    setModalTrocaOpen(false);
    setEditingRecord(null);
  };

  const handleSubmitFalta = async (data) => {
    if (editingRecord) {
      await RegistroFalta.update(editingRecord.id, data);
    } else {
      await RegistroFalta.create(data);
    }
    loadInitialData();
    handleCloseModals();
  };

  const handleSubmitTroca = async (data) => {
    if (editingRecord) {
      await TrocaPlantao.update(editingRecord.id, data);
    } else {
      await TrocaPlantao.create(data);
    }
    loadInitialData();
    handleCloseModals();
  };

  const handleUpdateStatus = async (type, id, status, gestorId, observacoes = "") => {
    const data = { 
      status, 
      aprovado_por: gestorId, 
      data_aprovacao: new Date().toISOString() 
    };
    if (observacoes) data.observacoes_gestor = observacoes;

    if (type === 'falta') {
      await RegistroFalta.update(id, data);
    } else if (type === 'troca') {
      await TrocaPlantao.update(id, data);
    }
    loadInitialData();
  };

  return (
    <div className="p-3 lg:p-6 space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Registros e Solicitações
            </h1>
            <p className="text-sm lg:text-base text-slate-600">
              Acompanhe faltas, atrasos e trocas de plantão da equipe.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-2">
            <Button onClick={() => handleOpenModal('falta')} variant="outline" className="w-full lg:w-auto">
              <Clock className="w-4 h-4 mr-2" />
              Registrar Falta/Atraso
            </Button>
            <Button onClick={() => handleOpenModal('troca')} className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto">
              <Repeat className="w-4 h-4 mr-2" />
              Solicitar Troca
            </Button>
          </div>
        </div>

        <Tabs defaultValue="faltas" className="space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/60 backdrop-blur-sm h-auto">
            <TabsTrigger value="faltas" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <Clock className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Faltas e Atrasos</span>
              <span className="lg:hidden">Faltas</span>
            </TabsTrigger>
            <TabsTrigger value="trocas" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <Repeat className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Trocas de Plantão</span>
              <span className="lg:hidden">Trocas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faltas">
            <TabelaFaltas 
              faltas={faltas}
              funcionariosMap={funcionariosMap}
              isGestor={isGestor}
              currentUserId={user?.id}
              onUpdateStatus={(...args) => handleUpdateStatus('falta', ...args)}
            />
          </TabsContent>
          <TabsContent value="trocas">
            <TabelaTrocas
              trocas={trocas}
              funcionariosMap={funcionariosMap}
              isGestor={isGestor}
              currentUserId={user?.id}
              onUpdateStatus={(...args) => handleUpdateStatus('troca', ...args)}
            />
          </TabsContent>
        </Tabs>
      </div>

      {modalFaltaOpen && (
        <ModalRegistroFalta
          registro={editingRecord}
          funcionarios={funcionarios}
          onCancel={handleCloseModals}
          onSubmit={handleSubmitFalta}
        />
      )}

      {modalTrocaOpen && (
        <ModalSolicitarTroca
          solicitacao={editingRecord}
          funcionarios={funcionarios}
          currentUser={user}
          onCancel={handleCloseModals}
          onSubmit={handleSubmitTroca}
        />
      )}
    </div>
  );
}
