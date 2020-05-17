import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import upload from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originPath = path.resolve(upload.tmpFolder, file);
    const fileContent = fs.promises.readFile(originPath, {
      encoding: 'utf-8',
    });

    await this.client
      .putObject({
        Bucket: 'app-gostack-gobarber',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
