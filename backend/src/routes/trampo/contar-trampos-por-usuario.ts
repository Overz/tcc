import { Router, Request, Response } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import {
  FinalizacaoPendente,
  StatusTrabalho,
  trampoRepository,
} from '../../models';

const router = Router();

router.get(
  '/api/trampo/limite',
  requireAuth,
  async (req: Request, res: Response) => {
    res.send({
      limit: await trampoRepository.count({
        where: {
          cdContratante: req.currentUser.id,
          flStatus: StatusTrabalho.PENDENTE,
          flFinalizacaoPendente: FinalizacaoPendente.NAO,
        },
      }),
    });
  }
);

export { router as contarTramposUsuarioRouter };
