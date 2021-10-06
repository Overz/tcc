import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import {
  candidatoRepository,
  Notificacao,
  StatusTrabalho,
  TipoNotificacao,
  trampoRepository,
  usuarioRepository,
} from '../../models';
import { Candidato } from '../../models/candidato';
import { inTransaction } from '../../utils/transaction';

const router = Router();

router.put(
  '/api/trampo/:cdTrampo/candidatar',
  requireAuth,
  async (req: Request, res: Response) => {
    const cdCandidato = req.currentUser.id;
    const cdTrampo = req.params.cdTrampo;

    const usuario = await usuarioRepository.findOne({
      where: { cdUsuario: cdCandidato },
      loadRelationIds: true,
    });

    if (!usuario) {
      throw new BadRequestError('Candidato informado não existe');
    }

    const trampo = await trampoRepository.findOne({
      where: {
        cdTrampo,
        flStatus: StatusTrabalho.PENDENTE,
      },
      loadRelationIds: true,
    });

    if (!trampo) {
      throw new BadRequestError('Trabalho não encontrado para se candidatar');
    }

    if (trampo.cdContratante === usuario.cdUsuario) {
      throw new BadRequestError(
        'Não é possível candidatar-se a um dos seus trabalhos'
      );
    }

    let candidato = await candidatoRepository.findOne({
      where: { cdTrampo: trampo.cdTrampo, cdCandidato },
    });

    await inTransaction(async (em) => {
      if (!candidato) {
        candidato = new Candidato();
        candidato.cdCandidato = usuario;
        candidato.cdTrampo = trampo;
        candidato.nmVaga = trampo.nmAreaTrabalho;
        candidato.nmCandidato = usuario.nmNome;

        const repoCandidato = em.getRepository(Candidato);
        const repoNotify = em.getRepository(Notificacao);

        await repoCandidato.save(candidato);
        await repoNotify.save({
          tpNotificacao: TipoNotificacao.NOVO,
          cdTrampo: Number(cdTrampo),
          cdNotificante: Number(req.currentUser.id),
          cdNotificado: trampo.cdContratante as number,
          deMessage: `${usuario.nmNome} candidatou-se ao Trampo - ${trampo.nmAreaTrabalho}`,
        });
      }
    });
    res.status(204).send({});
  }
);

export { router as candidatarTrampoRouter };
