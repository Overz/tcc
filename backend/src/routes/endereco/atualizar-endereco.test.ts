import request from 'supertest';
import { app } from '../../app';
import { enderecoRepository } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve retornar erro caso o usuario para este endereco não exista', async () => {
  const res = await request(app).put('/api/endereco/xx');

  expect(res.status).toEqual(401);
  expect(res.body).toEqual({
    message: 'Not authorized',
  });
});

it('deve atualizar o endereco de um usuario', async () => {
  await useData('u-e');

  let endereco = await enderecoRepository.findOne({
    where: { cdEndereco: 1 },
  });

  expect(endereco).toEqual({
    cdEndereco: 1,
    nuCep: '88095685',
    nmBairro: 'Jardim Atlantico',
    nmRua: 'Rua José Luiz Vieira',
    nmCidade: 'FLORIANOPOLIS',
    sgEstado: 'SC',
    nmPais: 'Brasil',
    nuNumero: '0',
    nuLatitude: '0',
    nuLongitude: '0',
    deNome: 'casa',
  });

  const res = await request(app)
    .put('/api/endereco/1')
    .send({
      cep: '88095-685',
      rua: 'Rua das Acacias 2',
      bairro: 'São Miguel 2',
      estado: 'SC',
      pais: 'Brasil',
      cidade: 'Florianópolis 2',
      completo: 'endereco completo aqui',
    })
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(204);

  endereco = await enderecoRepository.findOne({
    where: { cdEndereco: 1 },
  });

  expect(endereco).toEqual({
    cdEndereco: 1,
    nuCep: '88095-685',
    nmBairro: 'São Miguel 2',
    nmRua: 'Rua das Acacias 2',
    nmCidade: 'Florianópolis 2',
    sgEstado: 'SC',
    nmPais: 'Brasil',
    nuNumero: '0',
    nuLatitude: '0',
    nuLongitude: '0',
    deNome: 'casa',
  });
});
