import { db } from "@public/lib/db";

export async function filterAdoptPost(animalCategory:string, animalLocation:string){

    const category:string = animalCategory || "";
    const location:string = animalLocation || "";

    console.log("KATEGORIJA", category)
    console.log("LOKACIJA", location)

    try{
        const post = await db.adoptAnimal.findMany({
            where:{
                category: category,
                location: location
            }
        })

        return {post, success:true}
    } catch(error){
        console.log("error in action file", error)
        return { error: "Failed to fetch posts", success: false }; // Example of structured error response

    }
}