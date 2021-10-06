import { AppError } from './app-error';

/**
 * Classe de erro que representa uma requisição incorreta do lado
 * do cliente (400 - Bad request).
 *
 * Este erro indica que a falha aconteceu no cliente, e não no servidor.
 */
export class BadRequestError extends AppError {
  statusCode = 400;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize() {
    return { message: this.message };
  }
}
