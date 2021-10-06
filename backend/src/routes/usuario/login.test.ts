import request from 'supertest';
import { app } from '../../app';
import { useData } from '../../tests/data';

it('deve retornar status 400 se não for informado o email', async () => {
  const res = await request(app).post('/api/usuario/login').send({});

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar o email');
});

it('deve retornar status 400 se não for informado a senha', async () => {
  const res = await request(app).post('/api/usuario/login').send({
    email: 'a@a.com',
  });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar a senha');
});

it('deve retornar status 400 se não for informado o email válido', async () => {
  const res = await request(app)
    .post('/api/usuario/login')
    .send({ email: 'xxxxxxx' });
  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar o email');
});

it('deve retornar status 400 se o login e senha não baterem', async () => {
  await useData('usuario');

  const res = await request(app)
    .post('/api/usuario/login')
    .send({ email: 'joaozinho@email.com', senha: 'xxxx' });
  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Credenciais inválidas');
});

it('deve setar o token se os dados estiverem ok', async () => {
  await useData('usuario');

  const res = await request(app)
    .post('/api/usuario/login')
    .send({ email: 'joaozinho@email.com', senha: '123456789' });
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ ok: true });
  expect(res.get('Set-Cookie')).toBeDefined();
});

it('deve retornar status 400 se o usuário estiver inativo', async () => {
  await useData('usuario');

  const res = await request(app)
    .post('/api/usuario/login')
    .send({ email: 'barbosa@email.com', senha: '123456789' });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Usuário não ativo');
});

it('deve logar', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/login').send({
    email: 'joaozinho@email.com',
    senha: '123456789',
  });

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ ok: true });
});
