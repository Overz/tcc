import mockHttp from 'node-mocks-http';
import { body } from 'express-validator';

import { validateRequest } from './validate-request';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

// aux que força a execução das validações
const runValidations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validations = [
    body('field1').trim().notEmpty().withMessage('field1 is required'),
    body('field2').optional().isEmail().withMessage('field2 is required'),
  ];

  await Promise.all(validations.map((validation) => validation.run(req)));
  return next();
};

it('deve apenas continuar caso nenhum erro seja detectado', async () => {
  const req = mockHttp.createRequest({ body: { field1: 'some content' } });
  const res = mockHttp.createResponse();
  const next = jest.fn();

  await runValidations(req, res, jest.fn());
  validateRequest(req, res, next);

  expect(next).toBeCalled();
});

it('deve retornar erro se o campo obrigatório estiver vazio', async () => {
  const req = mockHttp.createRequest();
  const res = mockHttp.createResponse();
  const next = jest.fn();

  await runValidations(req, res, jest.fn());
  const wrapper = () => validateRequest(req, res, next);

  expect(wrapper).toThrow(RequestValidationError);
  expect(wrapper).toThrow('field1 is required');
  expect(next).not.toBeCalled();
});

it('deve retornar erro se o campo opcional for inválido', async () => {
  const req = mockHttp.createRequest({
    body: { field1: 'some content', field2: 'invalid email' },
  });
  const res = mockHttp.createResponse();
  const next = jest.fn();

  await runValidations(req, res, jest.fn());
  const wrapper = () => validateRequest(req, res, next);

  expect(wrapper).toThrow(RequestValidationError);
  expect(wrapper).toThrow('field2 is required');
  expect(next).not.toBeCalled();
});
