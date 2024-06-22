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
      Key: `donationPost/${uniqueFileName}`,
      Body: file,
      ContentType: 'image/png'
    };
  
    const command = new PutObjectCommand(params);
  
    await s3Client.send(command);
  
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/donationPost/${uniqueFileName}`;
    return imageUrl;

}

export async function createAdoptPost(formData:FormData, locationPost:string){

    try{
    const session = await auth()
    const post_id = session?.user?.id;
    const username = session?.user?.name;

    const files = formData.getAll('files') as File[];

    console.log("FILES:", files)
    const category = formData.get("category")?.toString()
    const petName = formData.get("name")?.toString();
    const phoneNumber = formData.get("phoneNumber")?.toString();
    const description = formData.get("description")?.toString();
    const vakcinisan = formData.get("vakcinisan")?.toString();
    const cipovan = formData.get("cipovan")?.toString();
    const pasos = formData.get("pasos")?.toString();
    const spol = formData.get("spol")?.toString();
    const starost = formData.get("starost")?.toString();
    const location = locationPost;
  


    if(!post_id || !username || !category || !petName || !phoneNumber || !description 
    || !vakcinisan || !cipovan || !pasos || !spol || !starost || !locationPost){
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

   console.log("image URLS:", imageUrls)


    await db.adoptAnimal.create({
        data: {post_id, imageUrls, location ,username, category, petName, vakcinisan, cipovan, pasos, spol, starost, phoneNumber, description}
    })
    return { success: true };
}
    catch(error){
        console.log("failed to create donation post", error)
    }
}
