import React from 'react';
import { Setor } from '@/entities/Setor';
import ConfigManager from './ConfigManager';
import { Building } from 'lucide-react';

export default function SetorManager() {
  const fields = [
    { name: 'nome', label: 'Nome do Setor' },
    { name: 'descricao', label: 'Descrição' }
  ];

  return (
    <ConfigManager
      Entity={Setor}
      entityName="Setor"
      title="Setores"
      fields={fields}
      icon={Building}
    />
  );
}