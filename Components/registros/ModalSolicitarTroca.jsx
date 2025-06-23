import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Save, Repeat } from "lucide-react";

export default function ModalSolicitarTroca({ solicitacao, funcionarios, currentUser, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(solicitacao || {
    funcionario_solicitante_id: currentUser?.id || "",
    funcionario_substituto_id: "",
    // TODO: Add plantao_original_id select field
    plantao_original_id: "temp_plantao_id", // Placeholder
    motivo_solicitacao: "",
    status: "pendente",
    data_solicitacao: new Date().toISOString()
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
            <CardTitle className="flex items-center gap-2"><Repeat />Solicitar Troca de Plantão</CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}><X /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Solicitante</Label>
              <p className="font-semibold p-2 border rounded-md bg-slate-50">{currentUser?.full_name}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="funcionario_substituto_id">Substituto *</Label>
              <Select value={formData.funcionario_substituto_id} onValueChange={(v) => handleInputChange('funcionario_substituto_id', v)} required>
                <SelectTrigger><SelectValue placeholder="Selecione o colega..." /></SelectTrigger>
                <SelectContent>{funcionarios.filter(f => f.id !== currentUser.id).map(f => <SelectItem key={f.id} value={f.id}>{f.nome_completo}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Plantão a ser trocado *</Label>
              <Select disabled>
                <SelectTrigger><SelectValue placeholder="Selecione seu plantão (feature em breve)" /></SelectTrigger>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="motivo_solicitacao">Motivo da Solicitação *</Label>
              <Textarea id="motivo_solicitacao" value={formData.motivo_solicitacao} onChange={(e) => handleInputChange('motivo_solicitacao', e.target.value)} rows={3} required />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700"><Save className="w-4 h-4 mr-2" /> Enviar Solicitação</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}