import * as yup from 'yup';
import { Ability, Position } from '../database/entities/User.Entity';

export const schema = yup.object({
  name: yup.string().defined('Name is required'),
  ability: yup
    .mixed<Ability>()
    .oneOf(
      Object.values(Ability),
      `Nivel deve ser: ${Object.values(Ability).join(' ou ')}.`
    ),
  position: yup
    .mixed<Position>()
    .oneOf(
      Object.values(Position),
      `Posição deve ser: ${Object.values(Position).join(' ou ')}.`
    ),
  team_id: yup.number(),
});

const payload = { body: schema };
const params = { params: yup.object().shape({ id: yup.number() }) };
export const createUserSchema = yup.object({ body: schema });
export const updateUserSchema = yup.object({ ...params, ...payload });
export const deleteUserSchema = yup.object({ ...params });

export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
export type UpdateUserSchema = yup.InferType<typeof updateUserSchema>;
export type DeleteUserInput = yup.InferType<typeof deleteUserSchema>;
