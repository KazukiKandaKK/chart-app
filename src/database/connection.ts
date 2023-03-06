import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import Cereals from 'src/database/entity/cereals.entity';

// DBの設定を.envから取得。
const dbInfo = process.env;
const host = dbInfo.POSTGRES_HOST;
const port = Number(dbInfo.POSTGRES_HOST);
const username = dbInfo.POSTGRES_USER;
const password = dbInfo.POSTGRES_PASSWORD;
const database = dbInfo.POSTGRES_DB;

/**
 * DBに接続する関数
 * @returns
 */
export default async function connection(): Promise<Connection | undefined> {
  let connection: Connection | undefined;
  try {
    connection = await createConnection({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [Cereals],
      synchronize: false,
      logging: true,
    });
    console.log('Connected Database');
  } catch (error) {
    console.error('Failed to connect to database: ', error);
  } finally {
    return connection;
  }
}
