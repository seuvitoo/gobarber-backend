import { Router } from 'express';
import { parseISO } from 'date-fns';

import ensureLogin from '@modules/users/infra/http/middlewares/ensureLogin';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureLogin);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const appointmentsRepository = new AppointmentsRepository();
  const parsedDate = parseISO(date);

  const CreateAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await CreateAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
