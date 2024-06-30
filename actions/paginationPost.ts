"use server"
import { db } from "@public/lib/db";


export async function getLostPetPost(context:any){
    const page = parseInt((context.query.page as string) || '1', 12);
    const pageSize = 12;

    // in function after context:any, add animals:string
    // after that, insert in prisma function where: {animalCategory: animals}
    // with that, by default if it's empty string it will return all animals,
    // but if it contains for example "pas", it will list only "pas posts"
    const total = await db.lostPetPost.count();
    const post = await db.lostPetPost.findMany({
        skip: (page-1)*pageSize,
        take: pageSize,
        orderBy:{
            createdAt: "desc"
        }
    })
    // const total = await db.lostPetPost.count({
    //     where:{
    //         animalCategory: "pas"
    //     }
    // });


    return {
            post,
            page,
            pageSize,
            total
    }

}

export async function getAdoptPost(context:any){
    const page = parseInt((context.query.page as string) || '1', 12);
    const pageSize = 12;

    const total = await db.adoptAnimal.count();
    const post = await db.adoptAnimal.findMany({
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

export async function getDonationPost(context:any){
    const page = parseInt((context.query.page as string) || '1', 12);
    const pageSize = 12;

    const total = await db.donationPost.count();
    const post = await db.donationPost.findMany({
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