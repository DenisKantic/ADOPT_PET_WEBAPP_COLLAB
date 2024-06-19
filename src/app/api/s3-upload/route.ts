import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest } from 'next/server';
import { createDonationPost } from '@public/actions/createDonationPost';
import { uploadFileToS3 } from '@public/actions/createDonationPost';

// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
//   },
// });

// async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {

//     const uniqueFileName = `${fileName}-${Date.now()}`
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME!,
//     Key: `myFolder/${uniqueFileName}`,
//     Body: file,
//     ContentType: 'image/png',
//   };

//   const command = new PutObjectCommand(params);

//   await s3Client.send(command);

//   const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
//   return imageUrl;


// }

// async function saveImageToUrl(imageUrl:string[]): Promise<void>{
//     console.log("Retrieved imageURL:", imageUrl)
// }
export async function POST(request: NextRequest) {

try {
  const formData = await request.formData();
  const files = formData.getAll('file');

  if (!files) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 });
  }

  if (!Array.isArray(files) || files.length === 0) {
      console.error('No files uploaded or files is not an array');
      return NextResponse.json({ error: 'No files uploaded or files is not an array' }, { status: 400 });
    }


   
  const imageUrls = await Promise.all(
      (files as any[]).map(async (file) => {
        const buffer = Buffer.from(await (file as File).arrayBuffer());
        return uploadFileToS3(buffer, (file as File).name);
      })
    );




  return NextResponse.json({ success: true, urls:imageUrls });
} catch (error) {
  console.error(error);
  return NextResponse.json({ error: 'error uploading file' }, { status: 500 });
}
}