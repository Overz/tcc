import { User } from '~/contexts';

export const fake = (): User => ({
  id: 1,
  ativo: 'A',
  cpf: '0123456789',
  email: 'a@a.com',
  location: {
    cidade: 'FLORIANOPOLIS',
    latitude: 0,
    longitude: 0,
  },
  nome: 'Tester',
  pic: 'T',
  senha: '123456789',
  sobre: 'sobre',
  telefone: '48999222534',
  endereco: [],
});
