import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { enderecoRepository, trampoRepository } from '../../models';

const router = Router();

router.delete(
  '/api/endereco/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const trampo = await trampoRepository.count({ where: { cdEndereco: id } });

    if (trampo) {
      throw new BadRequestError(
        'Este endereço esta vinculado a algúm trabalho e não pode ser removido!'
      );
    }

    await enderecoRepository.delete(id);

    res.status(204).send({});
  }
);

export { router as excluirEnderecoRouter };
