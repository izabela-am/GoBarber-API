import { Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/CreateUserService';
import checkIfAuthenticated from '../middlewares/checkIfAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

// CREATE
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

// UPDATE USERS PROFILE PICTURE
usersRouter.patch(
  '/avatar',
  checkIfAuthenticated,
  upload.single('profilePicture'),
  async (request, response) => {
    return response.json({ message: 'ok' });
  },
);

export default usersRouter;
