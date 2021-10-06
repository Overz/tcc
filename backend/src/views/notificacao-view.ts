import { Notificacao, TipoNotificacao } from '../models';

interface NotificacaoView {
  id: number;
  notificado: number;
  notificante: number;
  trampo: number;
  visto: boolean;
  entregue: boolean;
  mensagem: string;
  tipo: TipoNotificacao;
}

export const notificacaoView = (n: Notificacao): NotificacaoView => ({
  id: n.cdNotificacao,
  notificante: n.cdNotificante,
  notificado: n.cdNotificado,
  entregue: n.flEntregue,
  mensagem: n.deMessage,
  tipo: n.tpNotificacao,
  trampo: n.cdTrampo,
  visto: n.flVisto,
});

export const notificacaoList = (n: Notificacao[]) =>
  n && n.map((n1) => notificacaoView(n1));
