import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateCep, validateUF } from 'validations-br';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { usuarioRepository, enderecoRepository } from '../../models';
import { sanitizeLocal } from '../../utils/sanitize-local';
import { enderecoView } from '../../views/endereco-view';

const router = Router();

router.post(
  '/api/endereco',
  requireAuth,
  [
    body('cep')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o cep')
      .custom(validateCep)
      .withMessage('Formato incorreto para o cep'),
    body('rua').trim().notEmpty().withMessage('É necessário informar a rua'),
    body('bairro')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o bairro'),
    body('estado')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o estado no padrão UF')
      .custom(validateUF)
      .withMessage('Formato incorreto para o estado'),
    body('pais').trim().notEmpty().withMessage('É necessário informar o pais'),
    body('cidade')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a cidade'),
    body('numero')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o número'),
    body('latitude')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a latitude')
      .isNumeric()
      .withMessage('Latitude deve ser do tipo numerico'),
    body('longitude')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a longitude')
      .isNumeric()
      .withMessage('Longitude deve ser do tipo numerico'),
    body('nome').trim().notEmpty().withMessage('É necessário informar um nome'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      nome,
      cep,
      rua,
      numero,
      cidade,
      bairro,
      estado,
      latitude,
      longitude,
      pais,
    } = req.body;

    const usuario = await usuarioRepository.findOne(req.currentUser.id);

    if (!usuario) {
      throw new BadRequestError(
        'Usuario não encontrado para o cadastro deste endereco'
      );
    }

    const endereco = await enderecoRepository.save({
      cdUsuario: usuario.cdUsuario,
      nmRua: rua,
      nuCep: cep,
      nmPais: pais,
      deNome: nome,
      nuNumero: numero,
      sgEstado: estado,
      nmBairro: bairro,
      nmCidade: sanitizeLocal(cidade),
      nuLongitude: String(longitude),
      nuLatitude: String(latitude),
    });

    res.status(201).send(enderecoView(endereco));
  }
);

export { router as criarEnderecoRouter };
