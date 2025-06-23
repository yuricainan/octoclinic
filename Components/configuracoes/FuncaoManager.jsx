import React from 'react';
import { Funcao } from '@/entities/Funcao';
import ConfigManager from './ConfigManager';
import { Briefcase } from 'lucide-react';

export default function FuncaoManager() {
  const fields = [
    { name: 'nome', label: 'Nome da Função' },
    { name: 'descricao', label: 'Descrição' }
  ];

  return (
    <ConfigManager
      Entity={Funcao}
      entityName="Função"
      title="Funções"
      fields={fields}
      icon={Briefcase}
    />
  );
}