import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface RequestDTO {
  pictureFilename: string;
  user_id: string;
}

class UpdateUserProfilePic {
  public async execute({
    user_id,
    pictureFilename,
  }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can update profile', 401);
    }

    // Delete previous pfp
    if (user.profile_picture) {
      const userProfilePictureFilePath = path.join(
        uploadConfig.directory,
        user.profile_picture,
      );
      const userHasProfilePicture = await fs.promises.stat(
        userProfilePictureFilePath,
      );

      if (userHasProfilePicture) {
        await fs.promises.unlink(userProfilePictureFilePath);
      }
    }

    user.profile_picture = pictureFilename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserProfilePic;
