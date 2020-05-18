import { Router } from 'express';
<<<<<<< HEAD
import { celebrate, Joi, Segments } from 'celebrate';
=======
<<<<<<< HEAD
=======
import { celebrate, Joi, Segments } from 'celebrate';
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00

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
<<<<<<< HEAD
=======
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
<<<<<<< HEAD
=======
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
  providerMonthAvailabilityController.index,
);
appointmentsRouter.get(
  '/:provider_id/day-availability',
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
<<<<<<< HEAD
=======
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
  providerDayAvailabilityController.index,
);

export default appointmentsRouter;
