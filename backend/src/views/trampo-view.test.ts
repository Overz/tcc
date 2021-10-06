import {
  Endereco,
  TipoTrabalho,
  Trampo,
  trampoRepository,
  Usuario,
} from '../models';
import { useData } from '../tests/data';
import { TrampoList, trampoList, trampoView } from './trampo-view';

describe('trampoView', () => {
  it('deve exibir os dados do trampo filtrado, ONLINE', async () => {
    await useData('main');

    const trampo = (await trampoRepository.findOne(1)) as Trampo;
    const contratante = (trampo.cdContratante as unknown) as Usuario;

    expect(trampo).toBeDefined();
    expect(trampo?.cdTrampo).toEqual(1);
    expect(trampo?.cdContratante).toBeDefined();
    expect(trampo?.cdEndereco).toBeNull();

    const view = trampoView(trampo);

    expect(view.id).toEqual(trampo.cdTrampo);
    expect(view.contratante.id).toEqual(contratante.cdUsuario);
    expect(view.contratado).toBeNull();
    expect(view.latitude).toBeUndefined();
    expect(view.longitude).toBeUndefined();
    expect(view.tipo).toEqual(TipoTrabalho.ONLINE);
    expect(view.dtentrega).toBeDefined();
  });

  it('deve exibir os dados do trampo filtrado, PRESENCIAL', async () => {
    await useData('main');
    const trampo = (await trampoRepository.findOne(3)) as Trampo;
    const endereco = (trampo.cdEndereco as unknown) as Endereco;
    const contratante = (trampo.cdContratante as unknown) as Usuario;
    const contratado = (trampo.cdContratado as unknown) as Usuario;

    expect(endereco).toBeDefined();
    expect(endereco.nuLatitude).toEqual('0');
    expect(endereco.nuLongitude).toEqual('0');

    expect(contratante).toBeDefined();
    expect(contratante.cdUsuario).toEqual(1);

    expect(contratado).toBeDefined();
    expect(contratado.cdUsuario).toEqual(3);
  });
});

describe('trampoList', () => {
  it('deve exibir os dados do trampo filtrado', async () => {
    await useData('main');

    const trampo = (await trampoRepository.find()) as Trampo[];
    expect(trampo.length).toEqual(10);

    const list = trampoList(trampo) as TrampoList[];
    expect(list?.length).toEqual(10);

    const keys = Object.keys(list[0]);
    expect(keys).toEqual([
      'id',
      'idusuario',
      'usuario',
      'dtpublicado',
      'grupo',
      'area',
      'remuneracao',
      'tipo',
      'dtentrega',
      'status',
      'dtvalidade',
      'finalizacaopendente',
    ]);
  });
});
