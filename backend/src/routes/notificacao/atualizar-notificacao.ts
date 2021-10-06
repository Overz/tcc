import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { notificacaoRepository } from '../../models';

const router = Router();

router.put(
  '/api/notificacao/:cdNotificacao',
  requireAuth,
  [
    body('visto')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o campo "visto"'),
    body('entregue')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o campo "entregue"'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { cdNotificacao } = req.params as any;
    const { visto, entregue } = req.body;

    if (visto) {
      await notificacaoRepository.update({ cdNotificacao }, { flVisto: visto });
    }

    if (entregue) {
      await notificacaoRepository.update(
        { cdNotificacao },
        { flEntregue: entregue }
      );
    }

    res.status(204).send({});
  }
);

export { router as atualizarNotificacaoRouter };
