import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateCep, validateUF } from 'validations-br';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { usuarioRepository, enderecoRepository, Endereco } from '../../models';

const router = Router();

router.put(
  '/api/endereco/:id',
  requireAuth,
  [
    body('cep')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o cep')
      .custom(validateCep)
      .withMessage('Formato incorreto para o cep'),
    body('rua')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a rua'),
    body('bairro')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o bairro'),
    body('estado')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o estado no padrão UF')
      .custom(validateUF)
      .withMessage('Formato incorreto para o estado'),
    body('pais')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o pais'),
    body('cidade').optional().trim().notEmpty(),
    body('numero')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o número'),
    body('latitude')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a latitude')
      .isNumeric()
      .withMessage('Latitude deve ser do tipo numerico'),
    body('longitude')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a longitude')
      .isNumeric()
      .withMessage('Longitude deve ser do tipo numerico'),
    body('nome')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar um nome'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      cep,
      rua,
      bairro,
      estado,
      pais,
      cidade,
      numero,
      latitude,
      longitude,
      nome,
    } = req.body;

    const usuario = await usuarioRepository.findOne({
      where: { cdUsuario: id },
    });

    if (!usuario) {
      throw new BadRequestError('Usuario não existente para este endereço');
    }

    const endereco = await enderecoRepository.findOne({
      where: { cdUsuario: usuario.cdUsuario },
    });

    if (!endereco) {
      throw new BadRequestError('Endereco não existente para este usuario');
    }

    setIfExist(
      endereco,
      cep,
      rua,
      bairro,
      cidade,
      estado,
      pais,
      numero,
      latitude,
      longitude,
      nome
    );

    await enderecoRepository.update(
      { cdEndereco: endereco.cdEndereco },
      { ...endereco }
    );

    res.status(204).send({});
  }
);

// eslint-disable-next-line complexity
const setIfExist = (
  end: Endereco,
  cep: string,
  rua: string,
  bairro: string,
  cidade: string,
  estado: string,
  pais: string,
  numero: string,
  latitude: string,
  longitude: string,
  nome: string
) => {
  if (cep) {
    end.nuCep = cep;
  }

  if (rua) {
    end.nmRua = rua;
  }

  if (bairro) {
    end.nmBairro = bairro;
  }

  if (cidade) {
    end.nmCidade = cidade;
  }

  if (estado) {
    end.sgEstado = estado;
  }

  if (pais) {
    end.nmPais = pais;
  }

  if (numero) {
    end.nuNumero = numero;
  }

  if (latitude) {
    end.nuLatitude = latitude;
  }

  if (longitude) {
    end.nuLongitude = longitude;
  }

  if (nome) {
    end.deNome = nome;
  }
};

export { router as atualizarEnderecoRouter };
