import 'dotenv/config';
import * as yup from 'yup';

export const environments = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  TEST: 'test',
  STAGING: 'staging',
};

const environmentsString = Object.values(environments);

const envVarsSchema = yup
  .object()
  .shape({
    NODE_ENV: yup
      .string()
      .oneOf(environmentsString)
      .default(environments.DEVELOPMENT),
    API_PORT: yup.number().default(3001),
    PUBLIC_URL: yup.string().default('localhost'),
    POSTGRES_HOST: yup.string().required('POSTGRES_HOST is required'),
    POSTGRES_PORT: yup.number().default(5432),
    POSTGRES_USER: yup.string().required('POSTGRES_USER is required'),
    POSTGRES_PASSWORD: yup.string().required('POSTGRES_PASSWORD is required'),
    POSTGRES_DB: yup.string().required('POSTGRES_DB is required'),
    JWT_KEY: yup.string().required('JWT_KEY is required'),
  })
  .noUnknown();

let envVars;

try {
  envVarsSchema.validateSync(process.env, { abortEarly: false });
  envVars = envVarsSchema.cast(process.env);
} catch ({ errors }) {
  throw new Error(`Config validation error: ${errors}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.API_PORT,
  publicUrl: envVars.PUBLIC_URL,
  postgresDb: {
    host: envVars.POSTGRES_HOST,
    port: envVars.POSTGRES_PORT,
    username: envVars.POSTGRES_USER,
    password: envVars.POSTGRES_PASSWORD,
    database: envVars.POSTGRES_DB,
  },
  jwtKey: envVars.JWT_KEY,
};

export default config;
