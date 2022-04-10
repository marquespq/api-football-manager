import * as yup from 'yup';
import { Hability, Position } from '../database/entities/User.Entity';

export const schema = yup.object({
  name: yup.string().defined('Name is required'),
  email: yup.string().defined('email is required'),
  password: yup.string().defined('password is required'),
  hability: yup
    .mixed<Hability>()
    .oneOf(
      Object.values(Hability),
      `Nivel deve ser: ${Object.values(Hability).join(' ou ')}.`
    ),
  position: yup
    .mixed<Position>()
    .oneOf(
      Object.values(Position),
      `Posição deve ser: ${Object.values(Position).join(' ou ')}.`
    ),
});

const payload = { body: schema };
const params = { params: yup.object().shape({ id: yup.number() }) };
export const createUserSchema = yup.object({ body: schema });
export const updateUserSchema = yup.object({ ...params, ...payload });

export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
export type UpdateUserSchema = yup.InferType<typeof updateUserSchema>;
