import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function ModalPlantao({ plantao, date, funcionarios, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    funcionario_id: "",
    data_inicio: "",
    data_fim: "",
    setor: "",
    turno: "",
    tipo: "regular",
    observacoes: ""
  });

  useEffect(() => {
    if (plantao) {
      setFormData({
        ...plantao,
        data_inicio: format(parseISO(plantao.data_inicio), "yyyy-MM-dd'T'HH:mm"),
        data_fim: format(parseISO(plantao.data_fim), "yyyy-MM-dd'T'HH:mm")
      });
    } else if (date) {
      setFormData(prev => ({
        ...prev,
        data_inicio: format(date, "yyyy-MM-dd'T'07:00"),
        data_fim: format(date, "yyyy-MM-dd'T'19:00"),
      }));
    }
  }, [plantao, date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      data_inicio: new Date(formData.data_inicio).toISOString(),
      data_fim: new Date(formData.data_fim).toISOString(),
    };
    onSubmit(submissionData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              {plantao ? 'Editar Plantão' : 'Novo Plantão'}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="funcionario_id">Funcionário *</Label>
                <Select value={formData.funcionario_id} onValueChange={(value) => handleInputChange('funcionario_id', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o funcionário" />
                  </SelectTrigger>
                  <SelectContent>
                    {funcionarios.map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.nome_completo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="setor">Setor *</Label>
                <Select value={formData.setor} onValueChange={(value) => handleInputChange('setor', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uti_geral">UTI Geral</SelectItem>
                    <SelectItem value="uti_cardiaca">UTI Cardíaca</SelectItem>
                    <SelectItem value="uti_neurologia">UTI Neurologia</SelectItem>
                    <SelectItem value="uti_pediatrica">UTI Pediátrica</SelectItem>
                    <SelectItem value="uti_neonatal">UTI Neonatal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data_inicio">Início do Plantão *</Label>
                <Input
                  id="data_inicio"
                  type="datetime-local"
                  value={formData.data_inicio}
                  onChange={(e) => handleInputChange('data_inicio', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data_fim">Fim do Plantão *</Label>
                <Input
                  id="data_fim"
                  type="datetime-local"
                  value={formData.data_fim}
                  onChange={(e) => handleInputChange('data_fim', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="turno">Turno *</Label>
                <Select value={formData.turno} onValueChange={(value) => handleInputChange('turno', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o turno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manha">Manhã</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noite">Noite</SelectItem>
                    <SelectItem value="integral">Integral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value) => handleInputChange('tipo', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="extra">Extra</SelectItem>
                    <SelectItem value="troca">Troca</SelectItem> {/* Corrected from <eloctItem> */}
                    <SelectItem value="cobertura">Cobertura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                {plantao ? 'Atualizar' : 'Salvar'} Plantão
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
