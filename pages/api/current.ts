import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    // authenticated this route and extract current user
    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'something went wrong', err });
  }
}
