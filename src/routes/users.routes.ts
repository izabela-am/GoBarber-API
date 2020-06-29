import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import UpdateUserProfilePic from '../services/UpdateUserProfilePicService';
import checkIfAuthenticated from '../middlewares/checkIfAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

// CREATE
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

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
    const updateUserProfilePicture = new UpdateUserProfilePic();
    const user = await updateUserProfilePicture.execute({
      user_id: request.user.id,
      pictureFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
