import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { enderecoRepository } from '../../models';
import { enderecoView } from '../../views/endereco-view';

const router = Router();

router.get(
  '/api/endereco/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const endereco = await enderecoRepository.findOne({
      where: { cdEndereco: req.params.id },
    });

    if (!endereco) {
      throw new BadRequestError('Endereco não existente');
    }

    res.send(enderecoView(endereco));
  }
);

export { router as exibirEnderecoRouter };
