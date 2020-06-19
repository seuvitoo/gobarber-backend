import CreateAppointments from './CreateAppointmentService';
import FakeGoalsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointmnets', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeGoalsRepository();
    const createAppointments = new CreateAppointments(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointments.execute({
      date: new Date(),
      provider_id: '12345678',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12345678');
  });

  // it('should not be able to create two appointmen on the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
