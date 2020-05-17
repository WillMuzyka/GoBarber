import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

export default container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
