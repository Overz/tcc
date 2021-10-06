import request from 'supertest';
import { app } from '../../app';
import { useData } from '../../tests/data';

it('deve retornar vazio se não houver usuário logado', async () => {
  const res = await request(app).get('/api/usuario/atual').send();
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({});
});

it('deve retornar os dados do usuário logado', async () => {
  await useData('usuario');
  const agent = request.agent(app);

  // faz o login...
  let res = await agent
    .post('/api/usuario/login')
    .send({ email: 'joaozinho@email.com', senha: '123456789' });
  expect(res.status).toEqual(200);

  // tenta recuperar as informacoes
  res = await agent.get('/api/usuario/atual');

  expect(res.status).toEqual(200);
  expect(res.body.id).toBeDefined();
  expect(res.body.email).toEqual('joaozinho@email.com');
});
