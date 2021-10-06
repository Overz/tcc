import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

/**
 * Inspeciona a requisição, procurando por erros vindos do
 * express-validator. Se algum erro for encontrado, lança
 * uma exceção do tipo RequestValidationError.
 *
 * @param req Requisição HTTP
 * @param res Resposta HTTP
 * @param next Próximo handler
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new RequestValidationError(result.array());
  }

  next();
};
