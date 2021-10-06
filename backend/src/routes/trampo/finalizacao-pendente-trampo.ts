import { Router, Request, Response } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { FinalizacaoPendente, trampoRepository } from '../../models';

const router = Router();

router.get(
  '/api/trampo/finalizacao-pendente',
  requireAuth,
  async (req: Request, res: Response) => {
    const pendente = (
      await trampoRepository.find({
        select: ['cdTrampo', 'cdContratado', 'cdContratante'],
        where: {
          cdContratante: req.currentUser.id,
          flFinalizacaoPendente: FinalizacaoPendente.SIM,
        },
      })
    ).map((p) => ({
      id: p.cdTrampo,
      contratado: p.cdContratado,
      contratante: p.cdContratante,
    }));

    res.send(pendente);
  }
);

export { router as ChangeThisName };
