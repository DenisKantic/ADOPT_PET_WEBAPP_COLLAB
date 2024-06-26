"use server"
import { db } from "@public/lib/db";


export async function getLostPetPost(context:any){
    const page = parseInt((context.query.page as string) || '1', 5);
    const pageSize = 5;

    const total = await db.lostPetPost.count();
    const post = await db.lostPetPost.findMany({
        skip: (page-1)*pageSize,
        take: pageSize,
        orderBy:{
            createdAt: "desc"
        }
    })

    return {
            post,
            page,
            pageSize,
            total
    }

}