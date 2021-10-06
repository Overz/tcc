import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { usuarioRepository, StatusUsuario } from '../../models';
import { validateActivationToken } from '../../utils/tokens/token';

const router = Router();

router.post(
  '/api/usuario/ativar',
  [
    body('token')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o token'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token } = req.body;

    if (!validateActivationToken(token)) {
      throw new BadRequestError('Token de ativação inválido');
    }

    let usuario = await usuarioRepository.findOne({
      where: { deToken: token },
    });

    if (!usuario || usuario.flStatus !== StatusUsuario.INATIVO) {
      throw new BadRequestError('Token de ativação inválido');
    }

    usuario.flStatus = StatusUsuario.ATIVO;
    usuario.deToken = null;
    usuario = await usuarioRepository.save(usuario);

    res.send({ ok: true });
  }
);

export { router as ativarUsuarioRouter };
