import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp } from "lucide-react";

const dadosMensais = [
  { mes: 'Jan', faltas: 12, trocas: 8, horas_extras: 45 },
  { mes: 'Fev', faltas: 9, trocas: 12, horas_extras: 52 },
  { mes: 'Mar', faltas: 15, trocas: 10, horas_extras: 38 },
  { mes: 'Abr', faltas: 8, trocas: 15, horas_extras: 65 },
  { mes: 'Mai', faltas: 11, trocas: 9, horas_extras: 48 },
  { mes: 'Jun', faltas: 7, trocas: 14, horas_extras: 55 }
];

export default function IndicadoresChart() {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Tendências Mensais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dadosMensais}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="mes" 
              stroke="#64748b"
              fontSize={12}
              tickMargin={8}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickMargin={8}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="faltas" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="Faltas"
            />
            <Line 
              type="monotone" 
              dataKey="trocas" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="Trocas"
            />
            <Line 
              type="monotone" 
              dataKey="horas_extras" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              name="Horas Extras"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}