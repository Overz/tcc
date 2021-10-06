import request from 'supertest';
import { app } from '../../app';
import { StatusUsuario } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve exibir os dados através da view do usuario', async () => {
  await useData('usuario');

  const res = await request(app)
    .get('/api/usuario/1')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(200);
  expect(res.body).toEqual({
    cpf: '05357357153',
    email: 'joaozinho@email.com',
    id: 1,
    nome: 'João Carlos da Silva',
    sobre: 'texto bem grande',
    telefone: '48999124567',
    ativo: StatusUsuario.ATIVO,
    pic: 'J',
  });
});

it('deve retornar erro caso o erro caso o usuario nao exista', async () => {
  await useData('usuario');

  const res = await request(app)
    .get('/api/usuario/xx')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Usuario informado não existe!' });
});
