import httpMocks from 'node-mocks-http';
import { StatusUsuario } from '../models';

import { createToken } from '../utils/tokens/jwt-sign';
import { currentUser } from './current-user';

const testJwtSecret = 'secret';

it('deve retornar usuário null se não houver cookie e header authorization', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();

  const middleware = currentUser(testJwtSecret);
  middleware(req, res, next);

  expect(req.currentUser).toBeFalsy();
  expect(next).toBeCalled();
});

it('deve retornar usuário vazio se o cookie for inválido', () => {
  const req = httpMocks.createRequest({ cookies: { jwt: 'invalid token' } });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  const middleware = currentUser(testJwtSecret);
  middleware(req, res, next);

  expect(req.currentUser).toBeUndefined();
  expect(next).toBeCalled();
});

it('deve retornar usuário vazio se o cookie estiver expirado', () => {
  const token = createToken(
    { id: '1', email: 'test@test.com', activated: StatusUsuario.ATIVO },
    testJwtSecret,
    { notBefore: '1h' }
  );

  const req = httpMocks.createRequest({ cookies: { jwt: token } });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  const middleware = currentUser(testJwtSecret);
  middleware(req, res, next);

  expect(req.currentUser).toBeUndefined();
  expect(next).toBeCalled();
});

it('deve retornar usuário se o cookie for válido', () => {
  const token = createToken(
    { id: '1', email: 'test@test.com', activated: StatusUsuario.ATIVO },
    testJwtSecret
  );

  const req = httpMocks.createRequest({ cookies: { jwt: token } });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  const middleware = currentUser(testJwtSecret);
  middleware(req, res, next);

  expect(req.currentUser).toBeDefined();
  expect(req.currentUser?.email).toEqual('test@test.com');
  expect(next).toBeCalled();
});

it('deve verificar o header "Authorization" da requisição caso o cookies "jwt" não exista', () => {
  const token = createToken(
    { id: '1', email: 'test1@test.com', activated: StatusUsuario.ATIVO },
    testJwtSecret
  );

  const req = httpMocks.createRequest({ headers: { authorization: token } });
  const res = httpMocks.createResponse();
  const next = jest.fn();

  const middleware = currentUser(testJwtSecret);
  middleware(req, res, next);

  expect(req.currentUser).toBeDefined();
  expect(req.currentUser?.email).toEqual('test1@test.com');
  expect(next).toBeCalled();
});
