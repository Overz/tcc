import request from 'supertest';
import { app } from '../../app';
import { enderecoRepository } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve cadastrar MAIS DE UM endereco para um usuario', async () => {
  await useData('u-e');

  let enderecos = await enderecoRepository.count({
    where: { cdUsuario: 1 },
  });

  expect(enderecos).toEqual(2);

  for (let i = 4; i < 6; i++) {
    const res = await request(app)
      .post('/api/endereco/')
      .send({
        cep: '88117-010',
        rua: 'Rua das Acacias',
        bairro: 'São Miguel',
        estado: 'SC',
        pais: 'Brazil',
        cidade: 'Florianópolis',
        numero: '592-c',
        nome: 'casa',
        latitude: 0.0,
        longitude: 0.0,
      })
      .set('Cookie', loginCookie());
    expect(res.body).toEqual({
      id: i,
      cep: '88117-010',
      rua: 'Rua das Acacias',
      pais: 'Brazil',
      bairro: 'São Miguel',
      cidade: 'FLORIANOPOLIS',
      uf: 'SC',
      numero: '592-c',
      nome: 'casa',
      latitude: 0.0,
      longitude: 0.0,
    });
  }

  enderecos = await enderecoRepository.count({
    where: { cdUsuario: 1 },
  });

  expect(enderecos).toEqual(4);
});

it('deve retornar status 400 caso não exista um usuario para o cadastro de endereco', async () => {
  const res = await request(app)
    .post('/api/endereco/')
    .send({
      cep: '88117-010',
      rua: 'Rua das Acacias',
      bairro: 'São Miguel',
      estado: 'SC',
      pais: 'Brazil',
      cidade: 'Florianópolis',
      numero: '592-c',
      nome: 'casa',
      latitude: 0.0,
      longitude: 0.0,
    })
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({
    message: 'Usuario não encontrado para o cadastro deste endereco',
  });
});
