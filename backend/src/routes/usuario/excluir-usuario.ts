import { Router, Request, Response } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { enderecoRepository, usuarioRepository } from '../../models';

const router = Router();

router.delete(
  '/api/usuario/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const usuario = await usuarioRepository.findOne(id);
    await enderecoRepository.delete({ cdUsuario: usuario?.cdUsuario });
    await usuarioRepository.delete(id);

    res.status(204).send({});
  }
);

export { router as excluirUsuarioRouter };
