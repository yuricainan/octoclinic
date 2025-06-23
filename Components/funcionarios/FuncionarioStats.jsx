import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Calendar } from "lucide-react";

export default function FuncionarioStats({ stats }) {
  const cards = [
    {
      title: "Total de Funcionários",
      value: stats.total,
      icon: Users,
      color: "blue"
    },
    {
      title: "Funcionários Ativos", 
      value: stats.ativos,
      icon: UserCheck,
      color: "green"
    },
    {
      title: "Em Férias",
      value: stats.ferias,
      icon: Calendar,
      color: "yellow"
    },
    {
      title: "Inativos",
      value: stats.inativos,
      icon: UserX,
      color: "red"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500", 
    red: "bg-red-500"
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
      {cards.map((card) => (
        <Card key={card.title} className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="pb-2 p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div className={`p-2 lg:p-3 rounded-xl ${colorClasses[card.color]} bg-opacity-10`}>
                <card.icon className={`w-4 lg:w-6 h-4 lg:h-6 ${colorClasses[card.color].replace('bg-', 'text-')}`} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0 p-3 lg:p-4">
            <div className="space-y-1">
              <p className="text-xs lg:text-sm font-medium text-slate-600">{card.title}</p>
              <p className="text-lg lg:text-2xl font-bold text-slate-900">{card.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
