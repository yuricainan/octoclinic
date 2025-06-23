import React from 'react';
import { EscalaPadrao } from '@/entities/EscalaPadrao';
import ConfigManager from './ConfigManager';
import { Clock } from 'lucide-react';

export default function EscalaManager() {
  const fields = [
    { name: 'nome', label: 'Nome da Escala' },
    { name: 'horas_trabalho', label: 'Horas de Trabalho', type: 'number' },
    { name: 'horas_folga', label: 'Horas de Folga', type: 'number' }
  ];

  return (
    <ConfigManager
      Entity={EscalaPadrao}
      entityName="Escala"
      title="Escalas Padrão"
      fields={fields}
      icon={Clock}
    />
  );
}