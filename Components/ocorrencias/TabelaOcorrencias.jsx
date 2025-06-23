import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const gravidadeColors = {
  baixa: "bg-blue-100 text-blue-800",
  media: "bg-yellow-100 text-yellow-800", 
  alta: "bg-orange-100 text-orange-800",
  critica: "bg-red-100 text-red-800"
};

const statusColors = {
  pendente: "bg-gray-200 text-gray-800",
  em_investigacao: "bg-blue-200 text-blue-800",
  resolvida: "bg-green-200 text-green-800",
  arquivada: "bg-slate-200 text-slate-800"
};

export default function TabelaOcorrencias({ ocorrencias, funcionariosMap, onEdit }) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle>Histórico de Ocorrências</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ocorrencias.map(item => (
            <div key={item.id} className="p-4 border rounded-xl bg-white/60">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-start">
                <div className="md:col-span-3">
                  <h4 className="font-semibold">{item.titulo}</h4>
                  <p className="text-sm text-slate-600">{item.descricao}</p>
                </div>
                <div>
                  <Badge className="capitalize">{item.tipo.replace(/_/g, ' ')}</Badge>
                  <div className="text-sm text-slate-500 mt-1">{item.setor.replace('uti_', 'UTI ')}</div>
                </div>
                <div>
                  <Badge className={gravidadeColors[item.gravidade]}>{item.gravidade.toUpperCase()}</Badge>
                  <div className="text-sm text-slate-500 mt-1">
                    {format(new Date(item.data_ocorrencia), "dd/MM/yy HH:mm")}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Badge className={statusColors[item.status]}>{item.status.replace(/_/g, ' ').toUpperCase()}</Badge>
                  <Button variant="outline" size="icon" onClick={() => onEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
           {ocorrencias.length === 0 && <p className="text-center text-slate-500 py-8">Nenhuma ocorrência encontrada.</p>}
        </div>
      </CardContent>
    </Card>
  );
}