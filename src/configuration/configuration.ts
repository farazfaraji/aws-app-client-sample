import dotenv from "dotenv";

dotenv.config();

interface ApplicationConfigurationInterface {
  port: number;
  localPathConfig: string;
}

const applicationConfiguration: ApplicationConfigurationInterface = {
  port: parseInt(process.env.PORT as string),
  localPathConfig: process.env.LOCAL_PATH_CONFIG as string,
};

// I couldn't fix the 'any' type
export const configuration: any = {
  applicationConfiguration,
};
