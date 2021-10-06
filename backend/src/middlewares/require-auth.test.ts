import mockHttp from 'node-mocks-http';

import { NotAuthorizedError } from '../errors/not-authorized-error';
import { StatusUsuario } from '../models';
import { requireAuth } from './require-auth';

it('deve lançar um erro se não houver usuário logado', () => {
  const req = mockHttp.createRequest();
  const res = mockHttp.createResponse();
  const next = jest.fn();

  expect(() => {
    requireAuth(req, res, next);
  }).toThrow(NotAuthorizedError);
  expect(next).not.toBeCalled();
});

it('deve continuar normalmente se houver usuário logado', () => {
  const req = mockHttp.createRequest();
  const res = mockHttp.createResponse();
  const next = jest.fn();

  req.currentUser = {
    id: '1',
    email: 'test@test.com',
    activated: StatusUsuario.ATIVO,
  };
  requireAuth(req, res, next);

  expect(next).toBeCalled();
});
