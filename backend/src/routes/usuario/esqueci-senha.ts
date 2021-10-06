import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { createDefaultTransporter, sendMail } from '../../events/mail';
import { validateRequest } from '../../middlewares/validate-request';
import { StatusUsuario, usuarioRepository } from '../../models';
import { MAIL_SENDER } from '../../utils/constants';
import { createActivationToken } from '../../utils/tokens/token';

const router = Router();

router.post(
  '/api/usuario/esqueci-senha',
  [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o email')
      .isEmail()
      .withMessage('Email informado esta incorreto'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const usuario = await usuarioRepository.findOne({
      where: { deEmail: email },
    });

    if (!usuario) {
      throw new BadRequestError('O email informado não existe');
    }

    const token = createActivationToken();
    usuario.deToken = token;
    usuario.flStatus = StatusUsuario.INATIVO;
    await usuarioRepository.save(usuario);

    try {
      const transporter = await createDefaultTransporter();
      sendMail(transporter, {
        sender: MAIL_SENDER,
        body: `Token de ativação: ${token}`,
        recipient: `${usuario.nmNome} ${email}`,
        subject: 'Esqueci minha senha',
      });
    } catch (err) {
      console.error(err);
    }

    res.send({ token });
  }
);

export { router as esqueciSenhaRouter };
