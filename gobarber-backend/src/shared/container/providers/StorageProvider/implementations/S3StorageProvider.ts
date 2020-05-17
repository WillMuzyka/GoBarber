import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import storageConfig from '@config/storage';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originPath = path.resolve(storageConfig.tmpFolder, file);
    const ContentType = mime.getType(originPath);
    const fileContent = await fs.promises.readFile(originPath);

    if (!ContentType) throw new Error('File not found');

    await this.client
      .putObject({
        Bucket: storageConfig.config.s3.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: storageConfig.config.s3.bucket,
        Key: file,
      })
      .promise();
  }
}
