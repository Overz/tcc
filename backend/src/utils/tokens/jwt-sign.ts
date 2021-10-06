import jwt from 'jsonwebtoken';

/**
 * Define o conteúdo padrão do token de usuário autenticado.
 * Essas informações são trocadas a cada requisição HTTP, e seu conteúdo
 * pode ser livremente inspecionado, mas não alterado.
 *
 * Isso significa que informações sensíveis nunca devem ser armazenadas
 * em um valor deste tipo.
 */
export interface UserPayload {
  id: string;
  email: string;
  activated: string;
}

/**
 * Gera um token JWT e retorna a string correspondente.
 * É possível informar opções adicionais no terceiro parâmetro.
 *
 * Se não for informado um valor de expiração para o token, um valor
 * automático será preenchido.
 *
 * @param payload Os dados do usuário
 * @param secret A chave secrete usada para assinar e validar o token
 * @param options Opções extras para geração de token
 */
export const createToken = (
  payload: UserPayload,
  secret: string,
  options?: jwt.SignOptions
) => {
  if (!options) {
    options = { expiresIn: '1h' };
  }

  if (!options.expiresIn) {
    options.expiresIn = '1h';
  }

  return jwt.sign(payload, secret, options);
};
