import { AppError } from './app-error';

const message = 'Not found';

/**
 * Classe de erro que indica que determinado endpoint não
 * foi encontrado.
 *
 * Isso pode significar que o endpoint em si não existe ou que
 * o recurso que ele referencia não foi encontrado.
 */
export class NotFoundError extends AppError {
  statusCode = 404;

  constructor() {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return { message };
  }
}
