import request from 'supertest';
import { app } from '../../app';
import { useData } from '../../tests/data';

const accessInfo = {
  domain: '',
  path: '/',
  secure: true,
  script: false,
};

it('deve limpar o cookie quando o usuário faz logout', async () => {
  await useData('usuario');
  const agent = request.agent(app);

  // faz o login e garante que o token foi salvo no browser
  let res = await agent
    .post('/api/usuario/login')
    .send({ email: 'joaozinho@email.com', senha: '123456789' });

  expect(res.status).toEqual(200);
  expect(res.get('Set-Cookie')).toBeDefined();
  expect(agent.jar.getCookie('jwt', accessInfo)).toBeDefined();

  // faz um logout e checa que o cookie foi removido do browser
  res = await agent.post('/api/usuario/logout').send({});
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ ok: true });
  expect(agent.jar.getCookie('jwt', accessInfo)).toBeUndefined();
});

it('deve limpar o cookie mesmo quando não há usuário logado', async () => {
  const res = await request(app).post('/api/usuario/logout').send({});

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ ok: true });
});
