import React, { useState, useEffect } from "react";
import { Funcionario } from "@/entities/Funcionario";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Users, UserCheck, UserX } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FuncionarioCard from "../components/funcionarios/FuncionarioCard";
import FuncionarioForm from "../components/funcionarios/FuncionarioForm";
import FuncionarioStats from "../components/funcionarios/FuncionarioStats";
import FuncionarioFilters from "../components/funcionarios/FuncionarioFilters";

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFuncionario, setEditingFuncionario] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [filters, setFilters] = useState({
    setor: "todos",
    funcao: "todos",
    status: "todos"
  });

  useEffect(() => {
    loadFuncionarios();
  }, []);

  useEffect(() => {
    filterFuncionarios();
  }, [funcionarios, searchTerm, activeTab, filters]);

  const loadFuncionarios = async () => {
    const data = await Funcionario.list("-created_date");
    setFuncionarios(data);
  };

  const filterFuncionarios = () => {
    let filtered = funcionarios;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(f => 
        f.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.cpf?.includes(searchTerm) ||
        f.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tab
    if (activeTab !== "todos") {
      filtered = filtered.filter(f => f.status === activeTab);
    }

    // Filter by additional filters
    if (filters.setor !== "todos") {
      filtered = filtered.filter(f => f.setor === filters.setor);
    }
    if (filters.funcao !== "todos") {
      filtered = filtered.filter(f => f.funcao === filters.funcao);
    }
    if (filters.status !== "todos") {
      filtered = filtered.filter(f => f.status === filters.status);
    }

    setFilteredFuncionarios(filtered);
  };

  const handleSubmit = async (funcionarioData) => {
    if (editingFuncionario) {
      await Funcionario.update(editingFuncionario.id, funcionarioData);
    } else {
      await Funcionario.create(funcionarioData);
    }
    setShowForm(false);
    setEditingFuncionario(null);
    loadFuncionarios();
  };

  const handleEdit = (funcionario) => {
    setEditingFuncionario(funcionario);
    setShowForm(true);
  };

  const handleStatusChange = async (funcionarioId, newStatus) => {
    await Funcionario.update(funcionarioId, { status: newStatus });
    loadFuncionarios();
  };

  const getStats = () => {
    const total = funcionarios.length;
    const ativos = funcionarios.filter(f => f.status === 'ativo').length;
    const inativos = funcionarios.filter(f => f.status === 'inativo').length;
    const ferias = funcionarios.filter(f => f.status === 'ferias').length;
    
    return { total, ativos, inativos, ferias };
  };

  const stats = getStats();

  return (
    <div className="p-3 lg:p-6 space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Gestão de Funcionários
            </h1>
            <p className="text-sm lg:text-base text-slate-600">
              Gerencie a equipe da UTI e suas informações
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg w-full lg:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Funcionário
          </Button>
        </div>

        {/* Stats Cards */}
        <FuncionarioStats stats={stats} />

        {/* Search and Filters */}
        <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nome, CPF ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80"
            />
          </div>
          <FuncionarioFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/60 backdrop-blur-sm h-auto">
            <TabsTrigger value="todos" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <Users className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Todos ({stats.total})</span>
              <span className="lg:hidden">Todos</span>
            </TabsTrigger>
            <TabsTrigger value="ativo" className="data-[state=active]:bg-green-50 text-xs lg:text-sm p-2 lg:p-3">
              <UserCheck className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Ativos ({stats.ativos})</span>
              <span className="lg:hidden">Ativos</span>
            </TabsTrigger>
            <TabsTrigger value="ferias" className="data-[state=active]:bg-yellow-50 text-xs lg:text-sm p-2 lg:p-3">
              <span className="hidden lg:inline">Férias ({stats.ferias})</span>
              <span className="lg:hidden">Férias</span>
            </TabsTrigger>
            <TabsTrigger value="inativo" className="data-[state=active]:bg-red-50 text-xs lg:text-sm p-2 lg:p-3">
              <UserX className="w-4 h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Inativos ({stats.inativos})</span>
              <span className="lg:hidden">Inativos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredFuncionarios.map((funcionario) => (
                <FuncionarioCard
                  key={funcionario.id}
                  funcionario={funcionario}
                  onEdit={handleEdit}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
            
            {filteredFuncionarios.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">
                  Nenhum funcionário encontrado
                </h3>
                <p className="text-slate-500">
                  Tente ajustar os filtros ou adicionar novos funcionários
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Form Modal */}
        {showForm && (
          <FuncionarioForm
            funcionario={editingFuncionario}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingFuncionario(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
