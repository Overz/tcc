import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { enderecoRepository, usuarioRepository } from '../../models';
import { usuarioView } from '../../views/usuario-view';

const router = Router();

router.get('/api/usuario/atual', async (req: Request, res: Response) => {
  if (!req.currentUser) {
    return res.send({});
  }

  const usuario = await usuarioRepository.findOne({
    where: { deEmail: req.currentUser?.email },
  });

  if (!usuario) {
    throw new BadRequestError('Usuario atual não encontrado');
  }

  const enderecos = await enderecoRepository.find({
    where: { cdUsuario: usuario.cdUsuario },
  });

  res.status(200).send(usuarioView(usuario, enderecos));
});

export { router as usuarioAtualRouter };
