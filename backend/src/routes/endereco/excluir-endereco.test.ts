import request from 'supertest';
import { app } from '../../app';
import { enderecoRepository } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve excluirs o endereco de um usuario', async () => {
  await useData('u-e');

  let enderecos = await enderecoRepository.count({ where: { cdUsuario: 1 } });
  expect(enderecos).toEqual(2);

  const res = await request(app)
    .delete('/api/endereco/1')
    .set('Cookie', loginCookie());
  expect(res.status).toEqual(204);

  enderecos = await enderecoRepository.count({ where: { cdUsuario: 1 } });
  expect(enderecos).toEqual(1);
});
