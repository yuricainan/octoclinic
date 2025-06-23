import React, { useState } from "react";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, AlertTriangle } from "lucide-react";

export default function ModalOcorrencia({ ocorrencia, funcionarios, onSubmit, onCancel }) {
  const [user, setUser] = useState(null);
  React.useEffect(() => {
    User.me().then(setUser);
  }, []);

  const [formData, setFormData] = useState(ocorrencia || {
    titulo: "",
    tipo: "",
    descricao: "",
    setor: "",
    data_ocorrencia: new Date().toISOString().substring(0, 16),
    gravidade: "media",
    status: "pendente",
    funcionario_relator_id: user?.id || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({...formData, funcionario_relator_id: user.id});
  };

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><AlertTriangle />{ocorrencia ? 'Editar' : 'Registrar'} Ocorrência</CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}><X /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="titulo">Título *</Label><Input id="titulo" value={formData.titulo} onChange={e => handleInputChange('titulo', e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="descricao">Descrição Detalhada *</Label><Textarea id="descricao" value={formData.descricao} onChange={e => handleInputChange('descricao', e.target.value)} required rows={4} /></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo *</Label>
                <Select value={formData.tipo} onValueChange={v => handleInputChange('tipo', v)} required><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="incidente_paciente">Incidente com Paciente</SelectItem><SelectItem value="problema_equipamento">Problema com Equipamento</SelectItem><SelectItem value="conflito_equipe">Conflito de Equipe</SelectItem><SelectItem value="procedimento_inadequado">Procedimento Inadequado</SelectItem><SelectItem value="medicacao">Medicação</SelectItem><SelectItem value="outros">Outros</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="setor">Setor *</Label>
                <Select value={formData.setor} onValueChange={v => handleInputChange('setor', v)} required><SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger><SelectContent><SelectItem value="uti_geral">UTI Geral</SelectItem><SelectItem value="uti_cardiaca">UTI Cardíaca</SelectItem><SelectItem value="uti_neurologia">UTI Neurologia</SelectItem><SelectItem value="uti_pediatrica">UTI Pediátrica</SelectItem><SelectItem value="uti_neonatal">UTI Neonatal</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_ocorrencia">Data e Hora *</Label><Input id="data_ocorrencia" type="datetime-local" value={formData.data_ocorrencia} onChange={e => handleInputChange('data_ocorrencia', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gravidade">Gravidade *</Label>
                <Select value={formData.gravidade} onValueChange={v => handleInputChange('gravidade', v)} required><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="baixa">Baixa</SelectItem><SelectItem value="media">Média</SelectItem><SelectItem value="alta">Alta</SelectItem><SelectItem value="critica">Crítica</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={v => handleInputChange('status', v)} required><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pendente">Pendente</SelectItem><SelectItem value="em_investigacao">Em Investigação</SelectItem><SelectItem value="resolvida">Resolvida</SelectItem><SelectItem value="arquivada">Arquivada</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paciente_envolvido">Paciente Envolvido (Opcional)</Label><Input id="paciente_envolvido" value={formData.paciente_envolvido || ""} onChange={e => handleInputChange('paciente_envolvido', e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600"><Save className="w-4 h-4 mr-2" /> Salvar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}