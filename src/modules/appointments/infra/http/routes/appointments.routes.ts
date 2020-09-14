import { Router } from 'express';

import checkIfAuthenticated from '@shared/infra/http/middlewares/checkIfAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(checkIfAuthenticated);

// * CREATE
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
