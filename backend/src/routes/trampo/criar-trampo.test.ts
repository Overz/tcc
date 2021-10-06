import request from 'supertest';
import { app } from '../../app';
import { useData } from '../../tests/data';
import { loginCookie } from '../../tests/mock/loginCookie';
import { randomBytes } from 'crypto';
import {
  enderecoRepository,
  StatusTrabalho,
  TipoTrabalho,
  Trampo,
  trampoRepository,
  usuarioRepository,
} from '../../models';

it('deve impedir acesso se não estiver logado', async () => {
  await request(app).post('/api/trampo/novo').expect(401);
});

it('deve retornar erro se não for informado os campos necessários', async () => {
  const res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie());

  expect(res.status).toEqual(400);
  expect(res.body).toEqual({
    message: 'É necessário informar o grupo de trabalho',
    errors: [
      'É necessário informar o grupo de trabalho',
      'É necessário informar a área de trabalho',
      'É necessário informar o tipo de trabalho',
      'Tipo deve ser O(Online), ou P(Presencial)',
      'É necessário informar a remuneração',
      'Remuneração esta no formato incorreto',
      'É necessário informar a descricao do trabalho',
      'Descricao deve conter entre 1 a 1000 caracteres',
      'É necessário informar data de entrega',
      'Data de entrega informada esta no formato errado',
    ],
  });
});

it('deve retornar erro o tipo não for O(Online) ou P(Presencial)', async () => {
  const res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie())
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'X',
      remuneracao: '100000',
      descricao: 'descricao',
    });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Tipo deve ser O(Online), ou P(Presencial)');
});

it('deve tratar o campo remuneração', async () => {
  await useData('main');

  let res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie({ id: '1' }))
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'O',
      remuneracao: 'asdasd', // Valor errado
      descricao: 'descricao',
      endereco: '1',
      dtentrega: new Date(),
    });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Remuneração esta no formato incorreto');

  res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie({ id: '1' }))
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'O',
      remuneracao: 'R$ 1.000,00', // Não sanitizado
      descricao: 'descricao',
      endereco: '1',
      dtentrega: new Date(),
    });

  expect(res.status).toEqual(201);
  expect(res.body.remuneracao).toEqual('R$ 1.000,00');
});

it('deve limitar a descricao do trabalho', async () => {
  const res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie({ id: '1' }))
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'O',
      remuneracao: 'R$ 1.000,00',
      descricao: randomBytes(2000).toString('hex'),
      endereco: '1',
      dtentrega: new Date(),
    });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual(
    'Descricao deve conter entre 1 a 1000 caracteres'
  );
});

it('deve tratar o campo dtentrega como date', async () => {
  const res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie({ id: '1' }))
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'O',
      remuneracao: 'R$ 1.000,00',
      descricao: 'descricao',
      endereco: '1',
      dtentrega: '2021-05-22',
    });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual(
    'Data de entrega informada esta no formato errado'
  );
});

it('deve retornar status 400 se não encontrar usuario para este cadastro', async () => {
  const res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie({ id: '1' }))
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'O',
      remuneracao: 'R$ 1.000,00',
      descricao: 'descricao',
      endereco: '1',
      dtentrega: new Date(),
    });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual('Usuário não encontrado para este cadastro');
});

it('deve retoranr status 400 se não encontrar endereco para este cadastro', async () => {
  await useData('usuario');

  const res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie({ id: '1' }))
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'P',
      remuneracao: 'R$ 1.000,00',
      descricao: 'descricao',
      endereco: '1',
      dtentrega: new Date(),
    });

  expect(res.status).toEqual(400);
  expect(res.body.message).toEqual(
    'Endereco não encontrado para o vinculo com o trabalho'
  );
});

it('deve cadastrar um novo trabalho', async () => {
  await useData('main');

  let trampos = await trampoRepository.count();
  expect(trampos).toEqual(10);

  const entrega = new Date();
  const res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie({ id: '1' }))
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'O',
      remuneracao: 'R$ 1.000,00',
      descricao: 'descricao',
      endereco: '1',
      dtentrega: entrega,
    });

  const { id, grupo, area, tipo, dtentrega, descricao, status } = res.body;
  expect(res.status).toEqual(201);
  expect(id).toEqual(11);
  expect(grupo).toEqual('Tecnologia');
  expect(area).toEqual('Programador');
  expect(tipo).toEqual(TipoTrabalho.ONLINE);
  expect(new Date(dtentrega)).toEqual(entrega);
  expect(descricao).toEqual('descricao');
  expect(status).toEqual(StatusTrabalho.PENDENTE);

  trampos = await trampoRepository.count();
  expect(trampos).toEqual(11);
});

it('deve cadastrar um trabalho presencial com o respsectivo usuario e endereco', async () => {
  await useData('main');

  const res = await request(app)
    .post('/api/trampo/novo')
    .set('Cookie', loginCookie({ id: '1' }))
    .send({
      grupo: 'Tecnologia',
      area: 'Programador',
      tipo: 'P',
      remuneracao: 'R$ 1.000,00',
      descricao: 'descricao',
      endereco: '1',
      dtentrega: new Date(),
    });

  const { id, tipo, status } = res.body;
  const trampo = (await trampoRepository.findOne(id, {
    loadRelationIds: true,
  })) as Trampo;
  const end = await enderecoRepository.findOne(trampo.cdEndereco! as number);
  const usr = await usuarioRepository.findOne(1);

  expect(id).toEqual(trampo.cdTrampo);
  expect(tipo).toEqual(TipoTrabalho.PRESENCIAL);
  expect(status).toEqual(StatusTrabalho.PENDENTE);
  expect(end?.cdEndereco).toEqual(trampo.cdEndereco);
  expect(usr?.cdUsuario).toEqual(trampo.cdContratante);
});
