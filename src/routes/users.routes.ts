import { Router } from 'express';
import { hash } from 'bcryptjs';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const hashedPassword = await hash(password, 8);
    const user = await createUser.execute({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
