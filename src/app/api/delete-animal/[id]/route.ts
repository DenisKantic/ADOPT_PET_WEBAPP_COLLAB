import { NextResponse } from 'next/server';
import {db} from "@public/lib/db"

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

    if(!id){
        NextResponse.json({message: "Post ID is required"})
    }


    try{
         await db.adoptAnimal.delete({
            where: {id}
        })
        return NextResponse.json({message: "Deleted successfulyy"})
    } catch (error){
        console.error(error);
        return NextResponse.json({message: "An error has occured in deleting post"})
    }
}