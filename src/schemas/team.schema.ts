import * as yup from 'yup';

export const teamSchema = yup.object({
  name: yup
    .string()
    .max(255, 'Nome do time não pode ser maior que 255 caracteres.'),
  description: yup.string(),
  email: yup.string().email().typeError('Email deve ser texto.'),
  users: yup.array().nullable().of(yup.number().integer()),
  password: yup.string(),
});

const payload = { body: teamSchema };
const params = { params: yup.object().shape({ id: yup.number() }) };
export const createTeamSchema = yup.object({ ...payload });
export const updateTeamSchema = yup.object({ ...params, ...payload });
export const deleteTeamSchema = yup.object({ ...params });
const getTeamSchema = yup.object({ ...params });

export type CreateTeamInput = yup.InferType<typeof createTeamSchema>;
export type UpdateTeamInput = yup.InferType<typeof updateTeamSchema>;
export type ReadTeamInput = yup.InferType<typeof getTeamSchema>;
export type DeleteTeamInput = yup.InferType<typeof deleteTeamSchema>;
