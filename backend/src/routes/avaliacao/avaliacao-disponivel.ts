import { Router, Request, Response } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { avalaicaoRepository } from '../../models';

const router = Router();

router.get(
  '/api/avaliacao/disponivel/:cdTrampo',
  requireAuth,
  async (req: Request, res: Response) => {
    const id = +req.currentUser.id;

    const avaliado = await avalaicaoRepository.findOne({
      select: ['cdAvaliado'],
      where: { cdAvaliado: id, cdTrampo: req.params.cdTrampo },
      loadEagerRelations: true,
    });

    const avaliador = await avalaicaoRepository.findOne({
      select: ['cdAvaliador'],
      where: { cdAvaliador: id, cdTrampo: req.params.cdTrampo },
    });

    // if (avaliado && (avaliado?.cdAvaliado as number) === id) {
    //   from = 'avaliado';
    // }

    // if (avaliador && (avaliador.cdAvaliador as number) === id) {
    //   from = 'avaliador';
    // }

    res.send({
      avaliado: avaliado === null || avaliado === undefined,
      avaliador: avaliador === null || avaliador === undefined,
    });
  }
);

export { router as avaliacaoDisponivelRouter };
