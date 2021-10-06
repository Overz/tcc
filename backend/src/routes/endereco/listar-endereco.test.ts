import request from 'supertest';
import { app } from '../../app';
import { StatusUsuario } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve listar todos os enderecos de um usuario', async () => {
  await useData('main');

  const res = await request(app)
    .get('/api/endereco')
    .set(
      'Cookie',
      loginCookie({
        id: '1',
        email: 'joaozinho@email.com',
        activated: StatusUsuario.ATIVO,
      })
    )
    .query({ page: 0, cdUsuario: 1 });

  expect(res.body.data).toHaveLength(2);
  expect(res.body.page).toEqual(0);
  expect(res.body.pageSize).toEqual(10);
  expect(res.body.totalRecords).toEqual(2);
});
