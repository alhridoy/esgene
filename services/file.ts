import { handleApiError } from '@/lib/handle-api-error';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { toast } from 'sonner';
import { fetchUserAttributes } from 'aws-amplify/auth';

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

const generateFileKey = async (
  fileName: string,
): Promise<string | undefined> => {
  try {
    const { sub } = await fetchUserAttributes();
    const formattedFileName = fileName.toLowerCase().replace(/[ \s]+/g, '_');

    return `${sub}/${formattedFileName}`;
  } catch (e) {
    console.error(`Failed to generate file key for ${fileName}`);
  }
};
const getS3SignedURL = async (
  fileName: string,
): Promise<string | undefined> => {
  try {
    const fileKey = await generateFileKey(fileName);
    if (!fileKey) return;

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET!,
      Key: fileKey,
    });

    // Generate a signed url, valid for 60 seconds
    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60,
    });

    return signedUrl;
  } catch (error) {
    handleApiError(error, `Failed to generate signed URL for ${fileName}`);
  }
};

export const uploadFile = async (
  file: File,
): Promise<{ fileName: string; status: string }> => {
  let status: string = 'SUCCESS'; // Default status

  try {
    const signedUrl = await getS3SignedURL(file.name);

    if (!signedUrl) {
      status = 'FAILED';
    } else {
      // Upload the file to S3 using the signed URL
      const response = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        toast.error(`Failed to upload ${file.name}`);
        status = 'FAILED';
      }
    }
  } catch (error) {
    handleApiError(error, `Failed to upload ${file.name}`);
    status = 'ERROR';
  } finally {
    return { fileName: file.name, status: status };
  }
};
