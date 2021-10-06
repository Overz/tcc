import request from 'supertest';
import { app } from '../../app';
import { StatusTrabalho, TipoTrabalho, trampoRepository } from '../../models';
import { getGoogleApiService } from '../../services/google';
import { useData } from '../../tests/data';
import { MockGoogleApiServices } from '../../tests/mock/google.mock';
import { loginCookie } from '../../tests/mock/loginCookie';

const location = `-27.5859165,-48.5983033`;

it('deve impedir acesso se não estiver logado', async () => {
  await request(app).get('/api/trampo/consulta/por-filtro').expect(401);
});

it('deve filtrar todos os trampo', async () => {
  await useData('main');

  const res = await request(app)
    .get(`/api/trampo/consulta/por-geocode`)
    .query({ location })
    .set('Cookie', loginCookie());

  const { data, page, pageSize, totalRecords } = res.body;
  const keys = Object.keys(data[0]);

  expect(res.status).toEqual(200);
  expect(data.length).toEqual(5);
  expect(page).toEqual(0);
  expect(pageSize).toEqual(10);
  expect(totalRecords).toEqual(5);
  expect(keys).toEqual([
    'id',
    'usuario',
    'idusuario',
    'dtpublicado',
    'grupo',
    'area',
    'remuneracao',
    'tipo',
    'dtentrega',
  ]);
});

it('deve retornar TODOS os trabalhos online se não houver trabalho naquela regiao', async () => {
  await useData('main');

  const service = getGoogleApiService() as MockGoogleApiServices;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  service.places = (radius: { radius?: number }) =>
    Promise.resolve(['XXXXXXXXX']);

  const trampos = await trampoRepository.count({
    where: { flTipo: TipoTrabalho.ONLINE, flStatus: StatusTrabalho.PENDENTE },
  });
  expect(trampos).toEqual(5);

  const res = await request(app)
    .get('/api/trampo/consulta/por-filtro')
    .query({ location })
    .set('Cookie', loginCookie());

  const { data, page, pageSize, totalRecords } = res.body;
  expect(res.status).toEqual(200);
  expect(data.length).toEqual(5);
  expect(page).toEqual(0);
  expect(pageSize).toEqual(10);
  expect(totalRecords).toEqual(5);
});

it('deve retornar todos os trabalhos se não for passado localização', async () => {
  await useData('main');

  const trampos = await trampoRepository.count({
    where: { flStatus: StatusTrabalho.PENDENTE },
  });
  expect(trampos).toEqual(8);

  const res = await request(app)
    .get('/api/trampo/consulta/por-filtro')
    .set('Cookie', loginCookie());

  const { data, page, pageSize, totalRecords } = res.body;
  expect(res.status).toEqual(200);
  expect(data.length).toEqual(5);
  expect(page).toEqual(0);
  expect(pageSize).toEqual(10);
  expect(totalRecords).toEqual(5);
});
