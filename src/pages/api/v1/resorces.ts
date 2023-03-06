// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Cereals from 'src/database/entity/cereals.entity';
import connection from 'src/database/connection';
import { cerealsType } from './types/cereals';
import { Connection, In } from 'typeorm';

// 接続をキャッシュする場合の変数。
let cachedConnection: Connection | undefined;

export default async function resorce(req: NextApiRequest, res: NextApiResponse) {
  let conn: Connection | undefined;

  // キャッシュされた接続があればそれを使う。
  if (cachedConnection && cachedConnection.isConnected) {
    conn = cachedConnection;
  } else {
    conn = await connection();
    cachedConnection = conn;
  }
  const reqMethod: string | undefined = req.method;
  try {
    // GET
    if (reqMethod === 'GET') {
      let cereals: cerealsType;
      let query = {};
      // idが指定された場合は、条件を指定する。
      // NOTE: 指定されたidをすべて表示する。
      if (req.query.id) {
        const id = req.query.id.split(',');
        query = { where: { id: In(id) } };
      }
      const cerealRepo = await conn.getRepository(Cereals).find(query);
      cereals = await getCerealData(cerealRepo);
      console.log('GET /api/v1/resorces');
      res.status(200).json(cereals);

      // POST
    } else if (reqMethod === 'POST') {
      const data: cerealsType = req.body;
      const cerealRepo = await conn.getRepository(Cereals);
      const insertData = await createInsertData(cerealRepo, data);
      // データの整形に失敗した場合、例外をThrow。
      // NOTE: DBの接続とのエラーを切り分ける為。
      if (insertData.name === undefined) {
        throw new Error('Creating Data Failed');
      }
      await cerealRepo.save(insertData);
      console.log(`${reqMethod} /api/v1/resorces, request body: ${JSON.stringify(req.body)}`);
      await res.status(201).json({ message: 'Created' });
    }
  } catch (error) {
    console.error(error);
    console.log(`${reqMethod} /api/v1/resorces`);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

/**
 * DBから取得したCerealのデータを整形する。
 */
export async function getCerealData(data: any): Promise<any> {
  const cereals = JSON.parse(JSON.stringify(data));
  return cereals;
}

/**
 * DBに追加できるようにデータを整形する。
 */
export async function createInsertData(cereals: any, data: cerealsType): Promise<any> {
  try {
    // reqest(cerealsType)のkeyを取得し、DBのobjectに格納。
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        cereals[key] = data[key];
      }
    }
  } catch (err) {
    console.error('Error occurred in creating insert data:', err);
  } finally {
    return cereals;
  }
}
