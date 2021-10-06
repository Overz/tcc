import { createPassword, checkPassword } from './password';

it('createPassword deve retornar o hash de uma senha', () => {
  const original = 'teste';
  const hashed = createPassword(original);

  expect(hashed).not.toEqual(original);
  expect(checkPassword(original, hashed)).toEqual(true);
});

it('checkPassword deve validar se o texto bate com o hash existente', () => {
  const hash1 = '$2b$10$N83/ILfMv/sTouLXt5qtZuH8R91SAY5.7nOWN5XJXN2TCTP71YT06';
  const hash2 = '$2b$10$t4oA9KIQPgxxQG3e.V2CJebOCwVDSHrY6t0Mlms7IgW4WXkT6tPSG';

  expect(checkPassword('teste', hash1)).toEqual(true);
  expect(checkPassword('teste', hash2)).toEqual(true);
  expect(checkPassword('testex', hash1)).toEqual(false);
});
