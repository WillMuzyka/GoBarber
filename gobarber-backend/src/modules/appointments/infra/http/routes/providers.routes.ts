import { Router } from 'express';
<<<<<<< HEAD
=======
import { celebrate, Joi, Segments } from 'celebrate';
>>>>>>> development

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const appointmentsRouter = Router();

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', providersController.index);

appointmentsRouter.get(
  '/:provider_id/month-availability',
<<<<<<< HEAD
=======
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
>>>>>>> development
  providerMonthAvailabilityController.index,
);
appointmentsRouter.get(
  '/:provider_id/day-availability',
<<<<<<< HEAD
=======
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
>>>>>>> development
  providerDayAvailabilityController.index,
);

export default appointmentsRouter;
