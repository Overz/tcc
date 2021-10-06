/* eslint-disable complexity */
import { TipoTrabalho } from '../../models';
import { Connection, createConnection } from 'typeorm';

const { ONLINE, PRESENCIAL } = TipoTrabalho;
const TI = 0;
const HANDJOB = 1;
const SAUDE = 2;
const PUBLICO = 3;
const CONSULTORIA = 4;
const EDUCACAO = 5;
const ALIMENTOS = 6;

const GRUPO = [
  'tecnologia',
  'mao_de_obra',
  'saude',
  'publico',
  'consultoria',
  'educacao',
  'alimenticios',
];
const AREA = [
  'T:Redes',
  'T:Desenvolvedor',
  'T:BI',
  'T:Analista',
  'T:UI/UX',
  'T:Jogos',
  'MO:Pintor',
  'MO:Pedreiro',
  'MO:Marceneiro',
  'MO:Chaveiro',
  'MO:Limpeza',
  'MO:Diarista',
  'S:Massagista',
  'S:Fisioterapia',
  'S:Saúde Coletiva',
  'S:Enfermeiro',
  'S:Cabelereiro(a)',
  'P:Eventos',
  'P:DJ',
  'P:Fotografo',
  'P:Segurança',
  'P:Outros',
  'E:Recreador',
  'E:Gastronomia',
  'E:Professor',
  'E:Aulas',
  'E:Fotografia',
  'A:Confeiteiro',
  'A:Padeiro',
  'A:Cozinheiro(a)',
  'A:Outros',
  'C:Coach',
  'C:Advogado',
  'C:Consultor',
  'C:Palestrante',
  'C:Outros',
];

const lorem = () =>
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis dolor non nisl dictum, ac rhoncus sem feugiat. Phasellus aliquam lorem odio, at egestas urna dictum vel.`;

export const dateAdd = (n: string | number) =>
  `DATE_ADD(CURRENT_TIMESTAMP, INTERVAL ${n} DAY)`;
export const dateRemove = (n: string | number) =>
  `DATE_SUB(CURRENT_TIMESTAMP, INTERVAL ${n} DAY)`;

type ID = number | string;

interface Query {
  cdEndereco: ID | null;
  cdContratante: ID;
  nmGrupo: string;
  nmAreaTrabalho: string;
  flTipo: TipoTrabalho;
  vlRemuneracao: string;
  dtEntrega: string;
  dtPublicado: string;
}

const query = (t: Query) => `INSERT INTO trampo
(cdEndereco, cdContratante, cdContratado, nmGrupo, nmAreaTrabalho, flTipo, vlRemuneracao, dtEntrega, deDescricao, flStatus, dtPublicado, dtValidade, flFinalizacaoPendente)
VALUES (${t.cdEndereco ? `'${t.cdEndereco}'` : null}, '${
  t.cdContratante
}', null, '${t.nmGrupo}', '${t.nmAreaTrabalho}', '${t.flTipo}', '${
  t.vlRemuneracao
}', '${t.dtEntrega}', '${lorem()}', 'P', ${
  t.dtPublicado
}, CURRENT_TIMESTAMP, 'N');`;

let db: Connection;
const dataset = async () => {
  try {
    console.log('[Dataset] Starting...');
    db = await createConnection({
      type: 'postgres',
      name: 'dataset',
      url: 'postgres://postgres:postgres@localhost:5432',
      synchronize: false,
      logging: false,
    });
    console.log('[CONNECTION] Open: ', db.isConnected);

    const runner = db.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();

    let position = 0;
    for (let i = 0; i < 5; i++) {
      let area = '';
      let grupo = '';
      let tipo = '' as TipoTrabalho;
      let contratante = 0;
      let prefix: string[] = [];
      let endereco: number | null = Math.floor(Math.random() * 7);
      const random = Math.random() * 10;

      while (endereco === 0) {
        endereco = Math.floor(Math.random() * 7);
      }

      if (random > 7) {
        contratante = 1;
      } else if (random <= 7 && random >= 3) {
        contratante = 2;
      } else {
        contratante = 3;
      }

      if (position >= AREA.length) {
        position = 0;
        prefix = AREA[position].split(':');
      } else {
        prefix = AREA[position].split(':');
        position++;
      }

      switch (prefix[0]) {
        case 'T':
          area = prefix[1];
          grupo = GRUPO[TI];
          tipo = ONLINE;
          endereco = null;
          break;
        case 'MO':
          area = prefix[1];
          grupo = GRUPO[HANDJOB];
          tipo = PRESENCIAL;
          break;
        case 'S':
          area = prefix[1];
          grupo = GRUPO[SAUDE];
          tipo = PRESENCIAL;
          break;
        case 'P':
          area = prefix[1];
          tipo = PRESENCIAL;
          grupo = GRUPO[PUBLICO];
          break;
        case 'E':
          area = prefix[1];
          tipo = ONLINE;
          grupo = GRUPO[EDUCACAO];
          endereco = null;
          break;
        case 'A':
          area = prefix[1];
          tipo = PRESENCIAL;
          grupo = GRUPO[ALIMENTOS];
          break;
        case 'C':
          area = prefix[1];
          grupo = GRUPO[CONSULTORIA];
          tipo = ONLINE;
          endereco = null;
          break;
        default:
          console.log('[CASE] No one case was found!');
          return;
      }

      // const dtEntrega = dateAdd(
      //   Math.floor(random * (Math.random() * 10) * (Math.random() * 10))
      // );
      // const dtPublicado = dateRemove(
      //   Math.floor(random * Math.floor(Math.random() * 100))
      // );

      const qry = query({
        dtEntrega: '2021-10-20 00:32:13.65915+00',
        dtPublicado: `(select NOW() - INTERVAL '${Math.floor(
          random * (Math.random() * 10) * (Math.random() * 10)
        )} DAY')`,
        flTipo: tipo,
        nmAreaTrabalho: area,
        nmGrupo: grupo,
        cdEndereco: endereco,
        cdContratante: contratante,
        vlRemuneracao: '1000',
      });

      await runner.query(qry);
      console.log('[Dataset] Inserts: ', i);
    }

    await runner.commitTransaction();

    console.log('[Dataset] Finished!');

    return;
  } catch (err) {
    console.log(err);
  } finally {
    if (db) {
      await db.close();
      console.log('[CONNECTION] Open: ', db.isConnected);
    }
  }
};

dataset();
