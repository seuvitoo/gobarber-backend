import AppError from '@shared/errors/AppError';


import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUserRepository,
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
    const createUser = new CreateUserService(
      fakeUserRepository,
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
