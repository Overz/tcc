import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import {
  FinalizacaoPendente,
  Notificacao,
  notificacaoRepository,
  StatusTrabalho,
  TipoNotificacao,
  Trampo,
  trampoRepository,
  Usuario,
  usuarioRepository,
} from '../../models';
import { inTransaction } from '../../utils/transaction';

const router = Router();

router.put(
  '/api/trampo/:cdTrampo/contratado/finalizar',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const contratado = await usuarioRepository.findOne({
      where: { cdUsuario: req.currentUser.id },
      loadRelationIds: true,
    });

    if (!contratado) {
      throw new BadRequestError('Usuario nao encontrado');
    }

    const trampo = await trampoRepository.findOne({
      where: {
        cdTrampo: req.params.cdTrampo,
        cdContratado: contratado.cdUsuario,
        flStatus: StatusTrabalho.PENDENTE,
      },
      loadRelationIds: true,
    });

    if (!trampo) {
      throw new BadRequestError('Trabalho não encontrado ou já finalizado');
    }

    await inTransaction(async (em) => {
      const repoTrampo = em.getRepository(Trampo);
      const repoUsuario = em.getRepository(Usuario);
      const repoNotify = em.getRepository(Notificacao);

      await repoTrampo.update(
        { cdTrampo: trampo.cdTrampo },
        {
          flFinalizacaoPendente: FinalizacaoPendente.SIM,
        }
      );

      await repoUsuario.increment(
        { cdUsuario: trampo.cdContratado as number },
        'nuTotalTrampos',
        1
      );

      await repoNotify.save({
        cdNotificado: trampo.cdContratante as number,
        cdNotificante: trampo.cdContratado as number,
        cdTrampo: trampo.cdTrampo,
        deMessage: `${contratado.nmNome} deseja finalizar o Trabalho!`,
        flVisto: false,
        flEntregue: false,
        tpNotificacao: TipoNotificacao.FINALIZANDO,
      });
    });
    res.status(204).send({});
  }
);

export { router as finalizarPorContratadoRouter };
