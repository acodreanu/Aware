const development = 'development';
const production = 'production';
const test = 'test';

const isSpecifiedEnvironment = (env: string) => process.env.NODE_ENV === env;
const isDevelopment = () => isSpecifiedEnvironment(development);
const isProduction = () => isSpecifiedEnvironment(production);
const isTest = () => isSpecifiedEnvironment(test);

export const EnvironmentHelper = {
  isDevelopment,
  isProduction,
  isTest
};
