import {prisma} from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';


type Props = {
    params:{
        id: string
    }
}

export async function DELETE(request: any, {params: {id}}: Props) {
    console.log("ANIMAL ID:", id)
    try{
        await prisma.adoptAnimal.delete({
            where: {id}
        });
        revalidatePath('/dashboard')
        return NextResponse.json({
            message: "Post deleted successfully"
        })
   
    }
    catch(error){
        console.log("Failed to delete", error)
        return NextResponse.json({
            message: "Failed to delete"
        },
        {
            status: 500
        }
        )
    }
}