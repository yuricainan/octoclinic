import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarContent, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  ativo: "bg-green-100 text-green-800 border-green-200",
  inativo: "bg-red-100 text-red-800 border-red-200",
  ferias: "bg-yellow-100 text-yellow-800 border-yellow-200",
  licenca: "bg-blue-100 text-blue-800 border-blue-200"
};

const setorColors = {
  uti_geral: "bg-blue-50 text-blue-700",
  uti_cardiaca: "bg-red-50 text-red-700",
  uti_neurologia: "bg-purple-50 text-purple-700",
  uti_pediatrica: "bg-green-50 text-green-700",
  uti_neonatal: "bg-yellow-50 text-yellow-700"
};

export default function FuncionarioCard({ funcionario, onEdit, onStatusChange }) {
  const getInitials = (nome) => {
    return nome?.split(' ').map(n => n[0]).join('').toUpperCase() || 'UN';
  };

  const formatSetor = (setor) => {
    return setor?.replace('uti_', 'UTI ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatFuncao = (funcao) => {
    return funcao?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                {getInitials(funcionario.nome_completo)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 leading-tight">
                {funcionario.nome_completo}
              </h3>
              <p className="text-sm text-slate-600">
                {formatFuncao(funcionario.funcao)}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(funcionario)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(funcionario.id, 
                funcionario.status === 'ativo' ? 'inativo' : 'ativo')}>
                {funcionario.status === 'ativo' ? 'Desativar' : 'Ativar'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={statusColors[funcionario.status]}>
            {funcionario.status?.toUpperCase()}
          </Badge>
          <Badge variant="outline" className={setorColors[funcionario.setor]}>
            {formatSetor(funcionario.setor)}
          </Badge>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          {funcionario.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="truncate">{funcionario.email}</span>
            </div>
          )}
          
          {funcionario.telefone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{funcionario.telefone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Escala: {funcionario.escala_padrao?.replace('_', ' ')}</span>
          </div>

          {funcionario.cbo && (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                CBO: {funcionario.cbo}
              </span>
            </div>
          )}
        </div>

        {funcionario.data_admissao && (
          <div className="text-xs text-slate-500 pt-2 border-t">
            Admitido em {format(new Date(funcionario.data_admissao), 'dd/MM/yyyy')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}