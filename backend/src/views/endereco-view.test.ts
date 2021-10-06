import { enderecoRepository } from '../models';
import { useData } from '../tests/data';
import { enderecoView, enderecoList } from './endereco-view';

it('deve mapear dados de um endereço', async () => {
  await useData('u-e');

  const endereco = await enderecoRepository.findOne(1);
  expect(endereco).toEqual({
    cdEndereco: 1,
    nuCep: '88095685',
    nmBairro: 'Jardim Atlantico',
    nmRua: 'Rua José Luiz Vieira',
    nmCidade: 'FLORIANOPOLIS',
    sgEstado: 'SC',
    nmPais: 'Brasil',
    nuLatitude: '0',
    nuLongitude: '0',
    nuNumero: '0',
    deNome: 'casa',
  });

  const view = enderecoView(endereco);
  expect(view).toEqual({
    id: 1,
    cep: '88095685',
    rua: 'Rua José Luiz Vieira',
    pais: 'Brasil',
    bairro: 'Jardim Atlantico',
    cidade: 'FLORIANOPOLIS',
    uf: 'SC',
    nome: 'casa',
    latitude: 0,
    longitude: 0,
    numero: '0',
  });
});

it('deve mapear dados dos endereços para um usuario', async () => {
  await useData('u-e');

  const enderecos = await enderecoRepository.find();
  expect(enderecos.length).toEqual(3);
  expect(enderecos?.[0].cdEndereco).toEqual(1);
  expect(enderecos?.[1].cdEndereco).toEqual(2);
  expect(enderecos?.[2].cdEndereco).toEqual(3);

  const view = enderecoList(enderecos);

  expect(view?.length).toEqual(3);
  expect(view?.[0]?.id).toEqual(1);
  expect(view?.[1]?.id).toEqual(2);
  expect(view?.[2]?.id).toEqual(3);
});
