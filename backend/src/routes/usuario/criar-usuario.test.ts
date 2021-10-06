import { app } from '../../app';
import { usuarioRepository, StatusUsuario } from '../../models';
import { useData } from '../../tests/data';
import request from 'supertest';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockImplementation(() => ({ messageId: '' })),
    options: jest.fn().mockImplementation(() => ({ host: '' })),
  })),
}));

it('deve cadastrar um novo usuario', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/novo').send({
    nome: 'teste',
    email: 'batatinha@email.com',
    senha: 'batatinha',
    cpf: '01234567890',
    telefone: '48998651672',
    sobre: 'teste',
    pic: 'CL',
  });

  const usuario = await usuarioRepository.findOne({
    where: { nuCpf: '01234567890' },
  });

  expect(res.status).toEqual(201);
  expect(res.body.token).toEqual(usuario?.deToken);
  expect(usuario?.flStatus).toEqual(StatusUsuario.INATIVO);
});

it('deve impedir o cadastro se o telefone estiver em uso', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/novo').send({
    nome: 'João Carlos da Silva',
    cpf: '01234567890',
    telefone: '48999124567',
    sobre: 'imagine aqui um texto bem grande',
    email: 'teste@email.com',
    senha: '123456789',
    pic: 'CL',
  });

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Telefone informado já esta em uso' });
});

it('deve impedir o cadastro se o cpf estiver em uso', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/novo').send({
    nome: 'João Carlos da Silva',
    cpf: '05357357153',
    telefone: '48991657626',
    sobre: 'imagine aqui um texto bem grande',
    email: 'teste@email.com',
    senha: '123456789',
    pic: 'CL',
  });

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Cpf informado já esta em uso' });
});

it('deve impedir o cadastro se o email estiver em uso', async () => {
  await useData('usuario');

  const res = await request(app).post('/api/usuario/novo').send({
    nome: 'João Carlos da Silva',
    cpf: '01234567890',
    telefone: '48992345658',
    sobre: 'imagine aqui um texto bem grande',
    email: 'joaozinho@email.com',
    senha: '123456789',
    pic: 'CL',
  });

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Email inormado ja esta em uso' });
});
