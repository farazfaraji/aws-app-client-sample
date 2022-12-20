import dotenv from "dotenv";

dotenv.config();

export interface ApplicationConfigurationInterface {
  port: number;
  localPathConfig: string;
  AppConfigAppIdentifier: string;
  AppConfigConfigProfileIdentifier: string;
  AppConfigEnvironmentIdentifier: string;
}

const app: ApplicationConfigurationInterface = {
  port: parseInt(process.env.PORT as string),
  localPathConfig: process.env.LOCAL_PATH_CONFIG as string,
  AppConfigAppIdentifier: process.env.APP_CONFIG_APP_IDENTIFIER as string,
  AppConfigConfigProfileIdentifier: process.env
    .APP_CONFIG_CONFIG_PROFILE_IDENTIFIER as string,
  AppConfigEnvironmentIdentifier: process.env
    .APP_CONFIG_ENVIRONMENT_IDENTIFIER as string,
};

// I couldn't fix the 'any' type
export const configuration = {
  app,
};
