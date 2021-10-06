import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedError } from '../errors/not-authorized-error';

/**
 * Middleware que requer autenticação. Para funcionar corretamente, precisa que antes
 * o middleware currentUser seja devidamente configurado.
 *
 * Este middleware automaticamente lança um erro 'Not Authorized' se o usuário
 * não estiver logado.
 *
 * @param req Requisiçao HTTP (express)
 * @param res Resposta HTTP (express)
 * @param next Função que passa o controle para o próximo handler
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
