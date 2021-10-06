import { createConnection } from 'typeorm';
import { migrate } from '../../models';
import { inserts } from './dml';
import { resolve } from 'path';

const doInserts = async () => {
  const db = await createConnection({
    type: 'postgres',
    name: 'dataset',
    url: 'postgres://postgres:postgres@localhost:5432',
    synchronize: false,
    logging: false,
  });

  await migrate(db, resolve(__dirname, '..', '..', 'migrations'));

  const qr = db.createQueryRunner('master');
  await qr.connect();
  await qr.startTransaction();

  try {
    for (let i = 0; i < inserts.length; i++) {
      const sql = inserts[i];

      await qr.query(sql);
    }

    await qr.commitTransaction();
  } catch (err) {
    console.error(err);
  }

  await db.close();
};

doInserts();
