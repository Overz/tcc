import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../utils/tokens/jwt-sign';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}

/**
 * Retorna um middleware capaz de carregar as informações do token JWT do
 * usuário, disponibilizando o payload na propriedade currentUser da
 * requisição HTTP.
 *
 * Caso o token não exista ou seja inválido, currentUser será undefined.
 *
 * Idealmente, este middleware deve ser configurado apenas uma vez por aplicação
 * e depois, em cada rota, o middleware requireAuth poderá ser usado para
 * exigir o login em funções específicas da API.
 *
 * @param jwtSecret A chave secreta para decodificar o token JWT
 */
export const currentUser = (jwtSecret: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies['jwt'] && !req.headers.authorization) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.cookies['jwt'] || req.headers.authorization,
      jwtSecret
    ) as UserPayload;

    req.currentUser = payload;
  } catch (err) {
    // nao fazer nada; só significa que não está logado
  }

  next();
};
