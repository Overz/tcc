// eslint-disable-next-line no-unused-vars
import React from 'react';

export interface PickerProps {
  label: string;
  value: string;
}

export const STATES: PickerProps[] = [
  { label: 'Selecione', value: 'selecione' },
  { label: 'Acre', value: 'AC' },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espírito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value: 'TO' },
];

export enum Grupos {
  SELECIONE = '',
  TODOS = 'todos',
  ALIMENTICIOS = 'alimenticios',
  CONSULTORIA = 'consultoria',
  EDUCACAO = 'educacao',
  MAO_DE_OBRA = 'mao_de_obra',
  SAUDE = 'saude',
  TI = 'tecnologia',
  PUBLICO = 'publico',
  OUTROS = 'outros',
}

export const GRUPOS: PickerProps[] = [
  {
    label: 'Selecione',
    value: '',
  },
  {
    label: 'Alimenticios',
    value: Grupos.ALIMENTICIOS,
  },
  {
    label: 'Consultoria',
    value: Grupos.CONSULTORIA,
  },
  {
    label: 'Educação',
    value: Grupos.EDUCACAO,
  },
  {
    label: 'Mão de Obra',
    value: Grupos.MAO_DE_OBRA,
  },
  {
    label: 'Saúde',
    value: Grupos.SAUDE,
  },
  {
    label: 'Tecnologia',
    value: Grupos.TI,
  },
  {
    label: 'Voltado ao Público',
    value: Grupos.PUBLICO,
  },
  {
    label: 'Outros',
    value: Grupos.OUTROS,
  },
];

export const ALIMENTICIOS: PickerProps[] = [
  {
    label: 'Selecione',
    value: '',
  },
  {
    label: 'Confeiteiro',
    value: 'Confeiteiro',
  },
  {
    label: 'Buffet',
    value: 'Buffet',
  },
  {
    label: 'Padeiro',
    value: 'Padeiro',
  },
  {
    label: 'Cozinheiro(a)',
    value: 'Cozinheiro(a)',
  },
  {
    label: 'Doces e Salgados',
    value: 'Doces e Salgados',
  },
  {
    label: 'Outros',
    value: 'Outros',
  },
];

export const CONSULTORIA: PickerProps[] = [
  {
    label: 'Selecione',
    value: '',
  },
  {
    label: 'Coach',
    value: 'Coach',
  },
  {
    label: 'Advogado',
    value: 'Advogado',
  },
  {
    label: 'Consultor',
    value: 'Consultor',
  },
  {
    label: 'Contador',
    value: 'Contador',
  },
  {
    label: 'Corretor',
    value: 'Corretor',
  },
  {
    label: 'Detetive Particular',
    value: 'Detetive Particular',
  },
  {
    label: 'Palestrante',
    value: 'Palestrante',
  },
  {
    label: 'Tradutor',
    value: 'Tradutor',
  },
  {
    label: 'Engenhêiro',
    value: 'Engenhêiro',
  },
  {
    label: 'Outros',
    value: 'Outros',
  },
];

export const EDUCACAO: PickerProps[] = [
  {
    label: 'Selecione',
    value: '',
  },
  {
    label: 'Professor',
    value: 'Professor',
  },
  {
    label: 'Aulas',
    value: 'Aulas',
  },
  {
    label: 'Recreador',
    value: 'Recreador',
  },
  {
    label: 'Educação Especial',
    value: 'Educação Especial',
  },
  {
    label: 'Educador',
    value: 'Educador',
  },
  {
    label: 'Fotografia',
    value: 'Fotografia',
  },
  {
    label: 'Gastronomia',
    value: 'Gastronomia',
  },
  {
    label: 'Outros',
    value: 'Outros',
  },
];

export const MAO_DE_OBRA: PickerProps[] = [
  {
    label: 'Selecione',
    value: '',
  },
  {
    label: 'Pintor',
    value: 'Pintor',
  },
  {
    label: 'Pedreiro',
    value: 'Pedreiro',
  },
  {
    label: 'Marceneiro',
    value: 'Marceneiro',
  },
  {
    label: 'Decorador',
    value: 'Decorador',
  },
  {
    label: 'Demolição',
    value: 'Demolição',
  },
  {
    label: 'Desentupidor',
    value: 'Desentupidor',
  },
  {
    label: 'Design Interior',
    value: 'Design Interior',
  },
  {
    label: 'Encanador',
    value: 'Encanador',
  },
  {
    label: 'Chaveiro',
    value: 'Chaveiro',
  },
  {
    label: 'Eletricista',
    value: 'Eletricista',
  },
  {
    label: 'Isolamento Acustico',
    value: 'Isolamento Acustico',
  },
  {
    label: 'Limpeza',
    value: 'Limpeza',
  },
  {
    label: 'Montador de Móveis',
    value: 'Montador de Móveis',
  },
  {
    label: 'Paisagista',
    value: 'Paisagista',
  },
  {
    label: 'Reciclagem',
    value: 'Reciclagem',
  },
  {
    label: 'Segurança',
    value: 'Segurança',
  },
  {
    label: 'Serralheria e Solda',
    value: 'Serralheria e Solda',
  },
  {
    label: 'Tapeceiro',
    value: 'Tapeceiro',
  },
  {
    label: 'Toldos e Cobertura',
    value: 'Toldos e Cobertura',
  },
  {
    label: 'Terraplanagem',
    value: 'Terraplanagem',
  },
  {
    label: 'Vidraceiro',
    value: 'Vidraceiro',
  },
  {
    label: 'Jardinagem',
    value: 'Jardinagem',
  },
  {
    label: 'Automação',
    value: 'Automação',
  },
  {
    label: 'Climatização',
    value: 'Climatização',
  },
  {
    label: 'Diarista',
    value: 'Diarista',
  },
  {
    label: 'Empregada',
    value: 'Empregada',
  },
  {
    label: 'Serviços Gerais',
    value: 'Serviços Gerais',
  },
  {
    label: 'Outros',
    value: 'Outros',
  },
];

