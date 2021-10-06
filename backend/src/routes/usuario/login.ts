import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { usuarioRepository, StatusUsuario } from '../../models';
import { JWT_KEY, envRequired } from '../../utils/constants';
import { checkPassword } from '../../utils/password/password';
import { createToken } from '../../utils/tokens/jwt-sign';
import ms from 'ms';

const router = Router();

router.post(
  '/api/usuario/login',
  [
    body('email')
      .isEmail()
      .withMessage('É necessário informar o email')
      .isLength({ max: 150 })
      .withMessage('Email deve ter no máximo 150 caracteres!'),
    body('senha').notEmpty().withMessage('É necessário informar a senha'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    const usuario = await usuarioRepository.findOne({
      where: { deEmail: email },
    });

    if (!usuario || !checkPassword(senha, usuario.deSenha)) {
      throw new BadRequestError('Credenciais inválidas');
    }

    if (usuario.flStatus !== StatusUsuario.ATIVO) {
      throw new BadRequestError('Usuário não ativo');
    }

    const token = createToken(
      {
        email: email,
        id: String(usuario.cdUsuario),
        activated: StatusUsuario.ATIVO,
      },
      JWT_KEY
    );

    res.cookie('jwt', token, {
      maxAge: ms('12h'),
      secure: envRequired,
    }); // 1hr

    res.send({ ok: true });
  }
);

export { router as loginRouter };
