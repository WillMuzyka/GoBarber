import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IContactData {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IContactData;
  from?: IContactData;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
