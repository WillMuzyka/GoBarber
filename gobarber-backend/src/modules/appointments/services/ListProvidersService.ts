import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  except_user_id?: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ except_user_id }: IRequest): Promise<User[]> {
    let providers = await this.cacheProvider.recover<User[]>(
      `providers_list:${except_user_id}`,
    );

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        except_user_id,
      });

      await this.cacheProvider.save(
        `providers_list:${except_user_id}`,
        providers,
      );
    }
    return providers;
  }
}
