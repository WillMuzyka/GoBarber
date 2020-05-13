import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => user.id === findUser.id);
    this.users[userIndex] = user;

    return this.users[userIndex];
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      userData,
    );

    this.users.push(user);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    const providers = [...this.users];
    const providersFiltered = providers.filter(
      provider => provider.id !== except_user_id,
    );

    return providersFiltered;
  }
}

export default UsersRepository;
