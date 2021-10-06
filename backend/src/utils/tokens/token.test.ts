import { createActivationToken, validateActivationToken } from './token';

it('createActivationToken deve retornar um token de ativação válido', () => {
  const token = createActivationToken();
  expect(validateActivationToken(token)).toEqual(true);
});

it('validateActivationToken deve retornar falso se o token não for válido', () => {
  const okToken = createActivationToken();
  const badToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  expect(validateActivationToken(okToken)).toEqual(true);
  expect(validateActivationToken(badToken)).toEqual(false);
});
