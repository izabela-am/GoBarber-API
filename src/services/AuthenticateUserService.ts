import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<Response> {
    const usersRepository = getRepository(User);

    // ---------------VERIFY LOGIN INFORMATION------------------- //
    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw new Error('Incorrect email/password combination');
    }
    // ---------------------------------------------------------- //

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
