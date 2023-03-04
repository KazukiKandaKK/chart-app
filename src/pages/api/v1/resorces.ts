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
  try {
    if (req.method === 'GET') {
      let cereals: cerealsType;
      let query = {};
      // idが指定された場合は、条件を指定する。
      if (req.query.id) {
        const id = req.query.id.split(',');
        query = { where: { id: In(id) } };
      }

      const _cereals = await conn.getRepository(Cereals).find(query);
      cereals = await getCerealData(_cereals);
      res.status(200).json(cereals);
    } else if (req.method === 'POST') {
      const data: cerealsType = req.body;
      const _cereals = await conn.getRepository(Cereals);
      const insertData = await createInsertData(_cereals, data);
      await _cereals.save(insertData);
      await res.status(201).json({ message: 'Created' });
    }
  } catch (error) {
    console.error(error);
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
export async function getCerealData(data: any) {
  const cereals = JSON.parse(JSON.stringify(data));
  return cereals;
}

/**
 * DBに追加できるようにデータを整形する。
 */
export async function createInsertData(cereals: any, data: cerealsType) {
  // reqest(cerealsType)のkeyを取得し、DBのobjectに格納。
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      cereals[key] = data[key];
    }
  }
  return cereals;
}
