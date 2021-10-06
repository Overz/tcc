import { Router, Request, Response } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { notificacaoRepository } from '../../models';
import { notificacaoList } from '../../views/notificacao-view';

const router = Router();

router.get(
  '/api/notificacao',
  requireAuth,
  async (req: Request, res: Response) => {
    const notificacao = await notificacaoRepository.find({
      where: { cdNotificado: Number(req.currentUser.id), flEntregue: false },
      order: {
        cdNotificacao: 'DESC',
      },
    });

    res.send(notificacaoList(notificacao));
  }
);

export { router as listarNotificacaoRouter };
