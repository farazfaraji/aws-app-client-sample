import {
  AppConfigDataClient,
  BadRequestException,
  GetLatestConfigurationCommand,
  StartConfigurationSessionCommand,
} from "@aws-sdk/client-appconfigdata";
import * as flat from "flat";
import { injectable } from "inversify";

import { RemoteConfigAbstract } from "../../../abstracts/remote-config.abstract";

@injectable()
export class ConfigServiceFromAWS extends RemoteConfigAbstract {
  private token: string | undefined;
  private awsClient: AppConfigDataClient | undefined;

  constructor() {
    super();
  }

  async connect(): Promise<boolean> {
    this.awsClient = new AppConfigDataClient({});
    this.token = await this.getToken();
    return true;
  }

  async get(): Promise<any | null> {
    //we can use cache mechanisem here

    if (!this.token) {
      throw new Error("token is not fetched");
    }
    try {
      const command = new GetLatestConfigurationCommand({
        ConfigurationToken: this.token,
      });
      if (this.awsClient) {
        const response = await this.awsClient.send(command);
        const buffer = Buffer.from(response.Configuration || []);
        const data = JSON.parse(buffer.toString());
        if (Object.keys(data).length === 0) {
          return null;
        }
        return data;
      } else {
        throw new Error("connect() method did not call yet!");
      }
    } catch (e) {
      // case of aws token expired
      if (e instanceof BadRequestException) {
        this.token = await this.getToken();
        return await this.get();
      } else {
        // next step we will check the local config
        return null;
      }
    }
  }

  async getByKey(key: string): Promise<string | null> {
    //we can use cache mechanisem here

    if (!this.token) {
      throw new Error("token is not fetched");
    }
    try {
      const command = new GetLatestConfigurationCommand({
        ConfigurationToken: this.token,
      });
      if (this.awsClient) {
        const response = await this.awsClient.send(command);
        const buffer = Buffer.from(response.Configuration || []);
        const data = flat.flatten(JSON.parse(buffer.toString())) as any;
        return data[key] || null;
      } else {
        throw new Error("connect() method did not call yet!");
      }
    } catch (e) {
      // case of aws token expired
      if (e instanceof BadRequestException) {
        this.token = await this.getToken();
        return await this.getByKey(key);
      } else {
        // next step we will check the local config
        return null;
      }
    }
  }

  private async getToken(): Promise<string> {
    try {
      const getSession = new StartConfigurationSessionCommand({
        ApplicationIdentifier: process.env.APP_CONFIG_APP_IDENTIFIER,
        ConfigurationProfileIdentifier:
          process.env.APP_CONFIG_CONFIG_PROFILE_IDENTIFIER,
        EnvironmentIdentifier: process.env.APP_CONFIG_ENVIRONMENT_IDENTIFIER,
      });
      if (this.awsClient) {
        const sessionToken = await this.awsClient.send(getSession);
        return sessionToken.InitialConfigurationToken || "";
      } else {
        throw new Error("connect() method did not call yet!");
      }
    } catch (e) {
      throw e;
    }
  }
}
