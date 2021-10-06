import { ValidationError } from 'express-validator';

import { BadRequestError } from './bad-request-error';

/**
 * Classe que representa um (ou mais) erros de validação, por
 * parte do cliente.
 *
 * Esta classe serve como um helper para extrair os erros de
 * validação do express-validator e tratá-los de maneira unificada.
 */
export class RequestValidationError extends BadRequestError {
  errors: string[];

  constructor(errors: ValidationError[]) {
    super(errors[0].msg);
    Object.setPrototypeOf(this, RequestValidationError.prototype);

    this.errors = errors.map((e) => e.msg);
  }

  serialize() {
    return { message: this.message, errors: this.errors };
  }
}
