import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to Authenticate a user', async () => {
    await createUser.execute({
      name: 'john doe',
      email: 'john@teste.com.br',
      password: '123456',
    });

    const resposta = await authenticateUser.execute({
      email: 'john@teste.com.br',
      password: '123456',
    });
    expect(resposta).toHaveProperty('token');
    expect(resposta.user).toEqual(resposta.user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'john@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'john doe',
      email: 'john@teste.com.br',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@teste.com.br',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
