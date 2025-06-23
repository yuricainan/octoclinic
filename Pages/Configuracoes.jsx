import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building, Clock } from 'lucide-react';

import FuncaoManager from '../components/configuracoes/FuncaoManager';
import SetorManager from '../components/configuracoes/SetorManager';
import EscalaManager from '../components/configuracoes/EscalaManager';

export default function Configuracoes() {
  return (
    <div className="p-3 lg:p-6 space-y-6 lg:space-y-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
            Configurações do Sistema
          </h1>
          <p className="text-sm lg:text-base text-slate-600">
            Gerencie as opções e parâmetros utilizados em todo o sistema.
          </p>
        </div>

        <Tabs defaultValue="funcoes" className="space-y-4">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 bg-white/60 backdrop-blur-sm h-auto">
            <TabsTrigger value="funcoes" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <Briefcase className="w-4 h-4 mr-1 lg:mr-2" />
              Funções
            </TabsTrigger>
            <TabsTrigger value="setores" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <Building className="w-4 h-4 mr-1 lg:mr-2" />
              Setores
            </TabsTrigger>
            <TabsTrigger value="escalas" className="data-[state=active]:bg-blue-50 text-xs lg:text-sm p-2 lg:p-3">
              <Clock className="w-4 h-4 mr-1 lg:mr-2" />
              Escalas Padrão
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="funcoes">
            <FuncaoManager />
          </TabsContent>
          <TabsContent value="setores">
            <SetorManager />
          </TabsContent>
          <TabsContent value="escalas">
            <EscalaManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}