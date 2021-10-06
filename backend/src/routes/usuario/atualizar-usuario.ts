import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Usuario, usuarioRepository } from '../../models';

const router = Router();

router.put(
  '/api/usuario/:id',
  requireAuth,
  [
    body('nome')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar nome'),
    body('email')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o email')
      .isEmail()
      .withMessage('Formato incorreto para o email'),
    body('senha')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a senha'),
    body('telefone')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar telefone')
      .isMobilePhone('pt-BR')
      .withMessage('Formato incorreto para o telefone')
      .customSanitizer((t: string) => t.replace(/[()\s-]/g, '')),
    body('sobre')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar sobre'),
    body('pic')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('É necessário informar nome/path da foto'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, nome, telefone, sobre, pic } = req.body;

    const usuario = await usuarioRepository.findOne({
      where: { cdUsuario: id },
    });

    if (!usuario) {
      throw new BadRequestError('Usuario não encontrado!');
    }

    const emailCount = await usuarioRepository.count({
      where: { deEmail: email },
    });
    if (emailCount) {
      throw new BadRequestError('Email informado já esta em uso');
    }

    const telefoneCount = await usuarioRepository.count({
      where: { nuTelefone: telefone },
    });
    if (telefoneCount) {
      throw new BadRequestError('Telefone informado ja esta em uso');
    }

    setIfExists(usuario, nome, email, telefone, sobre, pic);

    await usuarioRepository.update(
      { cdUsuario: usuario.cdUsuario },
      { ...usuario }
    );

    res.status(204).send({});
  }
);

const setIfExists = (
  usr: Usuario,
  nome: string,
  email: string,
  telefone: string,
  sobre: string,
  pic: string
) => {
  if (nome) {
    usr.nmNome = nome;
  }

  if (email) {
    usr.deEmail = email;
  }

  if (telefone) {
    usr.nuTelefone = telefone;
  }

  if (sobre) {
    usr.deSobre = sobre;
  }

  if (pic) {
    usr.dePicture = pic;
  }
};

export { router as atualizarUsuarioRouter };
