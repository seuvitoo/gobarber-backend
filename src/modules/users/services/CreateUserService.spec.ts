import AppError from '@shared/errors/AppError';


import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUserRepository, fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@teste.com.br',
      password: '123456'

    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with the same email from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository, fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@teste.com.br',
      password: '123456'

    });
    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@teste.com.br',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(AppError)
  });

});
