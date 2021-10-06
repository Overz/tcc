import request from 'supertest';
import { app } from '../../app';
import { useData } from '../../tests/data';

it('deve retornar status 400 se não for informado o nome', async () => {
  const res = await request(app).post('/api/usuario/checar-dados').send({});

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar o nome');
});

it('deve retornar status 400 se não for informado o cpf', async () => {
  const res = await request(app)
    .post('/api/usuario/checar-dados')
    .send({ nome: 'jose' });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar o cpf');
});

it('deve retornar stauts 400 se o cpf informado for inválido', async () => {
  const res = await request(app)
    .post('/api/usuario/checar-dados')
    .send({ nome: 'jose', cpf: '11111' });
  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('O cpf informado é inválido');
});

it('deve retornar status 400 se não for informado o telefone', async () => {
  const res = await request(app).post('/api/usuario/checar-dados').send({
    nome: 'jose',
    cpf: '01234567890',
  });
  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('É necessário informar o telefone');
});

it('deve retorar stauts 400 se o telefone não estiver no padrão', async () => {
  const res = await request(app).post('/api/usuario/checar-dados').send({
    nome: 'jose',
    cpf: '01234567890',
    telefone: '5555',
  });
  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Formato incorreto para o telefone');
});

it('deve retornar status 400 se o cpf já estiver em uso', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/checar-dados').send({
    nome: 'jose',
    cpf: '05357357153',
    telefone: '48999887766',
  });
  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('O cpf informado já está em uso');
});

it('deve retornar status 400 se o telefone informado já estiver em uso', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/checar-dados').send({
    nome: 'jose',
    cpf: '01234567890',
    telefone: '48999124567',
  });
  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('O telefone informado já está em uso');
});

it('deve retornar ok true se os dados estiverem livres', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/checar-dados').send({
    nome: 'jose',
    cpf: '01234567890',
    telefone: '48999222534',
  });
  expect(res.status).toEqual(200);
  expect(res.body).toEqual({ ok: true });
});
