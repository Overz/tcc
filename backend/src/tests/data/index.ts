import { candidatoData } from './candidatoData';
import { enderecoData } from './enderecoData';
import { trampoData } from './trampoData';
import { usuarioData } from './usuarioData';

type Data = 'usuario' | 'endereco' | 'trampo' | 'u-e' | 'main';

export async function useData(...type: Data[]) {
  type.includes('endereco') && (await enderecoData());

  type.includes('usuario') && (await usuarioData());

  type.includes('trampo') && (await trampoData());

  type.includes('u-e') && (await usuarioData(), await enderecoData());

  type.includes('main') &&
    (await usuarioData(),
    await enderecoData(),
    await trampoData(),
    await candidatoData());
}
