import ms from 'ms';
import { nanoid } from 'nanoid';

/**
 * Cria um token JWT de ativação. Este token deverá ser usado
 * para "ativar" a conta de um usuário recém-cadastrado.
 */
export const createActivationToken = (): string => {
  const randomId = nanoid(8);
  const expiracao = new Date().getTime() + ms('1d');
  const expiracaoHexaDecimal = expiracao.toString(16);
  return `${randomId}.${expiracaoHexaDecimal}`;
};

/**
 * Valida de um token de ativação ainda é valido. Se for, significa que
 * a conta de usuário deverá ser ativada.
 *
 * @param token Token enviado ao usuário
 */
export const validateActivationToken = (token: string): boolean => {
  const payload = token.split('.');
  const expiracaoHexadecimal = payload[1];
  const expiracaoNumerica = parseInt(expiracaoHexadecimal, 16);
  const now = new Date().getTime();
  return expiracaoNumerica > now;
};
