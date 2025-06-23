import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

const statusColors = {
  pendente: "bg-yellow-100 text-yellow-800",
  aprovado: "bg-green-100 text-green-800",
  rejeitado: "bg-red-100 text-red-800",
  cancelado: "bg-gray-100 text-gray-800"
};

export default function TabelaTrocas({ trocas, funcionariosMap, isGestor, currentUserId, onUpdateStatus }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle>Solicitações de Troca de Plantão</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trocas.map(troca => (
            <div key={troca.id} className="p-4 border rounded-xl bg-white/60">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="text-center">
                      <p className="font-semibold">{funcionariosMap[troca.funcionario_solicitante_id]?.nome_completo || 'Desconhecido'}</p>
                      <p className="text-xs text-slate-500">Solicitante</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                    <div className="text-center">
                      <p className="font-semibold">{funcionariosMap[troca.funcionario_substituto_id]?.nome_completo || 'Desconhecido'}</p>
                      <p className="text-xs text-slate-500">Substituto</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600">{troca.motivo_solicitacao}</p>
                  <p className="text-xs text-slate-500">Solicitado em: {format(new Date(troca.data_solicitacao), "dd/MM/yyyy HH:mm")}</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Badge className={statusColors[troca.status]}>{troca.status?.toUpperCase()}</Badge>
                  {isGestor && troca.status === 'pendente' && (
                    <>
                      <Button variant="outline" size="icon" className="text-green-600" onClick={() => onUpdateStatus(troca.id, 'aprovado', currentUserId)}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-red-600" onClick={() => onUpdateStatus(troca.id, 'rejeitado', currentUserId)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          {trocas.length === 0 && <p className="text-center text-slate-500 py-8">Nenhuma solicitação de troca encontrada.</p>}
        </div>
      </CardContent>
    </Card>
  );
}