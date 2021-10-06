import request from 'supertest';
import { app } from '../../app';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve exibir os dados de um endereco', async () => {
  await useData('u-e');

  const res = await request(app)
    .get('/api/endereco/1')
    .set('Cookie', loginCookie());

  expect(res.body).toEqual({
    id: 1,
    cep: '88095685',
    rua: 'Rua José Luiz Vieira',
    pais: 'Brasil',
    bairro: 'Jardim Atlantico',
    cidade: 'FLORIANOPOLIS',
    uf: 'SC',
    latitude: 0,
    longitude: 0,
    numero: '0',
    nome: 'casa',
  });
});

it('deve retornar erro caso o endereco nao exista', async () => {
  const res = await request(app)
    .get('/api/endereco/xx')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({ message: 'Endereco não existente' });
});
