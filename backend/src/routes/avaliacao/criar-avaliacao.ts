import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { getConnection } from 'typeorm';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import {
  avalaicaoRepository,
  StatusTrabalho,
  trampoRepository,
  Usuario,
  usuarioRepository,
} from '../../models';
import { Avaliacao, TipoElogio } from '../../models/avaliacao';
import { countElogios } from '../../utils/count-elogios';
import { avaliacaoView } from '../../views/avaliacao-view';

const { FINALIZADO } = StatusTrabalho;

const elogios = [
  TipoElogio.ADAPTAVEL,
  TipoElogio.BOM,
  TipoElogio.CARISMATICO,
  TipoElogio.COMPETENTE,
  TipoElogio.COPERATIVO,
  TipoElogio.CRIATIVO,
  TipoElogio.EFICIENTE,
  TipoElogio.EXCELENTE,
  TipoElogio.INCRIVEL,
  TipoElogio.NENHUM,
  TipoElogio.ORGANIZADO,
  TipoElogio.OTIMO,
  TipoElogio.QUERIDO,
  TipoElogio.RAPIDO,
  TipoElogio.ZELOSO,
];

const router = Router();

router.post(
  '/api/avaliacao',
  requireAuth,
  [
    body('nota')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a nota do usuário'),
    body('elogio')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o elogio')
      .custom((e) => elogios.includes(e))
      .withMessage('Elogio não válido'),
    body('avaliado')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o id do usuário'),
    body('trampo')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o id do trabalho'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { nota, elogio, avaliado, trampo: cdTrampo } = req.body;
    const id = Number(req.currentUser.id);

    console.log(req.body, id);
    const trampo = await trampoRepository.findOne({
      where: { cdTrampo },
      loadRelationIds: true,
    });

    if (!trampo) {
      throw new BadRequestError('Trabalho não encontrado');
    }

    if (id !== trampo.cdContratante && id !== trampo.cdContratado) {
      throw new BadRequestError('Usuário não condiz para a avaliação');
    }

    if (trampo.flStatus !== FINALIZADO) {
      throw new BadRequestError('Trabalho não finalizado');
    }

    const avaliacao = await avalaicaoRepository.count({
      where: { cdTrampo: trampo.cdTrampo, cdAvaliador: id },
    });

    if (avaliacao) {
      throw new BadRequestError('Avaliacao existente');
    }

    const cdAvaliado =
      id === trampo.cdContratado
        ? (trampo.cdContratante as number)
        : (trampo.cdContratado as number);

    const novaAvaliacao = new Avaliacao();
    novaAvaliacao.cdTrampo = trampo;
    novaAvaliacao.cdAvaliador = id;
    novaAvaliacao.cdAvaliado = cdAvaliado;
    novaAvaliacao.nuNota = nota;
    novaAvaliacao.tpElogio = elogio || TipoElogio.NENHUM;

    const { sum } = await getConnection()
      .createQueryBuilder()
      .select('SUM(a.nuNota)')
      .from(Avaliacao, 'a')
      .where('a.cdAvaliado = :cdAvaliado', { cdAvaliado })
      .getRawOne();

    const user = (await usuarioRepository.findOne({
      select: ['nuTotalTrampos', 'cdUsuario', 'nuAvaliacao'],
      where: { cdUsuario: cdAvaliado },
    })) as Usuario;

    const total = sum + user.nuAvaliacao + Number(nota);
    const divisor = user.nuTotalTrampos <= 1 ? 2 : user.nuTotalTrampos;
    const media = total / divisor;

    user.nuAvaliacao = Number(media.toFixed(1));
    await usuarioRepository.save(user);

    const resp = await avalaicaoRepository.save(novaAvaliacao);

    elogio &&
      (await avalaicaoRepository.increment(
        { cdAvaliado: avaliado },
        'nuTotalElogios',
        1
      ));

    res.status(201).send(
      avaliacaoView({
        cdAvaliado,
        cdAvaliacao: resp.cdAvaliacao,
        dtCadastro: user.dtCriacao,
        nuAvaliacao: user.nuAvaliacao,
        nuTotalTrampos: user.nuTotalTrampos,
        tpElogios: await countElogios(cdAvaliado),
        dePicture: user.dePicture,
      })
    );
  }
);

export { router as criarAvaliacaoRouter };
