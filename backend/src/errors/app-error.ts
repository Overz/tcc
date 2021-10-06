/**
 * Representa o formato de erros padrão retornado
 * pela aplicação.
 */
export interface ErrorData {
  message: string;
  errors?: string[];
}

/**
 * Classe abstrata base para definir os erros da aplicação.
 *
 * Se você lançar um erro desse tipo, o handler de erros irá
 * interceptar e tratar o status e a resposta HTTP corretamente.
 */
export abstract class AppError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }

  abstract serialize(): ErrorData;
}
