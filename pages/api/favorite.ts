import { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '@/lib/serverAuth';
import { without } from 'lodash';
import prismadb from '@/lib/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      // authenticated this route
      const { currentUser } = await serverAuth(req);

      //get movie from request
      const { movieId } = await req.body;

      // find movie in database with movieId
      const getMovieFromDB = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!getMovieFromDB) {
        throw new Error(`Movie with ${movieId} does not exists`);
      }

      // update currentUser
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(updatedUser);
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req);

      //get movie from request
      const { movieId } = await req.body;

      const getMovieFromDB = await prismadb.movie.findUnique({
        where: { id: movieId },
      });

      if (!getMovieFromDB) {
        throw new Error(`Movie with ${movieId} does not exists`);
      }

      const updateFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updateFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    // if not post or delete methode then return error
    return res.status(405).end();
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMsg: 'Something went wrong', error: err });
  }
}
