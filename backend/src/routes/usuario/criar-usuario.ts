import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../../errors/bad-request-error';
import { createDefaultTransporter, sendMail } from '../../events/mail';
import { validateRequest } from '../../middlewares/validate-request';
import { usuarioRepository, Usuario, StatusUsuario } from '../../models';
import { MAIL_SENDER } from '../../utils/constants';
import { createPassword } from '../../utils/password/password';
import { createActivationToken } from '../../utils/tokens/token';
import { cpf as validator } from 'cpf-cnpj-validator';

const router = Router();

router.post(
  '/api/usuario/novo',
  [
    body('nome').trim().notEmpty().withMessage('É necessário informar nome'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o email')
      .isEmail()
      .withMessage('Formato incorreto para o email')
      .isLength({ max: 150 })
      .withMessage('Email deve ter no máximo 150 caracteres!'),
    body('senha')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a senha')
      .isLength({ min: 8 })
      .withMessage('Tamanho minimo de 8 caracteres para senha não atingido'),
    body('cpf')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar cpf')
      .isLength({ min: 11, max: 14 })
      .withMessage('Formato incorreto para cpf')
      .customSanitizer((cpf: string) => cpf.replace(/[.-]/g, ''))
      .custom((cpf) => validator.isValid(cpf))
      .withMessage('Campo cpf informado é invalido!'),
    body('telefone')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar telefone')
      .customSanitizer(
        (v: string) => v && v.replace(/[()-]/g, '').trim().split(' ').join('')
      )
      .isMobilePhone('pt-BR')
      .withMessage('Formato incorreto para o telefone'),
    body('pic')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar o nome/path da foto'),
    body('sobre')
      .trim()
      .notEmpty()
      .withMessage(
        'É necessário informar algo sobre o usuario no campo "sobre"'
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, senha, nome, cpf, telefone, sobre, pic } = req.body;

    let usuario = await usuarioRepository.findOne({ where: { nuCpf: cpf } });
    if (usuario) {
      throw new BadRequestError('Cpf informado já esta em uso');
    }

    const telefoneCount = await usuarioRepository.count({
      where: { nuTelefone: telefone },
    });

    if (telefoneCount) {
      throw new BadRequestError(`Telefone informado já esta em uso`);
    }

    const emailCount = await usuarioRepository.count({
      where: { deEmail: email },
    });

    if (emailCount) {
      throw new BadRequestError('Email inormado ja esta em uso');
    }

    const token = createActivationToken();
    usuario = new Usuario();
    usuario = {
      ...usuario,
      deEmail: email,
      deSenha: createPassword(senha),
      nmNome: nome,
      nuCpf: cpf,
      deSobre: sobre ? sobre : null,
      nuTelefone: telefone,
      dePicture: pic,
      flStatus: StatusUsuario.INATIVO,
      deToken: token,
      dtCriacao: new Date(),
      nuAvaliacao: 5.0,
    };

    await usuarioRepository.save(usuario);

    try {
      const transporter = await createDefaultTransporter();
      sendMail(transporter, {
        sender: 'no-reply@trampo.com.br' || MAIL_SENDER,
        body: `Token de ativação: ${token}`,
        recipient: `${nome} ${email}`,
        subject: 'Ativação de Conta',
      });
    } catch (err) {
      console.error(err);
    }

    res.status(201).send({ token });
  }
);

export { router as criarUsuarioRouter };
