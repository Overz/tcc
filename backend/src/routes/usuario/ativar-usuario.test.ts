import request from 'supertest';
import { app } from '../../app';
import { usuarioRepository, StatusUsuario } from '../../models';
import { useData } from '../../tests/data';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockImplementation(() => {
      return {
        messageId: '',
      };
    }),
    options: jest.fn().mockImplementation(() => {
      return {
        host: '',
      };
    }),
  })),
}));

it('deve retornar status 400 se não for informado token', async () => {
  const res = await request(app).post('/api/usuario/ativar').send({});

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar o token');
});

it('deve ativar um usuario', async () => {
  await useData('usuario');

  let res = await request(app).post('/api/usuario/novo').send({
    nome: 'nome',
    email: 'email@email.com',
    senha: '123456789',
    cpf: '01234567890',
    telefone: '48999222534',
    pic: 'CL',
    sobre: 'sobre',
  });

  expect(res.status).toEqual(201);

  const { token } = res.body;
  res = await request(app).post('/api/usuario/ativar').send({
    token,
    email: 'email@email.com',
  });

  expect(res.status).toEqual(200);
  expect(res.body.ok).toEqual(true);

  const usuario = await usuarioRepository.findOne({
    where: { nuCpf: '01234567890' },
  });

  expect(usuario?.flStatus).toEqual(StatusUsuario.ATIVO);
  expect(usuario?.deToken).toEqual(null);
});

it('deve lançar erro caso o token seja invalido', async () => {
  await useData('usuario');

  // cria um usuário inativo
  let res = await request(app).post('/api/usuario/novo').send({
    nome: 'nome',
    email: 'email@email.com',
    senha: '123456789',
    cpf: '01234567890',
    telefone: '48999222534',
    pic: 'CL',
    sobre: 'sobre',
  });

  expect(res.status).toEqual(201);

  // tenta ativar o usuário recém-criado
  res = await request(app).post('/api/usuario/ativar').send({ token: 'token' });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Token de ativação inválido');
});

it('deve retornar status 400 se o usuário já está ativo', async () => {
  // cria um usuário inativo
  let res = await request(app).post('/api/usuario/novo').send({
    nome: 'nome',
    email: 'email@email.com',
    senha: '123456789',
    cpf: '01234567890',
    telefone: '48999222534',
    pic: 'CL',
    sobre: 'sobre',
  });

  expect(res.status).toEqual(201);

  // tenta ativar o usuário recém-criado
  const { token } = res.body;
  res = await request(app)
    .post('/api/usuario/ativar')
    .send({ token, email: 'test@test.com' });

  expect(res.status).toEqual(200);
  expect(res.body.ok).toEqual(true);

  // tenta ativar de novo
  res = await request(app)
    .post('/api/usuario/ativar')
    .send({ token, email: 'test@test.com' });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Token de ativação inválido');
});
