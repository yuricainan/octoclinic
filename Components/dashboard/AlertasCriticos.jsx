import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Users, Calendar } from "lucide-react";

const alertas = [
  {
    id: 1,
    tipo: "cobertura",
    titulo: "Cobertura de Escala Baixa",
    descricao: "UTI Cardiaca - Turno da noite com apenas 2 enfermeiros",
    prioridade: "alta",
    setor: "UTI Cardiaca",
    prazo: "2 horas"
  },
  {
    id: 2,
    tipo: "falta",
    titulo: "Funcionário Ausente",
    descricao: "Maria Silva não compareceu ao plantão sem justificativa",
    prioridade: "media",
    setor: "UTI Geral",
    prazo: "Imediato"
  },
  {
    id: 3,
    tipo: "troca",
    titulo: "Trocas Pendentes",
    descricao: "5 solicitações de troca aguardando aprovação",
    prioridade: "media",
    setor: "Todos",
    prazo: "24 horas"
  },
  {
    id: 4,
    tipo: "horas_extra",
    titulo: "Excesso de Horas Extras",
    descricao: "João Santos acumulou 20h extras esta semana",
    prioridade: "baixa",
    setor: "UTI Neurologia",
    prazo: "Esta semana"
  }
];

const prioridadeColors = {
  alta: "bg-red-100 text-red-800 border-red-200",
  media: "bg-yellow-100 text-yellow-800 border-yellow-200",
  baixa: "bg-blue-100 text-blue-800 border-blue-200"
};

const iconMap = {
  cobertura: Users,
  falta: Clock,
  troca: Calendar,
  horas_extra: AlertTriangle
};

export default function AlertasCriticos() {
  return (
    <div className="space-y-4">
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Alertas Críticos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertas.map((alerta) => {
              const IconComponent = iconMap[alerta.tipo];
              return (
                <div key={alerta.id} className="p-4 border border-slate-200 rounded-xl bg-white/60 hover:bg-white/80 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      alerta.prioridade === 'alta' ? 'bg-red-100' :
                      alerta.prioridade === 'media' ? 'bg-yellow-100' : 'bg-blue-100'
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        alerta.prioridade === 'alta' ? 'text-red-600' :
                        alerta.prioridade === 'media' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-slate-900">{alerta.titulo}</h4>
                        <Badge className={prioridadeColors[alerta.prioridade]}>
                          {alerta.prioridade.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-slate-600">{alerta.descricao}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Setor: {alerta.setor}</span>
                          <span>Prazo: {alerta.prazo}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Resolver
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}