export const SAUDE: PickerProps[] = [
  {
    label: 'Selecione',
    value: '',
  },
  {
    label: 'Educação Fisica',
    value: 'Educação Fisica',
  },
  {
    label: 'Massagista',
    value: 'Massagista',
  },
  {
    label: 'Saúde Coletiva',
    value: 'Saúde Coletiva',
  },
  {
    label: 'Personal Trainer',
    value: 'Personal Trainer',
  },
  {
    label: 'Cuidados de Pessoas',
    value: 'Cuidados de Pessoas',
  },
  {
    label: 'Fisioterapia',
    value: 'Fisioterapia',
  },
  {
    label: 'Terapia Ocupacional',
    value: 'Terapia Ocupacional',
  },
  {
    label: 'Terapia Alternativa',
    value: 'Terapia Alternativa',
  },
  {
    label: 'Nutricionista',
    value: 'Nutricionista',
  },
  {
    label: 'Enfermeiro',
    value: 'Enfermeiro',
  },
  {
    label: 'Manicure',
    value: 'Manicure',
  },
  {
    label: 'Pedicure',
    value: 'Pedicure',
  },
  {
    label: 'Cabelereiro(a)',
    value: 'Cabelereiro(a)',
  },
  {
    label: 'Barbeiro(a)',
    value: 'Barbeiro(a)',
  },
  {
    label: 'Dermatologista',
    value: 'Dermatologista',
  },
  {
    label: 'Outros',
    value: 'Outros',
  },
];

export const TI: PickerProps[] = [
  {
    label: 'Selecione',
    value: '',
  },
  {
    label: 'Desenvolvedor',
    value: 'Desenvolvedor',
  },
  {
    label: 'Analista',
    value: 'Analista',
  },
  {
    label: 'Especialista',
    value: 'Especialista',
  },
  {
    label: 'Redes',
    value: 'Redes',
  },
  {
    label: 'UI/UX',
    value: 'UI/UX',
  },
  {
    label: 'Design',
    value: 'Design',
  },
  {
    label: 'Edição',
    value: 'Edição',
  },
  {
    label: 'Animação',
    value: 'Animação',
  },
  {
    label: 'Automação',
    value: 'Automação',
  },
  {
    label: 'Assistência',
    value: 'Assistência',
  },
  {
    label: 'Streaming',
    value: 'Streaming',
  },
  {
    label: 'Jogos',
    value: 'Jogos',
  },
  {
    label: 'Suporte',
    value: 'Suporte',
  },
  {
    label: 'BI',
    value: 'BI',
  },
  {
    label: 'Big Data',
    value: 'Big Data',
  },
  {
    label: 'Outros',
    value: 'Outros',
  },
];

export const PUBLICO: PickerProps[] = [
  {
    label: 'Selecione',
    value: '',
  },
  {
    label: 'Eventos',
    value: 'Eventos',
  },
  {
    label: 'Vocalista',
    value: 'Vocalista',
  },
  {
    label: 'Banda',
    value: 'Banda',
  },
  {
    label: 'Guitarrista',
    value: 'Guitarrista',
  },
  {
    label: 'Baterista',
    value: 'Baterista',
  },
  {
    label: 'Baixista',
    value: 'Baixista',
  },
  {
    label: 'Tecladista',
    value: 'Tecladista',
  },
  {
    label: 'Animador',
    value: 'Animador',
  },
  {
    label: 'Animação de Festas',
    value: 'Animação de Festas',
  },
  {
    label: 'Bartender',
    value: 'Bartender',
  },
  {
    label: 'Barman',
    value: 'Barman',
  },
  {
    label: 'Florista',
    value: 'Florista',
  },
  {
    label: 'DJ',
    value: 'DJ',
  },
  {
    label: 'Copeiro',
    value: 'Copeiro',
  },
  {
    label: 'Fotografo',
    value: 'Fotografo',
  },
  {
    label: 'Garçom',
    value: 'Garçom',
  },
  {
    label: 'Segurança',
    value: 'Segurança',
  },
  {
    label: 'Recepcionista',
    value: 'Recepcionista',
  },
  {
    label: 'Equipamentos para Festas',
    value: 'Equipamentos para Festas',
  },
  {
    label: 'Outros',
    value: 'Outros',
  },
];
