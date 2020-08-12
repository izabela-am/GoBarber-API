import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: RequestDTO): Promise<Response> {
    // ---------------USER CREDENTIAL VALIDATION----------------- //
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    // ---------------------------------------------------------- //

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
