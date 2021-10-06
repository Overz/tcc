import { enderecoRepository } from '../../models';

export const enderecoData = async () => {
  await enderecoRepository.save({
    cdEndereco: 1,
    nuCep: '88095685',
    nmBairro: 'Jardim Atlantico',
    deNome: 'casa',
    sgEstado: 'SC',
    nmCidade: 'FLORIANOPOLIS',
    nmPais: 'Brasil',
    nmRua: 'Rua José Luiz Vieira',
    nuLatitude: '0',
    nuLongitude: '0',
    nuNumero: '0',
    nmNome: 'Casa',
    cdUsuario: 1,
  });

  await enderecoRepository.save({
    cdEndereco: 2,
    nuCep: '88095685',
    nmBairro: 'Jardim Atlantico',
    deNome: 'casa',
    sgEstado: 'SC',
    nmCidade: 'FLORIANOPOLIS',
    nmPais: 'Brasil',
    nmRua: 'Rua José Luiz Vieira',
    nuLatitude: '0',
    nuLongitude: '0',
    nuNumero: '0',
    nmNome: 'Casa',
    cdUsuario: 1,
  });

  await enderecoRepository.save({
    cdEndereco: 3,
    nuCep: '88095685',
    nmBairro: 'Jardim Atlantico',
    deNome: 'casa',
    sgEstado: 'SC',
    nmCidade: 'FLORIANOPOLIS',
    nmPais: 'Brasil',
    nmRua: 'Rua José Luiz Vieira',
    nuLatitude: '0',
    nuLongitude: '0',
    nuNumero: '0',
    nmNome: 'Casa',
    cdUsuario: 2,
  });
};
