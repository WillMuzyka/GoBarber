import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';

import HandlebarsMailProvider from './implementations/HandlebarsMailProvider';

const providers = {
  handlebars: HandlebarsMailProvider,
};

export default container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
