import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, FileText } from "lucide-react";

const statusColors = {
  pendente: "bg-yellow-100 text-yellow-800",
  aprovado: "bg-green-100 text-green-800",
  rejeitado: "bg-red-100 text-red-800"
};

const tipoColors = {
  falta: "bg-red-50 text-red-700",
  atraso: "bg-orange-50 text-orange-700",
  saida_antecipada: "bg-purple-50 text-purple-700"
};

export default function TabelaFaltas({ faltas, funcionariosMap, isGestor, currentUserId, onUpdateStatus }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="p-4 lg:p-6">
        <CardTitle className="text-lg lg:text-xl">Histórico de Faltas e Atrasos</CardTitle>
      </CardHeader>
      <CardContent className="p-3 lg:p-6">
        <div className="space-y-3 lg:space-y-4">
          {faltas.map(falta => (
            <div key={falta.id} className="p-3 lg:p-4 border rounded-xl bg-white/60">
              <div className="space-y-3 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:items-center">
                <div>
                  <div className="font-semibold text-sm lg:text-base">{funcionariosMap[falta.funcionario_id]?.nome_completo || 'Desconhecido'}</div>
                  <div className="text-xs lg:text-sm text-slate-500">{format(new Date(falta.data_falta), "dd/MM/yyyy")}</div>
                </div>
                <div className="flex lg:justify-center">
                  <Badge className={tipoColors[falta.tipo]}>{falta.tipo?.replace(/_/g, ' ').toUpperCase()}</Badge>
                </div>
                <div className="text-xs lg:text-sm text-slate-600 lg:col-span-2">
                  <p><strong>Motivo:</strong> {falta.motivo}</p>
                  <p><strong>Justificativa:</strong> {falta.justificativa || 'N/A'}</p>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-2">
                  <Badge className={statusColors[falta.status]}>{falta.status?.toUpperCase()}</Badge>
                  <div className="flex gap-2">
                    {falta.arquivo_anexo_url && (
                      <a href={falta.arquivo_anexo_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="h-8 w-8"><FileText className="w-4 h-4" /></Button>
                      </a>
                    )}
                    {isGestor && falta.status === 'pendente' && (
                      <>
                        <Button variant="outline" size="icon" className="text-green-600 h-8 w-8" onClick={() => onUpdateStatus(falta.id, 'aprovado', currentUserId)}>
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-600 h-8 w-8" onClick={() => onUpdateStatus(falta.id, 'rejeitado', currentUserId)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {faltas.length === 0 && <p className="text-center text-slate-500 py-8 text-sm lg:text-base">Nenhum registro de falta encontrado.</p>}
        </div>
      </CardContent>
    </Card>
  );
}