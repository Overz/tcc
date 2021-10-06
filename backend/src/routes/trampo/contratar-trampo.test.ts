import request from 'supertest';
import { app } from '../../app';
import { showErrors } from '../../middlewares/error-handler';
import { StatusTrabalho, trampoRepository, Usuario } from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';

it('deve impedir acesso se não estiver logado', async () => {
  await request(app).put('/api/trampo/1/contratar/1').expect(401);
});

it('deve retornar erro se não encontrar o candidato', async () => {
  const res = await request(app)
    .put('/api/trampo/xxx/contratar/xxx')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Candidato não encontrado');
});

it('deve retornar erro se, não encontrar o trabalho, nao encontrar contratante nele, ou status != PENDENTE', async () => {
  await useData('main');

  const trampo = await trampoRepository.count({
    where: {
      cdTrampo: 2,
      cdContratante: 1,
      flStatus: StatusTrabalho.PENDENTE,
    },
  });

  expect(trampo).toEqual(0);

  const res = await request(app)
    .put('/api/trampo/2/contratar/1')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual(
    'Nenhum trabalho publicado encontrado para o contratante'
  );
});

it('deve realizar a contratação e excluir o candidato do db', async () => {
  showErrors(true);
  await useData('main');

  let trampo = await trampoRepository.findOne({
    where: {
      cdTrampo: 2,
      cdContratante: 2,
      flStatus: StatusTrabalho.PENDENTE,
    },
  });

  expect(trampo).toBeDefined();
  expect(trampo?.cdContratado).toBeNull();

  const res = await request(app)
    .put('/api/trampo/2/contratar/1')
    .set('Cookie', loginCookie({ id: '2' }));

  expect(res.status).toEqual(204);
  expect(res.body).toEqual({});

  trampo = await trampoRepository.findOne({
    where: {
      cdTrampo: 2,
      cdContratante: 2,
      flStatus: StatusTrabalho.PENDENTE,
    },
  });

  expect(trampo?.cdContratado).toBeDefined();
  expect((trampo?.cdContratado as Usuario).cdUsuario).toEqual(1);
});
