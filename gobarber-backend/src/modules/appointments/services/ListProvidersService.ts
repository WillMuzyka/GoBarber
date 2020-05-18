import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

<<<<<<< HEAD
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
=======
<<<<<<< HEAD
=======
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  except_user_id?: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
<<<<<<< HEAD
=======
<<<<<<< HEAD
  ) {}

  public async execute({ except_user_id }: IRequest): Promise<User[]> {
    const providers = await this.usersRepository.findAllProviders({
      except_user_id,
    });

=======
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00

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
<<<<<<< HEAD
=======
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
    return providers;
  }
}
