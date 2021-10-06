import { StatusUsuario, usuarioRepository } from '../../models';

export const usuarioData = async () => {
  await usuarioRepository.save({
    cdUsuario: 1,
    deEmail: 'joaozinho@email.com',
    deSenha: '$2b$10$MVt2iZ3ZEs8F2sJzUxqTB.WYNuXgyX.udYKiYpmEPwraQAvkHqbTy',
    nmNome: 'João Carlos da Silva',
    nuCpf: '05357357153',
    nuTelefone: '48999124567',
    deSobre: 'texto bem grande',
    flStatus: StatusUsuario.ATIVO,
    dePicture: 'J',
    dtcriacao: new Date(),
    cdEndereco: [1],
  });

  await usuarioRepository.save({
    cdUsuario: 2,
    deEmail: 'barbosa@email.com',
    deSenha: '$2b$10$MVt2iZ3ZEs8F2sJzUxqTB.WYNuXgyX.udYKiYpmEPwraQAvkHqbTy',
    nmNome: 'Barbosa Silva',
    nuCpf: '43877323421',
    nuTelefone: '11912345678',
    deSobre: 'texto bem grande',
    flStatus: StatusUsuario.INATIVO,
    dePicture: 'BS',
    dtcriacao: new Date(),
    cdEndereco: [2],
  });

  await usuarioRepository.save({
    cdUsuario: 3,
    deEmail: 'carlos@email.com',
    deSenha: '$2b$10$MVt2iZ3ZEs8F2sJzUxqTB.WYNuXgyX.udYKiYpmEPwraQAvkHqbTy',
    nmNome: 'Carlos Henrique',
    nuCpf: '07985723021',
    nuTelefone: '48999226656',
    deSobre: 'texto bem grande',
    flStatus: StatusUsuario.INATIVO,
    dePicture: 'CH',
    dtcriacao: new Date(),
  });
};
