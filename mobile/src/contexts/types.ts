export type JobType = 'O' | 'P' | string;

export type JobStatus = 'P' | 'F' | 'C' | string;

export type ID = number | string;

export type Job = Item | null;

export interface ListItem {
  id: ID;
  area: string;
  usuario: string;
  idusuario: ID;
  remuneracao: string;
  tipo: JobType;
  dtpublicado: string;
  status: JobStatus;
}

export interface ListCandidatos {
  id: ID;
  nome: string;
  nota: string;
  area: string;
  trampo: ID;
}

export interface Candidato {
  id: ID;
  nome: string;
  totalTrabalhos: number;
  nota: number;
  dtCriacao: Date;
}

export interface Contratante {
  id: ID;
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
}

export interface Item {
  id: ID;
  contratante: Contratante;
  grupo: string;
  area: string;
  tipo: JobType;
  status: JobStatus;
  remuneracao: string;
  descricao: string;
  dtentrega: string | Date;
  dtpublicado: string | Date;
  dtvalidade: string | Date;
  latitude: string | number;
  longitude: string | number;
  contratado: any;
  finalizacaopendente: string;
}

export interface FilterValues {
  cidade?: string;
  grupo?: string;
  area?: string;
}

export interface Filter {
  grupo?: string;
  area?: string;
  cidade?: string;
  checkbox?: boolean;
  page: number;
  pageSize?: number;
  add?: boolean;
}

export interface BottomFetch {
  page: number;
  pageSize?: number;
}

export interface Fetch {
  type?: 'dashboard' | 'history';
  page?: number;
  pageSize?: number;
  add?: boolean;
}

export interface PageResult<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalRecords: number;
}

export interface PublishJob {
  grupo: string;
  area: string;
  tipo: JobType;
  remuneracao: ID;
  descricao: string;
  endereco: ID;
  dtentrega: Date;
}

export interface HistoryOrRequests {
  add?: boolean;
  page?: number;
  pageSize?: number;
}

export interface NotificationRequest {
  id: string;
  notificado: string;
  notificante: string;
  trampo: string;
  visto: boolean;
  entregue: boolean;
  mensagem: string;
  tipo: string;
}

export interface NotificationData {
  id: ID;
  title: string;
  body: string;
  data: { [key: string]: any };
}

export enum TipoElogio {
  NENHUM = 'NENHUM',
  ADAPTAVEL = 'ADAPTAVEL',
  BOM = 'BOM',
  CARISMATICO = 'CARISMATICO',
  COMPETENTE = 'COMPETENTE',
  COPERATIVO = 'COPERATIVO',
  CRIATIVO = 'CRIATIVO',
  EFICIENTE = 'EFICIENTE',
  EXCELENTE = 'EXCELENTE',
  INCRIVEL = 'INCRIVEL',
  ORGANIZADO = 'ORGANIZADO',
  OTIMO = 'OTIMO',
  RAPIDO = 'RAPIDO',
  ZELOSO = 'ZELOSO',
  QUERIDO = 'QUERIDO',
}

export interface UserRank {
  id: ID;
  nome: string;
  pic: string;
  totalTrabalhos: number;
  avaliacao: number;
  dtcadastro: string;
  elogios: { tipo: TipoElogio; total: number }[];
  sobre: string;
}
