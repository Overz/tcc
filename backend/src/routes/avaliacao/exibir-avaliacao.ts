import { Router, Request, Response } from 'express';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { avalaicaoRepository, Usuario, usuarioRepository } from '../../models';
import { countElogios } from '../../utils/count-elogios';
import { AvaliacaoView } from '../../views/avaliacao-view';

const router = Router();

router.get(
  '/api/avaliacao/:cdAvaliacao',
  requireAuth,
  async (req: Request, res: Response) => {
    const { cdAvaliacao } = req.params;
    const id = Number(req.currentUser.id);

    const avaliacao = await avalaicaoRepository.findOne({
      where: { cdAvaliacao, cdAvaliado: id },
      loadRelationIds: true,
    });

    if (!avaliacao) {
      throw new BadRequestError('Avaliação não encontrada');
    }

    const usuario = (await usuarioRepository.findOne(id)) as Usuario;

    const avaliacaoParams: AvaliacaoView = {
      elogios: await countElogios(avaliacao.cdAvaliado as number),
      id: avaliacao.cdAvaliacao,
      avaliado: +avaliacao.cdAvaliado,
      nota: usuario.nuAvaliacao,
      cadastro: usuario.dtCriacao,
      totalTrabalhos: usuario.nuTotalTrampos,
      pic: usuario.dePicture,
    };

    res.send(avaliacaoParams);
  }
);

export { router as exibirAvaliacaoRouter };
