import { NextApiRequest, NextApiResponse } from 'next';
import prismabd from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
  }

  try {
    // authenticated this route
    await serverAuth(req);

    const movies = await prismabd.movie.findMany();

    return res.status(200).json(movies);
  } catch (err) {
    console.log(err);
    res.status(400).json({ errMsg: 'Something went wrong!!!', error: err });
  }
}
