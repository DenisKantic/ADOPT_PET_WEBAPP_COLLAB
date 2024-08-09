"use server"
import { auth } from "@public/auth";
import { db } from "@public/lib/db";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
    },
  });
  
 export async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {

    const session = await auth();
    const user_email = session?.user?.email
  
    const uniqueFileName = `${fileName}-${Date.now()}`
    const params:PutObjectCommandInput = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `lostPet/${uniqueFileName}`,
      Body: file,
      ContentType: 'image/png'
    };
  
    const command = new PutObjectCommand(params);
  
    await s3Client.send(command);
  
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/lostPet/${uniqueFileName}`;
    return imageUrl;

}

export async function createLostPet(formData:FormData, locationPost:string){

    try{
    const session = await auth()
    const post_id = session?.user?.id;
    const username = session?.user?.name;

    const files = formData.getAll('files') as File[];

    console.log("FILES:", files)
    const name = formData.get("name")?.toString();
    const animalCategory = formData.get("animalCategory")?.toString()
    const phoneNumber = formData.get("phoneNumber")?.toString();
    const description = formData.get("description")?.toString();
    const spol = formData.get("spol")?.toString();
    const location = locationPost;
  


    if(!post_id || !username || !name || !animalCategory || !phoneNumber || !description || !spol || !locationPost){
        throw Error("Missing required fields")
    }

    if (!Array.isArray(files) || files.length === 0) {
        throw Error("no files found")
    }
    const imageUrls: string[] = [];

       // Iterate through each file and upload valid images to S3
       for (const file of files) {
        if (file.type.startsWith('image')) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const fileName = file.name;
          const imageUrl = await uploadFileToS3(buffer, fileName);
          imageUrls.push(imageUrl);
        } else {
          console.warn(`Skipping non-image file: ${file.name}`);
        }
      }

    // const imageUrls: string[] = await Promise.all(
    //     files.map(async (file) => {
    //         const buffer = Buffer.from(await file.arrayBuffer());
    //         const fileName = file.name;
    //         const imageUrl = await uploadFileToS3(buffer, fileName);
    //         console.log("created 2 images")
    //         return imageUrl;
    //     })
    // );

    console.log("image URLS:", imageUrls)

    await db.lostPetPost.create({
        data: {post_id, imageUrls, location ,username, spol, name, animalCategory, phoneNumber, description}
    })

    return { success: true };
    
    }
    catch(error){
        console.log("failed to create donation post", error)
    }
}
