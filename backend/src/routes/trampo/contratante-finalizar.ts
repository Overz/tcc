import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import {
  FinalizacaoPendente,
  notificacaoRepository,
  StatusTrabalho,
  TipoNotificacao,
  trampoRepository,
  usuarioRepository,
} from '../../models';

const { FINALIZADO, CANCELADO } = StatusTrabalho;

const router = Router();

router.put(
  '/api/trampo/:cdTrampo/contratante/finalizar',
  requireAuth,
  async (req: Request, res: Response) => {
    const { cdTrampo } = req.params;

    const agora = new Date();
    const hoje = new Date(agora.toUTCString());

    const trampo = await trampoRepository.findOne({
      where: {
        cdTrampo,
        cdContratante: req.currentUser.id,
        flStatus: StatusTrabalho.PENDENTE,
      },
      loadRelationIds: true,
    });

    if (!trampo) {
      throw new BadRequestError('Trabalho não encontrado ou já finalizado');
    }

    if ([FINALIZADO, CANCELADO].includes(trampo.flStatus)) {
      throw new BadRequestError('Trabalho já finalizado ou cancelado');
    }

    if (hoje > trampo.dtEntrega) {
      throw new BadRequestError('Data de validade para finalização expirada');
    }

    await trampoRepository.update(
      { cdTrampo: trampo.cdTrampo },
      {
        flStatus: StatusTrabalho.FINALIZADO,
        flFinalizacaoPendente: FinalizacaoPendente.NAO,
      }
    );

    await usuarioRepository.increment(
      { cdUsuario: trampo.cdContratado as number },
      'nuTotalTrampos',
      1
    );

    await notificacaoRepository.save({
      cdTrampo: trampo.cdTrampo,
      cdNotificado: trampo.cdContratado as number,
      cdNotificante: trampo.cdContratante as number,
      deMessage: 'Avaliação em Aguardo!',
      tpNotificacao: TipoNotificacao.FINALIZANDO,
    });

    res.send(204).send({});
  }
);

export { router as finalizarPorContratanteRouter };
