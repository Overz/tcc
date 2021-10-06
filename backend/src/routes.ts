import { Router } from 'express';
import { envRequired } from './utils/constants';

import { debugSendMailRouter } from './routes/debug/sendmail';
import { atualizarEnderecoRouter } from './routes/endereco/atualizar-endereco';
import { criarEnderecoRouter } from './routes/endereco/criar-endereco';
import { excluirEnderecoRouter } from './routes/endereco/excluir-endereco';
import { exibirEnderecoRouter } from './routes/endereco/exibir-endereco';
import { listarEnderecoRouter } from './routes/endereco/listar-endereco';
import { cancelarTrampoRouter } from './routes/trampo/cancelar-trampo';
import { candidatarTrampoRouter } from './routes/trampo/candidatar-trampo';
import { contarTramposUsuarioRouter } from './routes/trampo/contar-trampos-por-usuario';
import { contratarTrampoRouter } from './routes/trampo/contratar-trampo';
import { criarTrampoRouter } from './routes/trampo/criar-trampo';
import { exibirTrampoRouter } from './routes/trampo/exibir-trampo';
import { listarCandidatosRouter } from './routes/trampo/listar-candidatos';
import { listarTrampoRouter } from './routes/trampo/listar-trampo';
import { listarTrampoPorFiltroRouter } from './routes/trampo/listar-trampo-por-filtro';
import { listarTrampoPorGeocodeRouter } from './routes/trampo/listar-trampo-por-geocode';
import { renovarDataTrampoRouter } from './routes/trampo/renovar-data-trampo';
import { finalizarPorContratanteRouter } from './routes/trampo/contratante-finalizar';

import { ativarUsuarioRouter } from './routes/usuario/ativar-usuario';
import { atualizarUsuarioRouter } from './routes/usuario/atualizar-usuario';
import { checarDadosRouter } from './routes/usuario/checar-dados';
import { checarEmailRouter } from './routes/usuario/checar-email';
import { criarUsuarioRouter } from './routes/usuario/criar-usuario';
import { esqueciSenhaRouter } from './routes/usuario/esqueci-senha';
import { excluirUsuarioRouter } from './routes/usuario/excluir-usuario';
import { exibirUsuarioRouter } from './routes/usuario/exibir-usuario';
import { loginRouter } from './routes/usuario/login';
import { logoutRouter } from './routes/usuario/logout';
import { resetarSenhaRouter } from './routes/usuario/resetar-senha';
import { usuarioAtualRouter } from './routes/usuario/usuario-atual';

import { criarAvaliacaoRouter } from './routes/avaliacao/criar-avaliacao';
import { exibirAvaliacaoRouter } from './routes/avaliacao/exibir-avaliacao';

import { atualizarNotificacaoRouter } from './routes/notificacao/atualizar-notificacao';
import { listarNotificacaoRouter } from './routes/notificacao/listar-notificacao';
import { finalizarPorContratadoRouter } from './routes/trampo/contratado-finalizar-trampo';
import { perfilAvaliacaoRouter } from './routes/avaliacao/exibir-perfil-avaliacao';
import { avaliacaoDisponivelRouter } from './routes/avaliacao/avaliacao-disponivel';

let others: Router[] = [];
if (!envRequired) {
  others = [debugSendMailRouter];
}

const usuarioRoutes = [
  usuarioAtualRouter,
  ativarUsuarioRouter,
  atualizarUsuarioRouter,
  criarUsuarioRouter,
  esqueciSenhaRouter,
  excluirUsuarioRouter,
  exibirUsuarioRouter,
  resetarSenhaRouter,
  loginRouter,
  logoutRouter,
  checarDadosRouter,
  checarEmailRouter,
];

const enderecoRoutes = [
  atualizarEnderecoRouter,
  criarEnderecoRouter,
  excluirEnderecoRouter,
  exibirEnderecoRouter,
  listarEnderecoRouter,
];

const trampoRoutes = [
  listarCandidatosRouter,
  criarTrampoRouter,
  exibirTrampoRouter,
  listarTrampoPorGeocodeRouter,
  listarTrampoPorFiltroRouter,
  listarTrampoRouter,
  candidatarTrampoRouter,
  contratarTrampoRouter,
  contarTramposUsuarioRouter,
  cancelarTrampoRouter,
  renovarDataTrampoRouter,
  finalizarPorContratanteRouter,
  finalizarPorContratadoRouter,
];

const avaliacaoRoutes = [
  criarAvaliacaoRouter,
  perfilAvaliacaoRouter,
  exibirAvaliacaoRouter,
  avaliacaoDisponivelRouter,
];

const notificacaoRoutes = [atualizarNotificacaoRouter, listarNotificacaoRouter];

export const routes = [
  ...others,
  ...usuarioRoutes,
  ...enderecoRoutes,
  ...trampoRoutes,
  ...avaliacaoRoutes,
  ...notificacaoRoutes,
];
