import { Endereco } from '../models';

export interface EnderecoView {
  id?: number;
  cep?: string;
  rua?: string;
  nome?: string;
  pais?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  numero?: string;
  latitude?: string | number;
  longitude?: string | number;
}

export const enderecoView = (e?: Endereco): EnderecoView => ({
  id: e?.cdEndereco,
  cep: e?.nuCep,
  rua: e?.nmRua,
  pais: e?.nmPais,
  bairro: e?.nmBairro,
  cidade: e?.nmCidade,
  uf: e?.sgEstado,
  nome: e?.deNome,
  latitude: Number(e?.nuLatitude),
  longitude: Number(e?.nuLongitude),
  numero: e?.nuNumero,
});

export const enderecoList = (e?: Endereco[]) =>
  e && e.map((e: Endereco) => enderecoView(e));
