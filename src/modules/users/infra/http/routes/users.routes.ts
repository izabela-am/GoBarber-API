import { Router } from 'express';
import multer from 'multer';

import checkIfAuthenticated from '@shared/infra/http/middlewares/checkIfAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

// UPDATE USERS PROFILE PICTURE
usersRouter.patch(
  '/avatar',
  checkIfAuthenticated,
  upload.single('profile_picture'),
  userAvatarController.update,
);

export default usersRouter;
