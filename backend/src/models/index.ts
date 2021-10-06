import fs from 'fs';
import { Connection } from 'typeorm';
import umzug, { Storage } from 'umzug';
import { createConnection, ConnectionOptions, Repository } from 'typeorm';
import { Candidato } from './candidato';
import { Endereco } from './endereco';
import { Trampo } from './trampo';
import { Usuario } from './usuario';
import { Avaliacao } from './avaliacao';
import { Notificacao } from './notificacao';
import { Denuncia } from './denuncia';

export * from './usuario';
export * from './endereco';
export * from './trampo';
export * from './candidato';
export * from './avaliacao';
export * from './notificacao';
export * from './denuncia';

export let usuarioRepository: Repository<Usuario>;
export let enderecoRepository: Repository<Endereco>;
export let trampoRepository: Repository<Trampo>;
export let candidatoRepository: Repository<Candidato>;
export let avalaicaoRepository: Repository<Avaliacao>;
export let notificacaoRepository: Repository<Notificacao>;
export let denunciaRepository: Repository<Denuncia>;

export const connect = async (options: ConnectionOptions) => {
  const db = await createConnection({
    logging: false,
    synchronize: false,
    entities: [
      Usuario,
      Endereco,
      Trampo,
      Candidato,
      Avaliacao,
      Notificacao,
      Denuncia,
    ],
    ...options,
  });

  usuarioRepository = db.getRepository(Usuario);
  enderecoRepository = db.getRepository(Endereco);
  trampoRepository = db.getRepository(Trampo);
  candidatoRepository = db.getRepository(Candidato);
  avalaicaoRepository = db.getRepository(Avaliacao);
  notificacaoRepository = db.getRepository(Notificacao);
  denunciaRepository = db.getRepository(Denuncia);

  return db;
};

class TypeOrmStorage implements Storage {
  checked: boolean;

  constructor(public db: Connection) {
    this.checked = false;
  }

  async checkTable() {
    if (this.checked) {
      return;
    }

    await this.db.query(
      'CREATE TABLE IF NOT EXISTS migrations (name VARCHAR(255) NOT NULL PRIMARY KEY)'
    );
    this.checked = true;
  }

  async logMigration(migrationName: string) {
    await this.checkTable();
    await this.db.query(
      `INSERT INTO migrations (name) values ('${migrationName}')`
    );
  }

  async unlogMigration(migrationName: string) {
    await this.checkTable();
    await this.db.query('DELETE FROM migrations WHERE name = $1', [
      migrationName,
    ]);
  }

  async executed() {
    await this.checkTable();

    const rows: { name: string }[] = await this.db.query(
      'SELECT name FROM migrations ORDER BY name'
    );

    return rows.map((row) => row.name);
  }
}

/**
 * Executa os scripts de migration em migrationPath na conexão db
 * Esta função considera 'migrations' apenas os arquivos em formato: *.SQL
 *
 * @param db Connection : A conexão utilizada
 * @param migrationPath Path : o Caminho da migração
 */
export const migrate = async (db: Connection, migrationPath: string) => {
  const START_BLOCK = '(START-BLOCK)';
  const END_BLOCK = '(END-BLOCK)';

  const u = new umzug({
    migrations: {
      path: migrationPath,
      pattern: /^\d+[\w-]+\.sql$/,
      customResolver: (sqlPath: string) => {
        return {
          up: async () => {
            console.log('[Migration] Processing path:', sqlPath);

            const commands = fs.readFileSync(sqlPath, 'utf8').split(';');
            await db.manager.transaction(async (manager) => {
              let sql = '';
              let isBlock = false;

              for (let i = 0; i < commands.length; i++) {
                const cmd = commands[i].trim();

                if (!cmd) {
                  continue;
                }

                // inside sql block
                if (isBlock) {
                  sql += cmd + ';';

                  if (cmd.includes(END_BLOCK)) {
                    await manager.query(sql);
                    sql = '';
                    isBlock = false;
                  }
                  continue;
                }

                // not inside  a block; just get the current command
                sql = cmd;

                // start of a sql block, dont execute it yet!
                if (cmd.includes(START_BLOCK)) {
                  isBlock = true;
                  sql += ';';
                  continue;
                }

                // single command scenario
                await manager.query(sql);
              }
            });
          },
        };
      },
    },
    storage: new TypeOrmStorage(db),
  });

  console.log('[Migration] Starting...');
  await u.up();
  console.log('[Migration] DB schema updated.');
};
