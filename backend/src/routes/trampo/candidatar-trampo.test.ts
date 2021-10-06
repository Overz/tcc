import request from 'supertest';
import { app } from '../../app';
import { candidatoRepository } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve impedir acesso se não estiver logado', async () => {
  await request(app).put('/api/trampo/1/candidatar').expect(401);
});

it('deve retornar 401 caso o candidato informado não exista', async () => {
  const res = await request(app)
    .put('/api/trampo/xxx/candidatar')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Candidato informado não existe');
});

it('deve retornar erro se o trampo não existir', async () => {
  await useData('usuario');

  const res = await request(app)
    .put('/api/trampo/xxx/candidatar')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual(
    'Trabalho não encontrado para se candidatar'
  );
});

it('deve se candidatar a vaga', async () => {
  await useData('main');

  let candidato = await candidatoRepository.count();
  expect(candidato).toEqual(3);

  const res = await request(app)
    .put('/api/trampo/8/candidatar')
    .set('Cookie', loginCookie({ id: '3' }));

  expect(res.status).toEqual(204);
  expect(res.body).toEqual({});

  candidato = await candidatoRepository.count();
  expect(candidato).toEqual(4);
});
