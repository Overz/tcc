import {
  FinalizacaoPendente,
  StatusTrabalho,
  TipoTrabalho,
  trampoRepository,
} from '../../models';
import ms from 'ms';

export const trampoData = async () => {
  const { CANCELADO, FINALIZADO, PENDENTE } = StatusTrabalho;
  const { ONLINE, PRESENCIAL } = TipoTrabalho;
  const dtEntrega = new Date(new Date().getTime() + ms('30d'));

  await trampoRepository.save({
    cdTrampo: 1,
    nmGrupo: 'Tecnologia',
    nmAreaTrabalho: 'Programador',
    dtEntrega,
    flStatus: PENDENTE,
    flTipo: ONLINE,
    vlRemuneracao: 'R$1.000,00',
    deDescricao: 'Construir um App',
    dtPublicado: new Date(),
    cdContratante: 1,
    cdContratado: null,
    cdEndereco: null,
  });

  await trampoRepository.save({
    cdTrampo: 2,
    nmGrupo: 'Saude',
    nmAreaTrabalho: 'Massagista',
    dtEntrega,
    flStatus: PENDENTE,
    flTipo: PRESENCIAL,
    vlRemuneracao: 'R$200,00',
    deDescricao: 'Massagem na xurupita',
    dtPublicado: new Date(),
    cdContratante: 2,
    cdContratado: null,
    cdEndereco: 1,
  });

  await trampoRepository.save({
    cdTrampo: 3,
    nmGrupo: 'Mão de Obra',
    nmAreaTrabalho: 'Pintor',
    dtEntrega,
    flStatus: CANCELADO,
    flTipo: PRESENCIAL,
    vlRemuneracao: 'R$3.000,00',
    deDescricao: 'Pintura de Casa',
    dtPublicado: new Date(),
    cdContratante: 1,
    cdContratado: 3,
    cdEndereco: 1,
  });

  await trampoRepository.save({
    cdTrampo: 4,
    nmGrupo: 'Consultoria',
    nmAreaTrabalho: 'Advogado',
    dtEntrega,
    flStatus: FINALIZADO,
    flTipo: ONLINE,
    vlRemuneracao: 'R$563,21',
    deDescricao: 'Tirar Duvida',
    dtPublicado: new Date(),
    cdContratante: 1,
    cdContratado: null,
    cdEndereco: null,
  });

  await trampoRepository.save({
    cdTrampo: 5,
    nmGrupo: 'Consultoria',
    nmAreaTrabalho: 'Corretor',
    dtEntrega,
    flStatus: PENDENTE,
    flTipo: ONLINE,
    vlRemuneracao: 'R$2.000,00',
    deDescricao: 'Buscar uma casa',
    dtPublicado: new Date(),
    cdContratante: 2,
    cdContratado: null,
    cdEndereco: null,
  });

  await trampoRepository.save({
    cdTrampo: 6,
    nmGrupo: 'grupo',
    nmAreaTrabalho: 'area',
    dtEntrega,
    flStatus: PENDENTE,
    flTipo: ONLINE,
    vlRemuneracao: 'R$2.000,00',
    deDescricao: 'descricao',
    dtPublicado: new Date(),
    cdContratante: 1,
    cdContratado: 3,
    cdEndereco: null,
  });

  await trampoRepository.save({
    cdTrampo: 7,
    nmGrupo: 'grupo',
    nmAreaTrabalho: 'area',
    dtEntrega,
    flStatus: PENDENTE,
    flTipo: ONLINE,
    vlRemuneracao: 'R$2.000,00',
    deDescricao: 'descricao',
    dtPublicado: new Date(),
    cdContratante: 1,
    cdContratado: 3,
    cdEndereco: null,
  });

  await trampoRepository.save({
    cdTrampo: 8,
    nmGrupo: 'grupo',
    nmAreaTrabalho: 'area',
    dtEntrega,
    flStatus: PENDENTE,
    flTipo: ONLINE,
    vlRemuneracao: 'R$2.000,00',
    deDescricao: 'descricao',
    dtPublicado: new Date(),
    cdContratante: 1,
    cdContratado: 3,
    cdEndereco: null,
    dtValidade: new Date(new Date().getTime() + ms(`10d`)),
    flPendente: FinalizacaoPendente.NAO,
  });

  await trampoRepository.save({
    cdTrampo: 9,
    nmGrupo: 'Saude',
    nmAreaTrabalho: 'Massagista',
    dtEntrega,
    flStatus: PENDENTE,
    flTipo: PRESENCIAL,
    vlRemuneracao: 'R$200,00',
    deDescricao: 'Massagem na xurupita',
    dtPublicado: new Date(),
    cdContratante: 2,
    cdContratado: null,
    cdEndereco: 1,
  });
  await trampoRepository.save({
    cdTrampo: 10,
    nmGrupo: 'Saude',
    nmAreaTrabalho: 'Massagista',
    dtEntrega,
    flStatus: PENDENTE,
    flTipo: PRESENCIAL,
    vlRemuneracao: 'R$200,00',
    deDescricao: 'Massagem na xurupita',
    dtPublicado: new Date(),
    cdContratante: 2,
    cdContratado: null,
    cdEndereco: 1,
  });
};
