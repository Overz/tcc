import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { validateRequest } from '../../middlewares/validate-request';
import { usuarioRepository } from '../../models';
import { cpf as validator } from 'cpf-cnpj-validator';

const router = Router();

router.post(
  '/api/usuario/checar-dados',
  [
    body('nome').trim().notEmpty().withMessage('É necessário informar o nome'),
    body('cpf')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o cpf')
      .customSanitizer((v: string) => v.replace(/[.-]/g, '').trim())
      .custom((cpf) => validator.isValid(cpf))
      .withMessage('O cpf informado é inválido'),
    body('telefone')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o telefone')
      .customSanitizer(
        (v: string) => v && v.replace(/[()-]/g, '').trim().split(' ').join('')
      )
      .isMobilePhone('pt-BR')
      .withMessage('Formato incorreto para o telefone'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { cpf, telefone } = req.body;

    const cpfCount = await usuarioRepository.count({ where: { nuCpf: cpf } });
    if (cpfCount) {
      throw new BadRequestError('O cpf informado já está em uso');
    }

    const telefoneCount = await usuarioRepository.count({
      where: { nuTelefone: String(telefone).trim() },
    });
    if (telefoneCount) {
      throw new BadRequestError('O telefone informado já está em uso');
    }

    res.send({ ok: true });
  }
);

export { router as checarDadosRouter };
