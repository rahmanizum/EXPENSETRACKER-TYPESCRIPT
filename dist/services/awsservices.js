"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uploadToS3 = (data, filename) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bucketName = process.env.BUCKET_NAME || '';
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
        const s3 = new aws_sdk_1.default.S3({
            accessKeyId,
            secretAccessKey,
        });
        const uploadParams = {
            Bucket: bucketName,
            Key: filename,
            Body: data,
            ACL: 'public-read',
        };
        const uploadResponse = yield s3.upload(uploadParams).promise();
        return uploadResponse.Location || '';
    }
    catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
});
exports.default = { uploadToS3 };
