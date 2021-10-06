import request from 'supertest';
import { app } from '../../app';
import { usuarioRepository } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve atualizar os campos do usuario', async () => {
  await useData('usuario');

  let usuario = await usuarioRepository.findOne(1);

  expect(usuario?.cdUsuario).toEqual(1);
  expect(usuario?.deEmail).toEqual('joaozinho@email.com');
  expect(usuario?.nmNome).toEqual('João Carlos da Silva');
  expect(usuario?.nuTelefone).toEqual('48999124567');

  const res = await request(app)
    .put('/api/usuario/1')
    .send({
      nome: 'João Carlos da Silva',
      telefone: '11992345678',
      sobre: 'imagine aqui um texto bem grande',
      email: 'teste2@email.com',
    })
    .set('Cookie', loginCookie());
  usuario = await usuarioRepository.findOne(1);

  expect(res.status).toEqual(204);
  expect(usuario?.cdUsuario).toEqual(1);
  expect(usuario?.nmNome).toEqual('João Carlos da Silva');
  expect(usuario?.nuTelefone).toEqual('11992345678');
  expect(usuario?.deEmail).toEqual('teste2@email.com');
});

it('deve retornar erro caso o usuario nao exista', async () => {
  await useData('usuario');

  const res = await request(app)
    .put('/api/usuario/xx')
    .set('Cookie', loginCookie());
  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Usuario não encontrado!' });
});

it('deve atualizar alguns campos do usuario', async () => {
  await useData('usuario');

  let usuario = await usuarioRepository.findOne('1');

  const res = await request(app)
    .put('/api/usuario/1')
    .send({
      email: 'jsilva@email.com',
    })
    .set('Cookie', loginCookie());

  usuario = await usuarioRepository.findOne('1');

  expect(res.status).toEqual(204);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(usuario!.deEmail).toEqual('jsilva@email.com');
});

it('deve retornar erro caso o email para atualizar esteja em uso', async () => {
  await useData('usuario');

  const res = await request(app)
    .put('/api/usuario/1')
    .send({
      email: 'barbosa@email.com',
    })
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Email informado já esta em uso' });
});

it('deve retornar erro caso o telefone para atualizar esteja em uso', async () => {
  await useData('usuario');

  const res = await request(app)
    .put('/api/usuario/1')
    .send({
      telefone: '48999124567',
    })
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Telefone informado ja esta em uso' });
});
