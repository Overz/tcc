import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import {
  enderecoRepository,
  trampoRepository,
  usuarioRepository,
} from '../../models';
import {
  FinalizacaoPendente,
  StatusTrabalho,
  TipoTrabalho,
  Trampo,
} from '../../models/trampo';
import { trampoView } from '../../views/trampo-view';

const router = Router();

const { ONLINE, PRESENCIAL } = TipoTrabalho;

router.post(
  '/api/trampo/novo',
  requireAuth,
  [
    body('grupo')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o grupo de trabalho'),
    body('area')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a área de trabalho'),
    body('tipo')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o tipo de trabalho')
      .custom((v) => [ONLINE, PRESENCIAL].includes(v))
      .withMessage('Tipo deve ser O(Online), ou P(Presencial)'),
    body('remuneracao')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a remuneração')
      .custom((v: string) => v.match(/[0-9]{1,10}/g))
      .withMessage(`Remuneração esta no formato incorreto`),
    body('descricao')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a descricao do trabalho')
      .isLength({ min: 1, max: 1000 })
      .withMessage('Descricao deve conter entre 1 a 1000 caracteres'),
    body('endereco')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o ID do endereço'),
    body('dtentrega')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar data de entrega')
      .custom((v: string) =>
        v.match(
          /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/g
        )
      )
      .withMessage('Data de entrega informada esta no formato errado'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      grupo,
      area,
      tipo,
      remuneracao,
      dtentrega,
      descricao,
      endereco,
    } = req.body;

    const usuario = await usuarioRepository.findOne(req.currentUser.id);
    if (!usuario) {
      throw new BadRequestError('Usuário não encontrado para este cadastro');
    }

    let endId: number | null = null;
    if (tipo === PRESENCIAL) {
      const addrs = await enderecoRepository.findOne({
        select: ['cdEndereco'],
        where: { cdEndereco: endereco },
      });
      if (!addrs) {
        throw new BadRequestError(
          'Endereco não encontrado para o vinculo com o trabalho'
        );
      }

      endId = addrs.cdEndereco;
    }

    const trampo = new Trampo();
    trampo.nmGrupo = grupo;
    trampo.cdEndereco = endId;
    trampo.nmAreaTrabalho = area;
    trampo.flTipo = tipo;
    trampo.vlRemuneracao = remuneracao;
    trampo.dtEntrega = new Date(Date.parse(dtentrega));
    trampo.deDescricao = descricao;
    trampo.flStatus = StatusTrabalho.PENDENTE;
    trampo.cdContratante = usuario;
    trampo.dtPublicado = new Date();
    trampo.flFinalizacaoPendente = FinalizacaoPendente.NAO;

    const resp = await trampoRepository.save(trampo);

    res.status(201).send(trampoView(resp));
  }
);

export { router as criarTrampoRouter };
