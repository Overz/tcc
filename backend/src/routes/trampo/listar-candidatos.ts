import { Router, Request, Response } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Candidato } from '../../models/candidato';
import { buildPagination } from '../../utils/pagination';
import { candidatoList } from '../../views/candidato-view';

const router = Router();

router.get(
  '/api/trampo/candidatos/:cdTrampo',
  requireAuth,
  async (req: Request, res: Response) => {
    const { cdTrampo } = req.params;
    const pageResult = await buildPagination(req.query, Candidato, {
      where: { cdTrampo },
    });

    res.send({ ...pageResult, data: candidatoList(pageResult.data) });
  }
);

export { router as listarCandidatosRouter };
