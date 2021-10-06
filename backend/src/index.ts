import { Connection } from 'typeorm';
import * as env from 'env-var';
import { connect, migrate } from './models';
import { app, getApp } from './app';
import { Indexable } from './utils/types';
import { config } from 'dotenv';
import { resolve } from 'path';
import {
  constants,
  DB_URL,
  GOOGLE_API_KEY,
  TRAMPO_EXPIRATION_TIME,
} from './utils/constants';
import { setupGoogleApiService } from './services/google';
import ms from 'ms';
import { finishExpiredTrampo } from './utils/background-finish';

let db: Connection;
let finishExpiredTrampoTimeout: NodeJS.Timeout;

const start = async () => {
  config({ path: resolve(__dirname, '..', '.env') });

  const PORT = env.get('PORT').default('3000').asPortNumber();

  try {
    console.log('[ENVIRONMENT] Getting environments...');
    constants();
  } catch (err) {
    exit('[ENVIRONMENT] Error getting environments!', err);
  }

  try {
    // estabelece uma conexao com o banco
    console.log('[CONNECTION] Connecting...');
    db = await connect({
      type: 'postgres',
      url: DB_URL,
      migrationsTableName: 'migrations',
    });

    await migrate(db, `${__dirname}/migrations`);
  } catch (err) {
    exit('[CONNECTION] Error connecting or running migrations!', err);
  }

  try {
    console.log('[BACKGROUND] Starting to check for expired "Trampo"');
    finishExpiredTrampoTimeout = setInterval(
      () => finishExpiredTrampo(),
      ms(TRAMPO_EXPIRATION_TIME)
    );
  } catch (err) {
    exit('[BACKGROUND] Error checking for expired "Trampo"', err);
  }

  // implementação da integração com google api
  setupGoogleApiService(GOOGLE_API_KEY);

  try {
    getApp();

    // inicia o servidor http
    app.listen(PORT, () => {
      console.log(`[APP] BACKEND listening on port ${PORT}`);
    });
  } catch (error) {
    exit('[APP] Error starting application!', error);
  }
};

// finaliza a aplicação se houver qualquer erro
const exit = (message: string, error: Indexable) => {
  console.error(message, '\n', error);
  process.exit(1);
};

const finish = async () => {
  console.log('[APP] Cleaning up...');
  if (db) {
    await db.close();
  }

  if (finishExpiredTrampoTimeout) {
    clearTimeout(finishExpiredTrampoTimeout);
  }

  // obs: necessário para matar todos os processos filhos,
  // senao o ts-node-dev nao consegue reiniciar nunca
  process.exit();
};

process.on('SIGINT', finish);
process.on('SIGTERM', finish);

start();
