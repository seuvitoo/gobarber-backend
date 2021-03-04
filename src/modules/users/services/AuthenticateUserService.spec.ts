import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to Authenticate a user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createuser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository, fakeHashProvider
    );

    await createuser.execute({
      name: 'john doe',
      email: 'john@teste.com.br',
      password: '123456'

    })

    const resposta = await authenticateUser.execute({
      email: 'john@teste.com.br',
      password: '123456'

    });
    expect(resposta).toHaveProperty('token');
    expect(resposta.user).toEqual(resposta);
  });




});
