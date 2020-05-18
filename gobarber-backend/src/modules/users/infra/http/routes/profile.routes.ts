import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
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

export default profileRouter;
