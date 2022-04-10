import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().defined('Name is required'),
  email: yup.string().defined('email is required'),
  password: yup.string().defined('password is required'),
});

export const createUserSchema = yup.object({ body: schema });
export type CreateUserSchema = yup.InferType<typeof createUserSchema>;
