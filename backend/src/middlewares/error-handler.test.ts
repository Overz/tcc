import httpMocks from 'node-mocks-http';
import { NotFoundError } from '../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';
import { errorHandler, showErrors } from './error-handler';
import { ErrorData } from '../errors/app-error';

const spy = jest.spyOn(console, 'error').mockImplementation();

afterEach(() => {
  spy.mockClear();
});

it('deve retornar 404 quando receber um NotFoundError', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const err = new NotFoundError();
  const next = jest.fn();

  errorHandler(err, req, res, next);

  expect(res.statusCode).toEqual(404);
  expect(res._getData()).toEqual(err.serialize());
  expect((res._getData() as ErrorData).message).toEqual('Not found');
  expect(next).not.toBeCalled();
});

it('deve retornar 400 quando receber um BadRequestError', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const err = new BadRequestError('erro de exemplo');
  const next = jest.fn();

  errorHandler(err, req, res, next);

  expect(res.statusCode).toEqual(400);
  expect(res._getData()).toEqual(err.serialize());
  expect((res._getData() as ErrorData).message).toEqual('erro de exemplo');
  expect(next).not.toBeCalled();
});

it('deve retornar 500 se o erro for desconhecido', () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const err = new Error('erro desconhecido');
  const next = jest.fn();
  showErrors(true);

  errorHandler(err, req, res, next);

  expect(res.statusCode).toEqual(500);
  expect(next).not.toBeCalled();
});
