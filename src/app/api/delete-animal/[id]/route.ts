import { NextResponse } from 'next/server';
import {prisma} from "@/lib/prisma"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/AuthOptions';

type Props = {
    params:{
        id: string
    }
}

export async function DELETE(
    req: Request,
    {params: {id}}: Props
){

    if(req.method!== 'DELETE'){
        return NextResponse.json({msg: "Method not allowed"})
    }

    const session = await getServerSession(authOptions)

    if(!session){
        NextResponse.json({message: 'Not authorized'})
    }

    if(!id){
        NextResponse.json({message: "Post ID is required"})
    }


    try{
          const deletePost = await prisma.adoptAnimal.delete({
            where: {id}
        })
        return NextResponse.json({message: "Deleted successfulyy"})
    } catch (error){
        console.error(error);
        return NextResponse.json({message: "An error has occured in deleting post"})
    }
}