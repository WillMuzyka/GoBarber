import IParseMeilTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMeilTemplateDTO): Promise<string>;
}
