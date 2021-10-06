import { StatusUsuario } from '../../models';
import { createToken } from './jwt-sign';

it('deve criar um token no formato correto', () => {
  const jwt = createToken(
    { id: '1', email: 'a@a.com', activated: StatusUsuario.ATIVO },
    'Secret'
  );

  expect(jwt).toBeDefined();
  expect(jwt.split('.')).toHaveLength(3);
});
