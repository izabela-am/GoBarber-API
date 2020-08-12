import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import checkIfAuthenticated from '@shared/infra/http/middlewares/checkIfAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(checkIfAuthenticated);

// CREATE
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();
  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

// READ
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

export default appointmentsRouter;
