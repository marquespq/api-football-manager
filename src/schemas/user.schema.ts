import * as yup from 'yup';
import { Hability } from '../database/entities/User.Entity';

const schema = yup.object({
  name: yup.string().defined('Name is required'),
  email: yup.string().defined('email is required'),
  password: yup.string().defined('password is required'),
  hability: yup
    .mixed<Hability>()
    .oneOf(
      Object.values(Hability),
      `Nivel deve ser: ${Object.values(Hability).join(' ou ')}.`
    ),
});

export const createUserSchema = yup.object({ body: schema });
export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
