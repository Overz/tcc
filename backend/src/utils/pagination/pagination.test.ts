import { Endereco } from '../../models';
import { useData } from '../../tests/data';
import { buildPagination } from './pagination';

it('deve listar todos os dados sem filtro', async () => {
  await useData('main');

  const res = await buildPagination({}, Endereco);

  expect(res.data).toHaveLength(3);
  expect(res.page).toEqual(0);
  expect(res.pageSize).toEqual(10);
  expect(res.totalRecords).toEqual(3);
});

it('deve listar os dados com um filtro', async () => {
  await useData('main');

  const res = await buildPagination({ cdEndereco: 1 }, Endereco);

  expect(res.data).toHaveLength(1);
  expect(res.page).toEqual(0);
  expect(res.pageSize).toEqual(10);
  expect(res.totalRecords).toEqual(1);
});
