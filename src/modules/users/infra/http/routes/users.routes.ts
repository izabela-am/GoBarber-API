import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserProfilePic from '@modules/users/services/UpdateUserProfilePicService';
import checkIfAuthenticated from '@shared/infra/http/middlewares/checkIfAuthenticated';
import uploadConfig from '@config/upload';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const usersRouter = Router();
const upload = multer(uploadConfig);

// CREATE
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

// UPDATE USERS PROFILE PICTURE
usersRouter.patch(
  '/avatar',
  checkIfAuthenticated,
  upload.single('profile_picture'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserProfilePicture = new UpdateUserProfilePic(usersRepository);

    const user = await updateUserProfilePicture.execute({
      user_id: request.user.id,
      pictureFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
