import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/AuthOptions';

type ResponseData = {
    message: string
  }

const prisma = new PrismaClient();

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
){

    if(req.method!== 'DELETE'){
        return res.status(405).json({message: "Method not allowed"})
    }

    const session = await getServerSession(req,res,authOptions)

    if(!session){
        res.status(401).json({message: 'Not authorized'})
    }

    const {id} = req.body;

    if(!id){
        return res.status(401).json({message: "Post ID is required"})
    }


    try{
        const post = await prisma.adoptAnimal.delete({
            where: {id: id}
        })

        return res.status(200).json({message: "Deleted successfulyy"})
    } catch (error){
        console.error(error);
        return res.status(500).json({message: "An error has occured in deleting post"})
    }
}