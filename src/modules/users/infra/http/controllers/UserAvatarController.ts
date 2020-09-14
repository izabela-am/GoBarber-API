import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserProfilePic from '@modules/users/services/UpdateUserProfilePicService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserProfilePicture = container.resolve(UpdateUserProfilePic);

    const user = await updateUserProfilePicture.execute({
      user_id: request.user.id,
      pictureFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
