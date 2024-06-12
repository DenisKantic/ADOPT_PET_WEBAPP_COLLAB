// middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './src/lib/AuthOptions';

export async function authMiddleware(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(authOptions) 

    const user = session?.user
    // Perform authentication logic here

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return handler(req, res);
  };
}
