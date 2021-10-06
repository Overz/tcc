import request from 'supertest';
import { app } from '../../app';
import { StatusUsuario, usuarioRepository } from '../../models';
import { useData } from '../../tests/data';
import { createActivationToken } from '../../utils/tokens/token';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockImplementation(() => ({ messageId: '' })),
    options: jest.fn().mockImplementation(() => ({ host: '' })),
  })),
}));

it('deve retornar status 400 se não for informado o token', async () => {
  const res = await request(app).post('/api/usuario/resetar-senha').send({});

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual(
    'É necessário informar um token de ativação'
  );
});

it('deve retornar status 400 se não for informado a senha', async () => {
  const res = await request(app)
    .post('/api/usuario/resetar-senha')
    .send({ token: 'token' });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar a senha');
});

it('deve retornar status 400 se a senha nao conter mais que 8 caracteres', async () => {
  const res = await request(app)
    .post('/api/usuario/resetar-senha')
    .send({ token: 'token', senha: '12345' });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual(
    'Tamanho minimo de 8 caracteres para senha não atingido'
  );
});

it('deve retornar status 400 se o token informado for inválido', async () => {
  const res = await request(app).post('/api/usuario/resetar-senha').send({
    token: 'token',
    senha: '123456789',
  });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Token de ativação invalido');
});

it('deve retornar status 400 se não for encontrado usuario para o email informado', async () => {
  await useData('usuario');
  const token = createActivationToken();

  const res = await request(app).post('/api/usuario/resetar-senha').send({
    token,
    senha: '123456798',
  });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Erro ao encontrar o usuario');
});

it('deve recriar o token para reativação da conta do usuario, caso tenha esquecido a senha', async () => {
  await useData('usuario');

  let usuario = await usuarioRepository.findOne(1);

  expect(usuario?.flStatus).toEqual(StatusUsuario.ATIVO);
  expect(usuario?.deToken).toEqual(null);

  let res = await request(app)
    .post('/api/usuario/esqueci-senha')
    .send({ email: 'joaozinho@email.com' });

  const token = res.body.token;

  usuario = await usuarioRepository.findOne(1);
  expect(res.status).toEqual(200);
  expect(usuario?.flStatus).toEqual(StatusUsuario.INATIVO);
  expect(usuario?.deToken).toEqual(token);

  res = await request(app).post('/api/usuario/resetar-senha').send({
    token,
    senha: '987654321',
  });

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ ok: true });
});
