import { TipoElogio, avalaicaoRepository } from '../models';

export const countElogios = async (cdAvaliado: number | string) => [
  {
    tipo: TipoElogio.BOM,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.BOM, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.ADAPTAVEL,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.ADAPTAVEL, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.CARISMATICO,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.CARISMATICO, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.COMPETENTE,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.COMPETENTE, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.COPERATIVO,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.COPERATIVO, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.CRIATIVO,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.CRIATIVO, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.EFICIENTE,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.EFICIENTE, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.EXCELENTE,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.EXCELENTE, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.INCRIVEL,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.INCRIVEL, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.ORGANIZADO,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.ORGANIZADO, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.OTIMO,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.OTIMO, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.RAPIDO,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.RAPIDO, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.ZELOSO,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.RAPIDO, cdAvaliado },
    }),
  },
  {
    tipo: TipoElogio.QUERIDO,
    total: await avalaicaoRepository.count({
      where: { tpElogio: TipoElogio.RAPIDO, cdAvaliado },
    }),
  },
];
