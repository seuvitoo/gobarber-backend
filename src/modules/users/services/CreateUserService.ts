import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used', 400);
    }
    const hashedPassword = await hash(password, 8);
    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
