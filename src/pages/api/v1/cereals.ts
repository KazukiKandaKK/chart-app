// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Cereals from 'src/database/entity/cereals.entity';
import connection from 'src/database/connection';

// キャッシュを取得しておく。
let cachedData: any;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // キャッシュが残っている場合
  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  try {
    const cereals = await getCerealData();
    cachedData = cereals;
    res.status(200).json(cereals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get cereals' });
  }
}

/**
 * DBからCerealのデータを取得します。
 * @returns
 */
export async function getCerealData() {
  const conn = await connection();
  const _cereals = await conn.getRepository(Cereals).find();
  const cereals = JSON.parse(JSON.stringify(_cereals));
  return cereals;
}
