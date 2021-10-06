import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { createDefaultTransporter, sendMail } from '../../events/mail';
import { validateRequest } from '../../middlewares/validate-request';

const emailRgx = /(.*\s(<[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?>))/g;

const router = Router();

router.post(
  '/api/debug/sendmail',
  [
    body('body')
      .trim()
      .notEmpty()
      .withMessage('`body`: É necessário informar o Conteúdo do email'),
    body('recipient')
      .trim()
      .notEmpty()
      .withMessage('`recipient`: É necessário informar o Destinatário do email')
      .isEmail()
      .withMessage('Deve seguir o formato de Email'),
    body('subject')
      .trim()
      .notEmpty()
      .withMessage('`subject`: É necessário informar o Titulo do email'),
    body('sender')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('`sender`: É necessário informar o Remetente')
      .custom((v: string) => v.match(emailRgx))
      .withMessage('O remetente deve estar no formato: `Nome <email>`'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const body = {
      ...req.body,
      sender: req.body.sender || 'Trampo <no-reply@trampo.com.br>',
    };

    const transp = await createDefaultTransporter();
    sendMail(transp, body);

    res.send({ ok: true });
  }
);

export { router as debugSendMailRouter };
