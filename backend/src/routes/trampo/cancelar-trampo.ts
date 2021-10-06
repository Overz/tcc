import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import {
  Notificacao,
  notificacaoRepository,
  StatusTrabalho,
  TipoNotificacao,
  Trampo,
  trampoRepository,
} from '../../models';
import ms from 'ms';
import { inTransaction } from '../../utils/transaction';

const { CANCELADO, FINALIZADO, PENDENTE } = StatusTrabalho;

const router = Router();

router.put(
  '/api/trampo/:cdTrampo/cancelar',
  requireAuth,
  async (req: Request, res: Response) => {
    const cdTrampo = +req.params.cdTrampo;

    const trampo = await trampoRepository.findOne(cdTrampo, {
      loadRelationIds: true,
    });

    if (!trampo) {
      throw new BadRequestError('Trabalho não encontrado');
    }

    if ([CANCELADO, FINALIZADO].includes(trampo.flStatus)) {
      throw new BadRequestError('Trabalho já finalizado');
    }

    if (trampo.dtValidade) {
      const validade = new Date(trampo.dtValidade.getTime() + ms('7d'));
      if (validade < new Date()) {
        throw new BadRequestError('Validade para cancelamento já expirada');
      }
    }

    // if (
    //   PENDENTE === trampo.flStatus &&
    //   trampo.cdContratado !== null &&
    //   validade > new Date()
    // ) {
    //   throw new BadRequestError('Impossível cancelar um trabalho já corrente');
    // }

    await inTransaction(async (em) => {
      const repoTrampo = em.getRepository(Trampo);
      const repoNotificacao = em.getRepository(Notificacao);

      repoTrampo.update({ cdTrampo }, { flStatus: CANCELADO });

      if (trampo.cdContratado) {
        repoNotificacao.save({
          cdTrampo,
          cdUsuario: trampo.cdContratado as number,
          deMessage: `O Trampo ${trampo.nmAreaTrabalho} foi cancelado!`,
          tpNotificacao: TipoNotificacao.CANCELADO,
        });
      }
    });

    res.status(204).send({});
  }
);

export { router as cancelarTrampoRouter };
