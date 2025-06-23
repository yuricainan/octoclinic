import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, User } from "lucide-react";
import { Funcao } from "@/entities/Funcao";
import { Setor } from "@/entities/Setor";
import { EscalaPadrao } from "@/entities/EscalaPadrao";

export default function FuncionarioForm({ funcionario, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(funcionario || {
    nome_completo: "",
    cpf: "",
    telefone: "",
    email: "",
    endereco: "",
    data_nascimento: "",
    data_admissao: "",
    funcao_id: "",
    cbo: "",
    setor_id: "",
    escala_padrao_id: "",
    carga_horaria_semanal: 40,
    salario: 0,
    status: "ativo",
    observacoes: ""
  });
  
  const [funcoes, setFuncoes] = useState([]);
  const [setores, setSetores] = useState([]);
  const [escalas, setEscalas] = useState([]);

  useEffect(() => {
    async function loadOptions() {
      const [funcoesData, setoresData, escalasData] = await Promise.all([
        Funcao.list(),
        Setor.list(),
        EscalaPadrao.list()
      ]);
      setFuncoes(funcoesData);
      setSetores(setoresData);
      setEscalas(escalasData);
    }
    loadOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              {funcionario ? 'Editar Funcionário' : 'Novo Funcionário'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados Pessoais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                Dados Pessoais
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome_completo">Nome Completo *</Label>
                  <Input
                    id="nome_completo"
                    value={formData.nome_completo}
                    onChange={(e) => handleInputChange('nome_completo', e.target.value)}
                    required
                  />
                </div>
                
                {/* ... keep other personal data fields ... */}
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input id="cpf" value={formData.cpf} onChange={(e) => handleInputChange('cpf', e.target.value)} placeholder="000.000.000-00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" value={formData.telefone} onChange={(e) => handleInputChange('telefone', e.target.value)} placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_nascimento">Data de Nascimento</Label>
                  <Input id="data_nascimento" type="date" value={formData.data_nascimento} onChange={(e) => handleInputChange('data_nascimento', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data_admissao">Data de Admissão</Label>
                  <Input id="data_admissao" type="date" value={formData.data_admissao} onChange={(e) => handleInputChange('data_admissao', e.target.value)} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Textarea id="endereco" value={formData.endereco} onChange={(e) => handleInputChange('endereco', e.target.value)} rows={2} />
              </div>
            </div>

            {/* Dados Profissionais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                Dados Profissionais
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="funcao_id">Função *</Label>
                  <Select value={formData.funcao_id} onValueChange={(value) => handleInputChange('funcao_id', value)}>
                    <SelectTrigger><SelectValue placeholder="Selecione a função" /></SelectTrigger>
                    <SelectContent>
                      {funcoes.map(funcao => <SelectItem key={funcao.id} value={funcao.id}>{funcao.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cbo">CBO</Label>
                  <Input id="cbo" value={formData.cbo} onChange={(e) => handleInputChange('cbo', e.target.value)} placeholder="Código Brasileiro de Ocupações" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="setor_id">Setor *</Label>
                  <Select value={formData.setor_id} onValueChange={(value) => handleInputChange('setor_id', value)}>
                    <SelectTrigger><SelectValue placeholder="Selecione o setor" /></SelectTrigger>
                    <SelectContent>
                      {setores.map(setor => <SelectItem key={setor.id} value={setor.id}>{setor.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="escala_padrao_id">Escala Padrão *</Label>
                  <Select value={formData.escala_padrao_id} onValueChange={(value) => handleInputChange('escala_padrao_id', value)}>
                    <SelectTrigger><SelectValue placeholder="Selecione a escala" /></SelectTrigger>
                    <SelectContent>
                      {escalas.map(escala => <SelectItem key={escala.id} value={escala.id}>{escala.nome}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* ... keep other professional data fields ... */}
                <div className="space-y-2">
                  <Label htmlFor="carga_horaria_semanal">Carga Horária Semanal</Label>
                  <Input id="carga_horaria_semanal" type="number" value={formData.carga_horaria_semanal} onChange={(e) => handleInputChange('carga_horaria_semanal', parseInt(e.target.value))} min="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salario">Salário</Label>
                  <Input id="salario" type="number" step="0.01" value={formData.salario} onChange={(e) => handleInputChange('salario', parseFloat(e.target.value))} min="0" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="ferias">Férias</SelectItem>
                      <SelectItem value="licenca">Licença</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" value={formData.observacoes} onChange={(e) => handleInputChange('observacoes', e.target.value)} rows={3} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                {funcionario ? 'Atualizar' : 'Criar'} Funcionário
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}