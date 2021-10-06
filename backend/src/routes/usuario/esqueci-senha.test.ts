import request from 'supertest';
import { app } from '../../app';
import { StatusUsuario, usuarioRepository } from '../../models';
import { useData } from '../../tests/data';

it('deve retoranr status 400 se não for informado o email', async () => {
  const res = await request(app).post('/api/usuario/esqueci-senha').send({});

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar o email');
});

it('deve retornar status 400 se não encontrar o usuario para o email informado', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/esqueci-senha').send({
    email: 'a@a.com',
  });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('O email informado não existe');
});

it('deve renovar o token para o usuario e salvar no banco', async () => {
  await useData('usuario');

  let usuario = await usuarioRepository.findOne(1);

  expect(usuario?.flStatus).toEqual(StatusUsuario.ATIVO);
  expect(usuario?.deToken).toEqual(null);

  const res = await request(app).post('/api/usuario/esqueci-senha').send({
    email: 'joaozinho@email.com',
  });

  expect(res.status).toEqual(200);
  expect(res.body.token).toMatch(/\w/g);

  usuario = await usuarioRepository.findOne(1);

  expect(usuario?.flStatus).toEqual(StatusUsuario.INATIVO);
  expect(usuario?.deToken).toEqual(res.body.token);
});
