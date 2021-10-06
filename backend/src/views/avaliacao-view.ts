import { Indexable } from '../utils/types';

export interface AvaliacaoParams {
  cdAvaliacao: number | string;
  cdAvaliado: number | string;
  nuAvaliacao: number | string;
  tpElogios: Indexable[];
  dtCadastro: Date;
  nuTotalTrampos: number;
  dePicture: string;
}

export interface AvaliacaoView {
  id: number | string;
  nota: number;
  avaliado: number | string;
  totalTrabalhos: number;
  elogios: Indexable[];
  cadastro: Date;
  pic: string;
}

export const avaliacaoView = (av: AvaliacaoParams): AvaliacaoView => ({
  id: av.cdAvaliacao,
  elogios: av.tpElogios,
  nota: +av.nuAvaliacao,
  avaliado: av.cdAvaliado,
  cadastro: av.dtCadastro,
  totalTrabalhos: av.nuTotalTrampos,
  pic: av.dePicture,
});

export const avaliacaoList = (av?: AvaliacaoParams[]) =>
  av && av.map((a) => avaliacaoView(a));
