import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import {
  candidatoRepository,
  Notificacao,
  StatusTrabalho,
  TipoNotificacao,
  Trampo,
  trampoRepository,
} from '../../models';
import { Candidato } from '../../models/candidato';
import { inTransaction } from '../../utils/transaction';
import ms from 'ms';

const router = Router();

router.put(
  '/api/trampo/:cdTrampo/contratar/:cdContratado',
  requireAuth,
  async (req: Request, res: Response) => {
    const { cdTrampo, cdContratado } = req.params;

    const candidato = await candidatoRepository.findOne({
      where: { cdCandidato: cdContratado, cdTrampo },
      loadRelationIds: true,
    });

    if (!candidato) {
      throw new BadRequestError('Candidato não encontrado');
    }

    const trampo = await trampoRepository.count({
      select: ['cdTrampo'],
      where: {
        cdTrampo,
        cdContratante: req.currentUser.id,
        flStatus: StatusTrabalho.PENDENTE,
      },
    });

    if (!trampo) {
      throw new BadRequestError(
        'Nenhum trabalho publicado encontrado para o contratante'
      );
    }

    await inTransaction(async (em) => {
      const repoTrampo = em.getRepository(Trampo);
      const repoCandidato = em.getRepository(Candidato);
      const repoNotify = em.getRepository(Notificacao);

      await repoTrampo.update(
        { cdTrampo: Number(cdTrampo) },
        {
          cdContratado: candidato.cdCandidato,
          dtValidade: new Date(new Date().getTime() + ms('7d')),
        }
      );

      await repoCandidato.delete({ cdTrampo: Number(cdTrampo) });
      await repoNotify.save({
        cdTrampo: Number(cdTrampo),
        cdNotificante: Number(req.currentUser.id),
        cdNotificado: candidato.cdCandidato as number,
        deMessage: `Você foi aceito ao Trampo - ${candidato.nmVaga}`,
        tpNotificacao: TipoNotificacao.ACEITO,
      });
    });

    res.status(204).send({});
  }
);

export { router as contratarTrampoRouter };
