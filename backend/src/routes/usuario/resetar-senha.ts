import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { usuarioRepository, StatusUsuario } from '../../models';
import { createPassword } from '../../utils/password/password';
import { validateActivationToken } from '../../utils/tokens/token';

const router = Router();

router.post(
  '/api/usuario/resetar-senha',
  [
    body('token')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar um token de ativação'),
    body('senha')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a senha')
      .isLength({ min: 8 })
      .withMessage('Tamanho minimo de 8 caracteres para senha não atingido'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, senha } = req.body;

    if (!validateActivationToken(token)) {
      throw new BadRequestError('Token de ativação invalido');
    }

    const usuario = await usuarioRepository.findOne({
      where: { deToken: token },
    });

    if (!usuario) {
      throw new BadRequestError('Erro ao encontrar o usuario');
    }

    usuario.deSenha = createPassword(senha);
    usuario.flStatus = StatusUsuario.ATIVO;
    usuario.deToken = null;
    await usuarioRepository.save(usuario);

    res.send({ ok: true });
  }
);

export { router as resetarSenhaRouter };
