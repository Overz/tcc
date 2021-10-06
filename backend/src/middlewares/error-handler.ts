import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/app-error';

let logError = false;

/**
 * Handler padrão para erros na aplicação. Este handler intercepta erros do tipo
 * AppError (ou derivados) e manda a resposta apropriada.
 *
 * Caso o tipo do erro não seja conhecido, é enviada uma mensagem genérica de
 * status 500 e o erro original é logado no console.
 *
 * @param err Erro que foi lançado
 * @param req Requisição HTTP
 * @param res Resposta HTTP
 * @param next Próximo handler a ser invocado
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send(err.serialize());
  }

  if (process.env.NODE_ENV !== 'test' || logError) {
    console.error(err);
  }

  res.status(500).send({ message: 'Internal server error' });
};

/**
 * Habilita a log de erros durante os testes. Isso é útil para depurar
 * eventuais erros de status 500.
 *
 * @param show Se o log de erros deve ou não acontecer
 */
export const showErrors = (show: boolean) => {
  logError = show;
};
