import { Request, Response } from 'express';
import { container } from 'tsyringe';
<<<<<<< HEAD
import { classToClass } from 'class-transformer';
=======
<<<<<<< HEAD
=======
import { classToClass } from 'class-transformer';
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({
      user_id,
    });

<<<<<<< HEAD
    return res.json({ user: classToClass(user) });
=======
<<<<<<< HEAD
    delete user.password;

    return res.json(user);
=======
    return res.json({ user: classToClass(user) });
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, old_password, password } = req.body;

    const updateProfile = container.resolve(UpdateProfileService);
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

<<<<<<< HEAD
    return res.json(classToClass(user));
=======
<<<<<<< HEAD
    delete user.password;

    return res.json(user);
=======
    return res.json(classToClass(user));
>>>>>>> development
>>>>>>> 34a6557622c2dd5893bbf0b26f5365d9c3539f00
  }
}
