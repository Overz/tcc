import request from 'supertest';
import { app } from '../../app';
import { useData } from '../../tests/data';

it('deve retornar status 400 se o email informado já estiver em uso', async () => {
  await useData('usuario');

  const res = await request(app)
    .post('/api/usuario/checar-email')
    .query({ email: 'joaozinho@email.com' });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Email informado já está em uso');
});

it('deve retornar ok se o email estiver livre', async () => {
  await useData('usuario');

  const res = await request(app)
    .post('/api/usuario/checar-email')
    .query({ email: 'a@a.com' });

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ ok: true });
});
