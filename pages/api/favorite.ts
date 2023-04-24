// import { NextApiRequest, NextApiResponse } from 'next';

// import { without } from 'lodash';
// import prismadb from '@/lib/prismadb';
// import serverAuth from '@/lib/serverAuth';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     if (req.method === 'POST') {
//       // authenticated this route
//       const { currentUser } = await serverAuth(req, res);

//       //get movie from request
//       const { movieId } = await req.body;

//       // find movie in database with movieId
//       const getMovieFromDB = await prismadb.movie.findUnique({
//         where: {
//           id: movieId,
//         },
//       });

//       if (!getMovieFromDB) {
//         throw new Error(`Movie with ${movieId} does not exists`);
//       }

//       // update currentUser
//       const updatedUser = await prismadb.user.update({
//         where: {
//           email: currentUser.email || '',
//         },
//         data: {
//           favoriteIds: {
//             push: movieId,
//           },
//         },
//       });

//       return res.status(200).json(updatedUser);
//     }

//     if (req.method === 'DELETE') {
//       const { currentUser } = await serverAuth(req, res);

//       //get movie from request
//       const { movieId } = await req.body;

//       const getMovieFromDB = await prismadb.movie.findUnique({
//         where: { id: movieId },
//       });

//       if (!getMovieFromDB) {
//         throw new Error(`Movie with ${movieId} does not exists`);
//       }

//       const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

//       const updatedUser = await prismadb.user.update({
//         where: {
//           email: currentUser.email || '',
//         },
//         data: {
//           favoriteIds: updatedFavoriteIds,
//         },
//       });

//       return res.status(200).json(updatedUser);
//     }

//     // if not post or delete methode then return error
//     return res.status(405).end();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ errorMsg: 'Something went wrong', error: err });
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import { without } from 'lodash';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
