import AppError from '@shared/errors/AppError';

import CreateAppointments from './CreateAppointmentService';
import FakeGoalsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmnets', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeGoalsRepository();
    const createAppointments = new CreateAppointments(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointments.execute({
      date: new Date(),
      provider_id: '12345678',
      user_id: '123123',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12345678');
  });

  it('should not be able to create two appointmen on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2021, 1, 15, 19);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
      user_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
