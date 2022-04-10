import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email()
    .typeError('Email deve ser texto.')
    .required('Email não pode ser vazio.'),
  password: yup
    .string()
    .typeError('Senha deve ser texto.')
    .required('Senha não pode ser vazia.'),
});
export const loginSchema = yup.object({ body: schema });
export type LoginInput = yup.InferType<typeof loginSchema>;
