<<<<<<< HEAD
=======
<<<<<<< HEAD
import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailProvider from './MailTemplateProvider/implementations/HandlebarsMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
=======
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
import './MailTemplateProvider';
import './MailProvider';
import './StorageProvider';
import './CacheProvider';
<<<<<<< HEAD
=======
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
