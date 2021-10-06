import request from 'supertest';
import { app } from '../../app';
import { usuarioRepository, enderecoRepository } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve excluir o usuario e seus endereços caso existam', async () => {
  await useData('u-e');

  let usuario = await usuarioRepository.findOne('1');
  let endereco = await enderecoRepository.find({
    where: { cdUsuario: usuario },
  });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(usuario!.cdUsuario).toEqual(1);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  expect(endereco[0]!.cdEndereco).toEqual(1);

  const res = await request(app)
    .delete('/api/usuario/1')
    .set('Cookie', loginCookie());

  usuario = await usuarioRepository.findOne('1');
  endereco = await enderecoRepository.find({
    where: { cdUsuario: usuario },
  });

  expect(res.status).toEqual(204);
  expect(usuario).toBeUndefined();
  expect(endereco).toEqual([]);
});
