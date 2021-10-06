import { AppError } from './app-error';

const message = 'Not authorized';

/**
 * Classe de erro que representa uma proibição de acesso a determinado
 * endpoint. Em regra, isso significa que o cliente não está logado ou
 * não possui a autorização necessária.
 */
export class NotAuthorizedError extends AppError {
  statusCode = 401;

  constructor() {
    super(message);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize() {
    return { message };
  }
}
