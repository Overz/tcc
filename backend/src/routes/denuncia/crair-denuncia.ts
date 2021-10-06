import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { denunciaRepository, usuarioRepository } from '../../models';

const router = Router();

router.post(
  '/api/denuncia',
  requireAuth,
  [
    body('descricao')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a descricao'),
    body('usuario')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o id do usuario denunciado'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { descricao, usuario } = req.body;

    const count = await usuarioRepository.count({
      where: { cdUsuario: usuario },
    });
    if (!count) {
      throw new BadRequestError('Nenhum usuario encontrado');
    }

    const denuncia = await denunciaRepository.save({
      cdUsuario: usuario,
      deDescricao: descricao,
    });

    res.send({
      id: denuncia.cdDenuncia,
      usuario: denuncia.cdUsuario,
      descricao: denuncia.deDescricao,
    });
  }
);

export { router as ChangeThisName };
