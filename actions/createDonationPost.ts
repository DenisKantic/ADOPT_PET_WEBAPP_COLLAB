"use server"
import { auth } from "@public/auth";
import { db } from "@public/lib/db";
import { redirect } from "next/navigation";
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
      Key: `${user_email}/${uniqueFileName}`,
      Body: file,
      ContentType: 'image/png',
    };
  
    const command = new PutObjectCommand(params);
  
    await s3Client.send(command);
  
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/myFolder/${uniqueFileName}`;
    return imageUrl;



}

export async function createDonationPost(formData:FormData){

    try{
    const session = await auth()
    const post_id = session?.user?.id;
    const username = session?.user?.name;

    const files = formData.getAll('file') as File[];

    console.log("FILES:", files)
    const category = formData.get("category")?.toString()
    const name = formData.get("name")?.toString();
    const animalCategory = formData.get("animalCategory")?.toString()
    const phoneNumber = formData.get("phoneNumber")?.toString();
    const description = formData.get("description")?.toString();
  


    if(!post_id || !username || !category || !name || !animalCategory || !phoneNumber || !description ){
        throw Error("Missing required fields")
    }

    if (!Array.isArray(files) || files.length === 0) {
        throw Error("no files found")
    }

    // const imageUrls: string[] = [];
    //     for (const file of files) {
    //         const buffer = await file.arrayBuffer();
    //         const fileName = file.name;
    //         const imageUrl = await uploadFileToS3(Buffer.from(buffer), fileName);
    //         imageUrls.push(imageUrl);
    //     }

    const imageUrls: string[] = await Promise.all(
        files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = file.name;
            const imageUrl = await uploadFileToS3(buffer, fileName);
            return imageUrl;
        })
    );

    console.log("image URLS:", imageUrls)

    await db.donationPost.create({
        data: {post_id, imageUrls ,username, category, name, animalCategory, phoneNumber, description}
    })
}
    catch(error){
        console.log("failed to create donation post", error)
    }
}
