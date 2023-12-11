import AWS from 'aws-sdk';

 const uploadToS3 = async (data: string, filename: string): Promise<string> => {
    try {
        const bucketName: string = process.env.BUCKET_NAME || '';
        const accessKeyId: string = process.env.AWS_ACCESS_KEY_ID || '';
        const secretAccessKey: string = process.env.AWS_SECRET_ACCESS_KEY || '';

        const s3 = new AWS.S3({
            accessKeyId,
            secretAccessKey,
        });

        const uploadParams: AWS.S3.PutObjectRequest = {
            Bucket: bucketName,
            Key: filename,
            Body: data,
            ACL: 'public-read',
        };

        const uploadResponse: AWS.S3.ManagedUpload.SendData = await s3.upload(uploadParams).promise();

        return uploadResponse.Location || '';
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
};

export default {uploadToS3};
