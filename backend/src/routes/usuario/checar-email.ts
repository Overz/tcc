import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { usuarioRepository } from '../../models';

const router = Router();

router.post(
  '/api/usuario/checar-email',
  async (req: Request, res: Response) => {
    const { email } = req.query;

    const countEmail = await usuarioRepository.findOne({
      where: { deEmail: email },
    });
    if (countEmail) {
      throw new BadRequestError('Email informado já está em uso');
    }

    res.send({ ok: true });
  }
);

export { router as checarEmailRouter };
