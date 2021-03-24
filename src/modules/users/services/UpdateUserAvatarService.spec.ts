import AppError from '@shared/errors/AppError';


import UpdateUserAvatar from './UpdateUserAvatarService';

import FakeStorageProvider from '@shared/container/providers/StoreProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
  it('should be able to update a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUserRepository, fakeStorageProvider
    );

    const user = await fakeUserRepository.create({
      name: 'john doe',
      email: 'jhon@teste.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'

    });
    expect(user.avatar).toBe('avatar.jpg');
  });


  it('should not be able to update avatar user non exists', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(
      fakeUserRepository, fakeStorageProvider
    );


    expect(updateUserAvatar.execute({
      user_id: 'nonExists',
      avatarFilename: 'avatar.jpg'

    }),
    ).rejects.toBeInstanceOf(AppError);
  });


  it('should delete old avatar when updating new one', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')
    const updateUserAvatar = new UpdateUserAvatar(
      fakeUserRepository, fakeStorageProvider
    );

    const user = await fakeUserRepository.create({
      name: 'john doe',
      email: 'jhon@teste.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'

    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'

    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg');
  });



});
