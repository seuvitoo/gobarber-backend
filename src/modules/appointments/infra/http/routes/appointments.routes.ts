import { Router } from 'express';

import ensureLogin from '@modules/users/infra/http/middlewares/ensureLogin';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureLogin);
appointmentsRouter.post('/', appointmentsController.create);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

export default appointmentsRouter;
