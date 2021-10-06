import { getConnection, Connection, EntityManager } from 'typeorm';

export type TransactionalBlock = (em: EntityManager) => Promise<unknown>;

/**
 * Abre uma nova transação na conexão passada como parâmetro, e
 * executa um determinado bloco de código, passando o entityManager
 * correto.
 *
 * Observe que, para que a transação seja usada, os repositórios devem
 * ser criados a partir do entityManager passado como parâmetro.
 *
 * @param db Conexão com o banco de dados
 * @param block Bloco de código transacional a ser executado
 */
export const withDBTransaction = async (
  db: Connection,
  block: TransactionalBlock
) => await db.transaction(block);

/**
 * Executa um bloco de código dentro de uma transação, criada a partir
 * da conexão padrão do sistema.
 *
 * Observe que, para que a transação seja usada, os repositórios devem
 * ser criados a partir do entityManager passado como parâmetro.
 *
 * @param block Bloco de código a ser executado.
 */
export const inTransaction = async (block: TransactionalBlock) =>
  await withDBTransaction(getConnection(), block);
