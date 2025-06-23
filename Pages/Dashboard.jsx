import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  AlertTriangle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  UserCheck,
  UserX,
  Timer
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import StatsCard from "../components/dashboard/StatsCard";
import IndicadoresChart from "../components/dashboard/IndicadoresChart";
import AlertasCriticos from "../components/dashboard/AlertasCriticos";
import EscalaHoje from "../components/dashboard/EscalaHoje";
import OcorrenciasRecentes from "../components/dashboard/OcorrenciasRecentes";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalFuncionarios: 45,
    funcionariosAtivos: 42,
    plantoesMes: 156,
    faltasMes: 8,
    trocasAprovadas: 12,
    horasExtras: 85,
    ocorrenciasPendentes: 3,
    coberturaEscala: 94
  });

  return (
    <div className="p-3 lg:p-6 space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
            Dashboard de Gestão
          </h1>
          <p className="text-sm lg:text-base text-slate-600">
            Acompanhe os indicadores principais da UTI em tempo real
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          <StatsCard
            title="Funcionários Ativos"
            value={`${stats.funcionariosAtivos}/${stats.totalFuncionarios}`}
            icon={Users}
            color="blue"
            trend="+2 este mês"
            trendUp={true}
          />
          <StatsCard
            title="Cobertura de Escala"
            value={`${stats.coberturaEscala}%`}
            icon={UserCheck}
            color="green"
            trend="Meta: 95%"
            trendUp={stats.coberturaEscala >= 95}
          />
          <StatsCard
            title="Faltas do Mês"
            value={stats.faltasMes}
            icon={UserX}
            color="red"
            trend="-2 vs mês anterior"
            trendUp={false}
          />
          <StatsCard
            title="Horas Extras"
            value={`${stats.horasExtras}h`}
            icon={Timer}
            color="orange"
            trend="+15h esta semana"
            trendUp={false}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="indicadores" className="space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/60 backdrop-blur-sm h-auto">
            <TabsTrigger value="indicadores" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <span className="hidden lg:inline">Indicadores</span>
              <span className="lg:hidden">Dados</span>
            </TabsTrigger>
            <TabsTrigger value="escala" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <span className="hidden lg:inline">Escala Hoje</span>
              <span className="lg:hidden">Escala</span>
            </TabsTrigger>
            <TabsTrigger value="ocorrencias" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <span className="hidden lg:inline">Ocorrências</span>
              <span className="lg:hidden">Eventos</span>
            </TabsTrigger>
            <TabsTrigger value="alertas" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              Alertas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="indicadores" className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <IndicadoresChart />
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Métricas de Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Taxa de Presença</span>
                      <span className="font-medium">96.2%</span>
                    </div>
                    <Progress value={96.2} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Satisfação da Equipe</span>
                      <span className="font-medium">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pontualidade</span>
                      <span className="font-medium">92.5%</span>
                    </div>
                    <Progress value={92.5} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resolução de Ocorrências</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="escala">
            <EscalaHoje />
          </TabsContent>

          <TabsContent value="ocorrencias">
            <OcorrenciasRecentes />
          </TabsContent>

          <TabsContent value="alertas">
            <AlertasCriticos />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
