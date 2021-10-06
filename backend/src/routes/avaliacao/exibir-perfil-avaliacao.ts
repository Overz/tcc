import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { usuarioRepository } from '../../models';
import { countElogios } from '../../utils/count-elogios';

const router = Router();

router.get(
  '/api/avaliacao/pessoal/:cdUsuario',
  requireAuth,
  async (req: Request, res: Response) => {
    const usuario = await usuarioRepository.findOne(req.params.cdUsuario);

    if (!usuario) {
      throw new BadRequestError('Usuario não encontrado');
    }

    res.send({
      id: usuario.cdUsuario,
      nome: usuario.nmNome,
      totalTrabalhos: usuario.nuTotalTrampos,
      avaliacao: usuario.nuAvaliacao,
      dtcadastro: usuario.dtCriacao,
      elogios: await countElogios(usuario.cdUsuario),
      pic: usuario.dePicture,
      sobre: usuario.deSobre,
    });
  }
);

export { router as perfilAvaliacaoRouter };
