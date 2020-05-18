import { Router } from 'express';
<<<<<<< HEAD
import { celebrate, Joi, Segments } from 'celebrate';
=======
<<<<<<< HEAD
=======
import { celebrate, Joi, Segments } from 'celebrate';
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
<<<<<<< HEAD
=======
<<<<<<< HEAD
profileRouter.put('/', profileController.update);
=======
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().min(6),
      password_confirmation: Joi.ref('password'),
    })
      .with('password', 'password_confirmation')
      .with('password', 'old_password'),
  }),
  profileController.update,
);
<<<<<<< HEAD
=======
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00

export default profileRouter;
