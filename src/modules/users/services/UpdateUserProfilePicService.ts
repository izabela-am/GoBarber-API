import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
  pictureFilename: string;
  user_id: string;
}

@injectable()
class UpdateUserProfilePic {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, pictureFilename }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can update profile', 401);
    }

    // Delete previous pfp
    if (user.profile_picture) {
      const userProfilePictureFilePath = path.join(uploadConfig.directory, user.profile_picture);
      const userHasProfilePicture = await fs.promises.stat(userProfilePictureFilePath);

      if (userHasProfilePicture) {
        await fs.promises.unlink(userProfilePictureFilePath);
      }
    }

    user.profile_picture = pictureFilename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserProfilePic;
