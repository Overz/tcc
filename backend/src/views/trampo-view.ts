import {
  Endereco,
  StatusTrabalho,
  TipoTrabalho,
  Trampo,
  Usuario,
} from '../models';
import { UsuarioView, usuarioView } from './usuario-view';

export interface TrampoList {
  id: number;
  usuario: string;
  idusuario: number;
  dtpublicado: Date;
  grupo: string;
  area: string;
  remuneracao: string;
  tipo: TipoTrabalho;
  dtentrega: Date;
  status: string;
  dtvalidade?: Date | null;
  finalizacaopendente: string;
}

export interface TrampoView {
  id: number;
  contratante: UsuarioView;
  contratado?: UsuarioView | null;
  latitude?: string | number | null;
  longitude: string | number | null;
  grupo: string;
  area: string;
  tipo: TipoTrabalho;
  status: StatusTrabalho;
  remuneracao: string;
  descricao: string;
  dtentrega?: Date | null;
  dtpublicado: Date;
  dtvalidade?: Date | null;
  finalizacaopendente: string;
}

export const trampoView = (trampo: Trampo): TrampoView => {
  const contratante = (trampo.cdContratante as unknown) as Usuario;
  const contratado = (trampo.cdContratado as unknown) as Usuario | null;
  const endereco = (trampo.cdEndereco as unknown) as Endereco;

  return {
    id: trampo.cdTrampo,
    contratante: usuarioView(contratante),
    contratado: contratado && usuarioView(contratado),
    latitude: endereco?.nuLatitude,
    longitude: endereco?.nuLongitude,
    grupo: trampo.nmGrupo,
    area: trampo.nmAreaTrabalho,
    tipo: trampo.flTipo,
    status: trampo.flStatus,
    remuneracao: trampo.vlRemuneracao,
    descricao: trampo.deDescricao,
    dtentrega: trampo.dtEntrega,
    dtpublicado: trampo.dtPublicado,
    dtvalidade: trampo.dtValidade,
    finalizacaopendente: trampo.flFinalizacaoPendente,
  };
};

export const trampoList = (trampo?: Trampo[]): TrampoList[] | undefined =>
  trampo &&
  trampo.map((data) => {
    const usuario = (data.cdContratante as unknown) as Usuario;
    return {
      id: data.cdTrampo,
      idusuario: usuario.cdUsuario,
      usuario: usuario && usuarioView(usuario).nome,
      dtpublicado: data.dtPublicado,
      grupo: data.nmGrupo,
      area: data.nmAreaTrabalho,
      remuneracao: data.vlRemuneracao,
      tipo: data.flTipo,
      dtentrega: data.dtEntrega,
      status: data.flStatus,
      dtvalidade: data.dtValidade,
      finalizacaopendente: data.flFinalizacaoPendente,
    };
  });
