import { StatusUsuario, Usuario, usuarioRepository } from '../models';
import { useData } from '../tests/data';
import { usuarioView } from './usuario-view';

it('deve mapear os dados de um usuario', async () => {
  await useData('usuario');

  const usuario = (await usuarioRepository.findOne(1)) as Usuario;
  expect(usuario).toEqual({
    cdUsuario: 1,
    deEmail: 'joaozinho@email.com',
    deSenha: '$2b$10$MVt2iZ3ZEs8F2sJzUxqTB.WYNuXgyX.udYKiYpmEPwraQAvkHqbTy',
    nmNome: 'João Carlos da Silva',
    nuAvaliacao: 0,
    nuCpf: '05357357153',
    nuTelefone: '48999124567',
    nuTotalTrampos: 0,
    deSobre: 'texto bem grande',
    deToken: null,
    flStatus: StatusUsuario.ATIVO,
    dePicture: 'J',
    dtCriacao: expect.any(Date),
  });

  const view = usuarioView(usuario);

  expect(view).toEqual({
    id: 1,
    email: 'joaozinho@email.com',
    nome: 'João Carlos da Silva',
    cpf: '05357357153',
    telefone: '48999124567',
    ativo: StatusUsuario.ATIVO,
    sobre: 'texto bem grande',
    enderecos: undefined,
    pic: 'J',
  });
});

it('deve mapear os dados dos usuarios', async () => {
  await useData('usuario');

  const usuario = (await usuarioRepository.findOne(1)) as Usuario;
  expect(usuario.cdUsuario).toEqual(1);
  expect(usuario.nuCpf).toEqual('05357357153');
  expect(usuario.cdEndereco).toBeUndefined();

  const view = usuarioView(usuario);
  expect(view).toBeDefined();
  expect(view.id).toEqual(1);
  expect(view.cpf).toEqual('05357357153');
  expect(view.enderecos).toBeUndefined();
});
