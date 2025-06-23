import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, User, MapPin } from "lucide-react";
import { format } from "date-fns";

const ocorrenciasRecentes = [
  {
    id: 1,
    titulo: "Equipamento com falha",
    tipo: "problema_equipamento",
    gravidade: "alta",
    setor: "UTI Geral",
    relator: "Enf. Ana Santos",
    data: new Date('2024-01-15T14:30:00'),
    status: "pendente"
  },
  {
    id: 2,
    titulo: "Medicação administrada incorretamente",
    tipo: "medicacao",
    gravidade: "critica",
    setor: "UTI Cardiaca",
    relator: "Dr. Carlos Silva",
    data: new Date('2024-01-15T10:15:00'),
    status: "em_investigacao"
  },
  {
    id: 3,
    titulo: "Conflito entre funcionários",
    tipo: "conflito_equipe",
    gravidade: "media",
    setor: "UTI Neurologia",
    relator: "Téc. Maria Oliveira",
    data: new Date('2024-01-14T22:45:00'),
    status: "resolvida"
  },
  {
    id: 4,
    titulo: "Procedimento inadequado",
    tipo: "procedimento_inadequado",
    gravidade: "alta",
    setor: "UTI Pediatrica",
    relator: "Enf. João Costa",
    data: new Date('2024-01-14T16:20:00'),
    status: "pendente"
  }
];

const gravidadeColors = {
  baixa: "bg-blue-100 text-blue-800 border-blue-200",
  media: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  alta: "bg-orange-100 text-orange-800 border-orange-200",
  critica: "bg-red-100 text-red-800 border-red-200"
};

const statusColors = {
  pendente: "bg-gray-100 text-gray-800 border-gray-200",
  em_investigacao: "bg-blue-100 text-blue-800 border-blue-200",
  resolvida: "bg-green-100 text-green-800 border-green-200",
  arquivada: "bg-slate-100 text-slate-800 border-slate-200"
};

export default function OcorrenciasRecentes() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Ocorrências Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ocorrenciasRecentes.map((ocorrencia) => (
            <div key={ocorrencia.id} className="p-4 border border-slate-200 rounded-xl bg-white/60 hover:bg-white/80 transition-colors">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{ocorrencia.titulo}</h4>
                    <p className="text-sm text-slate-600 capitalize mt-1">
                      {ocorrencia.tipo.replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={gravidadeColors[ocorrencia.gravidade]}>
                      {ocorrencia.gravidade.toUpperCase()}
                    </Badge>
                    <Badge className={statusColors[ocorrencia.status]}>
                      {ocorrencia.status.replace(/_/g, ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{ocorrencia.setor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{ocorrencia.relator}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{format(ocorrencia.data, 'dd/MM HH:mm')}</span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button size="sm" variant="outline">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}