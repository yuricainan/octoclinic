import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, Clock } from "lucide-react";

export default function ModalRegistroFalta({ registro, funcionarios, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(registro || {
    funcionario_id: "",
    data_falta: new Date().toISOString().split('T')[0],
    tipo: "falta",
    motivo: "",
    justificativa: "",
    status: "pendente"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg bg-white shadow-2xl">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Clock />Registrar Falta/Atraso</CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}><X /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="funcionario_id">Funcionário *</Label>
              <Select value={formData.funcionario_id} onValueChange={(v) => handleInputChange('funcionario_id', v)} required>
                <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                <SelectContent>{funcionarios.map(f => <SelectItem key={f.id} value={f.id}>{f.nome_completo}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data_falta">Data *</Label>
                <Input id="data_falta" type="date" value={formData.data_falta} onChange={(e) => handleInputChange('data_falta', e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo *</Label>
                <Select value={formData.tipo} onValueChange={(v) => handleInputChange('tipo', v)} required>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="falta">Falta</SelectItem>
                    <SelectItem value="atraso">Atraso</SelectItem>
                    <SelectItem value="saida_antecipada">Saída Antecipada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="motivo">Motivo *</Label>
              <Select value={formData.motivo} onValueChange={(v) => handleInputChange('motivo', v)} required>
                <SelectTrigger><SelectValue placeholder="Selecione o motivo..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="doenca">Doença</SelectItem>
                  <SelectItem value="problema_familiar">Problema Familiar</SelectItem>
                  <SelectItem value="transporte">Transporte</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="justificativa">Justificativa</Label>
              <Textarea id="justificativa" value={formData.justificativa} onChange={(e) => handleInputChange('justificativa', e.target.value)} rows={3} />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700"><Save className="w-4 h-4 mr-2" /> Salvar</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}