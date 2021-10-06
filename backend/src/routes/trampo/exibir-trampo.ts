import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { trampoRepository } from '../../models';
import { trampoView } from '../../views/trampo-view';

const router = Router();

router.get(
  '/api/trampo/:cdTrampo',
  requireAuth,
  async (req: Request, res: Response) => {
    const trampo = await trampoRepository.findOne({
      where: { cdTrampo: req.params.cdTrampo },
    });
    if (!trampo) {
      throw new BadRequestError('Trampo não encontrado');
    }

    res.send(trampoView(trampo));
  }
);

export { router as exibirTrampoRouter };
