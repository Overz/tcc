import { Trampo, Usuario } from '../models';
import { Candidato } from '../models/candidato';
import { trampoView } from './trampo-view';
import { usuarioView } from './usuario-view';

export const candidatoView = ({ cdCandidato, cdTrampo }: Candidato) => {
  const trampo = trampoView(cdTrampo as Trampo);
  const usuario = usuarioView(cdCandidato as Usuario);

  return {
    id: usuario.id,
    nome: usuario.nome,
    nota: '5.0', // TODO: Consultar a nota
    area: trampo.area,
    trampo: trampo.id,
  };
};

export const candidatoList = (candidatos?: Candidato[]) =>
  candidatos && candidatos.map((v) => candidatoView(v));
