import { container } from 'tsyringe';
import storageConfig from '@config/storage';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

export default container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[storageConfig.driver],
);
