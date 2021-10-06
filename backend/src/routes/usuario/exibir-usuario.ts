import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { usuarioRepository } from '../../models';
import { usuarioView } from '../../views/usuario-view';

const router = Router();

router.get(
  '/api/usuario/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const usuario = await usuarioRepository.findOne(id);

    if (!usuario) {
      throw new BadRequestError('Usuario informado não existe!');
    }

    return res.send(usuarioView(usuario));
  }
);

export { router as exibirUsuarioRouter };
