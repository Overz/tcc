import { JWT_KEY } from '../../utils/constants';
import { createToken } from '../../utils/tokens/jwt-sign';

/**
 * Retorna um valor de cookie que simula um login válido.
 * O valor retornado está pronto para ser usado diretamente, e
 * muda a cada chamada desta função.
 *
 * @param internal True caso seja um usuário "interno"
 */
export const loginCookie = (userData?: UserData) => {
  const activated = userData?.activated || '';

  const token = createToken(
    { id: '1', email: 'test@test.com', activated, ...userData },
    JWT_KEY
  );

  return `jwt=${token}`;
};

interface UserData {
  id?: string;
  email?: string;
  activated?: string;
}
