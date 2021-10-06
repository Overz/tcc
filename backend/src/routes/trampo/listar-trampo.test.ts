import request from 'supertest';
import { app } from '../../app';
import {
  enderecoRepository,
  StatusTrabalho,
  TipoTrabalho,
  trampoRepository,
} from '../../models';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';
import { Indexable } from '../../utils/types';

it('deve impedir acesso se não estiver logado', async () => {
  await request(app).get('/api/trampo').expect(401);
});

it('deve listar apartir do CONTRATANTE', async () => {
  await useData('main');

  let trampo = await trampoRepository.find({ where: { cdContratante: 1 } });
  expect(trampo.length).toEqual(6);
  expect(trampo[0].flStatus).toEqual(StatusTrabalho.PENDENTE);
  expect(trampo[0].flTipo).toEqual(TipoTrabalho.ONLINE);
  expect(trampo[1].flStatus).toEqual(StatusTrabalho.CANCELADO);
  expect(trampo[1].flTipo).toEqual(TipoTrabalho.PRESENCIAL);
  expect(trampo[2].flStatus).toEqual(StatusTrabalho.FINALIZADO);
  expect(trampo[2].flTipo).toEqual(TipoTrabalho.ONLINE);

  const res = await request(app)
    .get('/api/trampo')
    .query({ cdContratante: '1' })
    .set('Cookie', loginCookie());

  trampo = await trampoRepository.find({ where: { cdContratante: 1 } });
  expect(trampo.length).toEqual(6);

  const { data, page, pageSize, totalRecords } = res.body;
  expect(res.status).toEqual(200);
  expect(data.length).toEqual(6);
  expect(page).toEqual(0);
  expect(pageSize).toEqual(10);
  expect(totalRecords).toEqual(6);
});

it('deve listar apartir do CONTRATADO', async () => {
  await useData('main');

  const trampo = await trampoRepository.count({ where: { cdContratado: 3 } });
  expect(trampo).toEqual(4);

  const res = await request(app)
    .get('/api/trampo')
    .query({ cdContratado: 3 })
    .set('Cookie', loginCookie());

  const { data, page, pageSize, totalRecords } = res.body;

  expect(data.length).toEqual(4);
  expect(page).toEqual(0);
  expect(pageSize).toEqual(10);
  expect(totalRecords).toEqual(4);

  expect(data.length).toEqual(trampo);
});

it('deve listar apartir de trabalhos ONLINE', async () => {
  await useData('main');

  const trampo = await trampoRepository.count({
    where: { flTipo: TipoTrabalho.ONLINE },
  });
  expect(trampo).toEqual(6);

  const res = await request(app)
    .get('/api/trampo')
    .query({ flTipo: TipoTrabalho.ONLINE })
    .set('Cookie', loginCookie());

  const { data, page, pageSize, totalRecords } = res.body;
  expect(res.status).toEqual(200);
  expect(data.length).toEqual(6);
  expect(page).toEqual(0);
  expect(pageSize).toEqual(10);
  expect(totalRecords).toEqual(6);

  data.map(({ tipo }: Indexable) => {
    expect(tipo).toEqual(TipoTrabalho.ONLINE);
  });
});

it('deve listar apartir de trabalhos PRESENCIAIS', async () => {
  await useData('main');

  const trampo = await trampoRepository.count({
    where: { flTipo: TipoTrabalho.PRESENCIAL },
  });
  expect(trampo).toEqual(4);

  const res = await request(app)
    .get('/api/trampo')
    .query({ flTipo: TipoTrabalho.PRESENCIAL })
    .set('Cookie', loginCookie());

  const { data, page, pageSize, totalRecords } = res.body;
  expect(res.status).toEqual(200);
  expect(data.length).toEqual(4);
  expect(page).toEqual(0);
  expect(pageSize).toEqual(10);
  expect(totalRecords).toEqual(4);

  expect(data[0].tipo).toEqual(TipoTrabalho.PRESENCIAL);
  expect(data[1].tipo).toEqual(TipoTrabalho.PRESENCIAL);
});

it('deve listar apartir de apenas CIDADES', async () => {
  await useData('main');

  const endereco = await enderecoRepository.findOne({
    select: ['cdEndereco', 'nmCidade'],
    where: { nmCidade: 'FLORIANOPOLIS' },
  });

  expect(endereco).toBeDefined();
  expect(endereco?.nmCidade).toEqual('FLORIANOPOLIS');

  const trampo = await trampoRepository.findOne({
    where: {
      cdEndereco: endereco?.cdEndereco,
    },
  });

  expect(trampo).toBeDefined();
  expect(trampo?.cdEndereco).toBeDefined();

  const res = await request(app)
    .get('/api/trampo')
    .query({ cdEndereco: trampo?.cdEndereco })
    .set('Cookie', loginCookie());

  const { data, page, pageSize, totalRecords } = res.body;

  expect(res.status).toEqual(200);
  expect(data.length).toEqual(4);
  expect(page).toEqual(0);
  expect(pageSize).toEqual(10);
  expect(totalRecords).toEqual(4);
});
