// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Cereals from 'src/database/entity/cereals.entity';
import connection from 'src/database/connection';
import { cerealsType } from './types/cereals';

// キャッシュを取得しておく。
let cachedData: cerealsType;

export default async function cereals(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  // キャッシュが残っている場合はDB接続をしない。
  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  try {
    const cereals: cerealsType = await getCerealData();
    cachedData = cereals;
    res.status(200).json(cereals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get cereals' });
  }
}

/**
 * DBからCerealのデータを取得する。
 */
export async function getCerealData(): Promise<cerealsType> {
  const conn = await connection();
  const cerealRepo = await conn.getRepository(Cereals).find();
  return JSON.parse(JSON.stringify(cerealRepo));
}
