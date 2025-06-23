import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import { Clock, MapPin, Phone } from "lucide-react";

const escalasHoje = [
  {
    id: 1,
    funcionario: "Dr. Ana Santos",
    funcao: "médico",
    setor: "UTI Geral",
    turno: "manha",
    horario: "07:00 - 19:00",
    status: "ativo",
    telefone: "(11) 99999-9999"
  },
  {
    id: 2,
    funcionario: "Enf. Carlos Silva",
    funcao: "enfermeiro",
    setor: "UTI Cardiaca", 
    turno: "manha",
    horario: "07:00 - 19:00",
    status: "ativo",
    telefone: "(11) 99999-8888"
  },
  {
    id: 3,
    funcionario: "Téc. Maria Oliveira",
    funcao: "tecnico_enfermagem",
    setor: "UTI Geral",
    turno: "noite",
    horario: "19:00 - 07:00",
    status: "agendado",
    telefone: "(11) 99999-7777"
  },
  {
    id: 4,
    funcionario: "Dr. João Costa",
    funcao: "médico",
    setor: "UTI Neurologia",
    turno: "tarde",
    horario: "13:00 - 19:00",
    status: "ativo",
    telefone: "(11) 99999-6666"
  },
  {
    id: 5,
    funcionario: "Enf. Laura Pereira",
    funcao: "enfermeiro",
    setor: "UTI Pediatrica",
    turno: "noite",
    horario: "19:00 - 07:00",
    status: "agendado",
    telefone: "(11) 99999-5555"
  }
];

const statusColors = {
  ativo: "bg-green-100 text-green-800 border-green-200",
  agendado: "bg-blue-100 text-blue-800 border-blue-200",
  ausente: "bg-red-100 text-red-800 border-red-200"
};

const setorColors = {
  "UTI Geral": "bg-blue-50 text-blue-700",
  "UTI Cardiaca": "bg-red-50 text-red-700",
  "UTI Neurologia": "bg-purple-50 text-purple-700",
  "UTI Pediatrica": "bg-green-50 text-green-700",
  "UTI Neonatal": "bg-yellow-50 text-yellow-700"
};

export default function EscalaHoje() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Escala de Hoje
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {escalasHoje.map((escala) => (
            <div key={escala.id} className="p-4 border border-slate-200 rounded-xl bg-white/60 hover:bg-white/80 transition-colors">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                    {escala.funcionario.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-900">{escala.funcionario}</h4>
                      <p className="text-sm text-slate-600 capitalize">{escala.funcao.replace('_', ' ')}</p>
                    </div>
                    <Badge className={statusColors[escala.status]}>
                      {escala.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <Badge variant="outline" className={setorColors[escala.setor]}>
                        {escala.setor}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{escala.horario}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{escala.telefone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}