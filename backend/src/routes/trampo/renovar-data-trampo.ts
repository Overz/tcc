import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import {
  FinalizacaoPendente,
  StatusTrabalho,
  trampoRepository,
  usuarioRepository,
} from '../../models';

const { CANCELADO, FINALIZADO } = StatusTrabalho;

const router = Router();

router.put(
  '/api/trampo/:cdTrampo/renovar-data',
  requireAuth,
  [
    body('dtentrega')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a data de entrega'),
  ],
  async (req: Request, res: Response) => {
    const usuario = await usuarioRepository.findOne({
      where: { cdUsuario: req.currentUser.id },
    });

    if (!usuario) {
      throw new BadRequestError('Usuário não encontrado');
    }

    const trampo = await trampoRepository.findOne({
      where: { cdTrampo: req.params.cdTrampo },
      loadRelationIds: true,
    });

    if (!trampo) {
      throw new BadRequestError('Trabalho não encontrado');
    }

    if (
      [CANCELADO, FINALIZADO].includes(trampo.flStatus) ||
      FinalizacaoPendente.SIM === trampo.flFinalizacaoPendente
    ) {
      throw new BadRequestError('Trabalho já Finalizado/Cancelado');
    }

    if (trampo.cdContratante !== usuario.cdUsuario) {
      throw new BadRequestError('Sem autorização');
    }

    trampo.dtEntrega = new Date(Date.parse(req.body.dtentrega));

    await trampoRepository.save(trampo);

    res.status(204).send({});
  }
);

export { router as renovarDataTrampoRouter };
