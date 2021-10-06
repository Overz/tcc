import { Endereco, Usuario } from '../models';
import { enderecoList, EnderecoView } from './endereco-view';

export interface UsuarioView {
  id: number;
  email: string;
  nome: string;
  cpf: string;
  telefone: string;
  ativo: string;
  sobre?: string | null;
  enderecos?: EnderecoView[] | null;
  pic: string;
}

export const usuarioView = (usr: Usuario, end?: Endereco[]): UsuarioView => ({
  id: usr.cdUsuario,
  email: usr.deEmail,
  nome: usr.nmNome,
  cpf: usr.nuCpf,
  telefone: usr.nuTelefone,
  ativo: usr.flStatus,
  sobre: usr.deSobre,
  pic: usr.dePicture,
  enderecos: end && enderecoList(end),
});
