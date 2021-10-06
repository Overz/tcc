import request from 'supertest';
import { app } from '../../app';
import { trampoRepository } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve lançar erro se não estiver logado', async () => {
  await request(app).get('/api/trampo/1').expect(401);
});

it('deve lançar 400 caso não encontre o trampo', async () => {
  const res = await request(app)
    .get('/api/trampo/1')
    .set('Cookie', loginCookie())
    .expect(400);

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Trampo não encontrado');
});

it('deve exibir o trampo', async () => {
  await useData('main');

  const res = await request(app)
    .get('/api/trampo/1')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(200);

  expect(res.body.id).toEqual(1);
  expect(res.body.contratante).toBeDefined();
  expect(res.body.contratado).toBeNull();
});

it('deve exibir o trampo apartir do CONTRATADO', async () => {
  await useData('main');

  const trampo = await trampoRepository.findOne(6);

  expect(trampo).toBeDefined();
  expect(trampo?.cdContratante).toBeDefined();
  expect(trampo?.cdContratado).toBeDefined();

  const res = await request(app)
    .get('/api/trampo/6')
    .query({ cdContratado: 3 })
    .set('Cookie', loginCookie());

  expect(res.body.contratante).toBeDefined();
  expect(res.body.contratado).toBeDefined();
});
